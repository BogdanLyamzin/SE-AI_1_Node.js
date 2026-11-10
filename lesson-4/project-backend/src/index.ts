import express from "express";
import {resolve} from "node:path";

import notFoundHanler from "./middlewares/notFoundHandler.ts";
import errorHandler from "./middlewares/errorHandler.ts";

import contactPageRouter from "./routes/contactPageRouter.ts";
import contactRouter from "./routes/contactRouter.ts";

const templatesPath = resolve("src", "templates");

const app = express(); 

app.set("view engine", "ejs");
app.set("views", templatesPath);

app.use("/pages/contacts", contactPageRouter);
app.use("/api/contacts", contactRouter);

app.use(notFoundHanler);
app.use(errorHandler);

app.listen(3000, ()=> console.log("Server running on 3000 port"));