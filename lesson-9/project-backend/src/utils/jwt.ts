import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("Messing JWT_SECRET");
}

// const token = jwt.sign({sub: "1", type: "access"}, JWT_SECRET, {expiresIn: "15m"});
// const decodeToken = jwt.decode(token);
// // console.log(decodeToken);
// try {
//     const {sub} = jwt.verify(token, JWT_SECRET);
//     console.log(sub);
// }
// catch(error) {
//     console.log(error);
// }

export const createAccessToken = (userId: number) => {
  return jwt.sign(
    {
      sub: String(userId),
      type: "access",
    },
    JWT_SECRET,
    { expiresIn: "15m" },
  );
};

export const createRefreshToken = (userId: number) => {
  return jwt.sign(
    {
      sub: String(userId),
      type: "refresh",
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
};

export const verifyToken = (token: string)=> {
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        if (typeof payload === "string" || !payload.sub) {
      throw new Error("Token payload must contain sub");
    }
        return {
            data: payload,
            error: null
        }
    }
    catch(error) {
        return {
            error: error instanceof Error
        ? error
        : new Error("Invalid token"), 
            data: null
        }
    }
}