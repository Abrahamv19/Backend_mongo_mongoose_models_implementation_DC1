// @ts-check
import express from "express";
import handlebars from "express-handlebars";
import { productManagerRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import  { viewsRouter }  from "./routes/views.router.js";

import { __dirname, __filename } from "./utils.js";
import { Server } from "socket.io";
import http from 'http'
import morgan from "morgan"

const app = express();
const port = 8080;
const server = http.createServer(app);
export const io = new Server(server);

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

//CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//ARCHIVOS PUBLICOS
app.use(express.static(__dirname + "/public"));
app.use(express.static('./public'));

// ENDPOINTS
app.use("/api/products", productManagerRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page Not Found" });
});

// WEBSOCKET 
io.on('connection', (socket) => {
  console.log('Socket Connection on!!');
});

server.listen(port, () => console.log(`Server on!! - Port: ${port}`));

