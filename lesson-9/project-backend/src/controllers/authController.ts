import { type Request, type Response } from "express";
import bcrypt from "bcrypt";

import { prisma } from "../prisma.ts";

import {
  type RegisterBody,
  type LoginBody,
  type RefreshBody,
} from "../validators/authValidator.ts";

import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from "../utils/jwt.ts";

export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response,
) => {
  const { username, email, password } = req.body;
  const userWithUsername = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (userWithUsername) {
    res.status(409).json({
      message: `Username ${username} already taken`,
    });
  }
  const userWithEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (userWithEmail) {
    res.status(409).json({
      message: `Email ${email} already taken`,
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      ...req.body,
      password: hashPassword,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
    },
  });

  res.status(201).json({
    user: newUser,
  });
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(401).json({
      message: `Invalid email or password`,
    });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({
      message: `Invalid email or password`,
    });
  }
  const accessToken = createAccessToken(user.id);
  const refreshToken = createRefreshToken(user.id);

//   await prisma.$transaction([
//     prisma.refreshToken.deleteMany({
//         where: {
//             userId: user.id
//         }
//     }),

//     prisma.refreshToken.create({
//         data: {
//             token: refreshToken,
//             userId: user.id
//         }
//     })
// ]);

  await prisma.refreshToken.upsert({
    where: {
      userId: user.id,
    },
    create: {
      userId: user.id,
      token: refreshToken,
    },
    update: {
      token: refreshToken,
    },
  });

  res.json({
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
};

export const refresh = async (
  req: Request<{}, {}, RefreshBody>,
  res: Response,
) => {
  const { refreshToken: oldRefreshToken } = req.body;
  const { error } = verifyToken(oldRefreshToken);
  if (error) {
    return res.status(401).json({
      message: "refresh token invalid or expired",
    });
  }
  const storedToken = await prisma.refreshToken.findUnique({
    where: {
      token: oldRefreshToken,
    },
  });

  if (!storedToken) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }

  const accessToken = createAccessToken(storedToken.userId);
  const refreshToken = createRefreshToken(storedToken.userId);

  await prisma.refreshToken.update({
    where: {
      token: oldRefreshToken,
    },
    data: {
      token: refreshToken,
    },
  });

  res.json({
    accessToken,
    refreshToken,
  });
};

export const getMe = async(req: Request, res: Response)=> {
  res.json({
    user: req.user
  });
}

export const logout = async(req: Request, res: Response)=> {
  await prisma.refreshToken.deleteMany({
    where: {
      userId: req.user!.id
    }
  });
  res.status(204).send();
};