import express from "express";

import notFoundHanler from "./middlewares/notFoundHandler.ts";
import errorHandler from "./middlewares/errorHandler.ts";

import contactRouter from "./routes/contactRouter.ts";

const app = express(); // app - web-server

// app.use((req, res, next)=> {
//     console.log("First middleware");
//     next();
// })

// app.use((req, res, next)=> {
//     console.log("Second middleware");
//     next();
// })

app.get("/", (request, response)=> {
    console.log(request.method);
    console.log(request.url);
    response.send("<h1>Home page</h1>");
});

app.use("/api/contacts", contactRouter);

app.use(notFoundHanler);
app.use(errorHandler);

app.listen(3000, ()=> console.log("Server running on 3000 port"));