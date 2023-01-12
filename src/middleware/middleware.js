import cors from "cors";
import express from "express";
import swaggerSpec from "../config/swagger.js";
import swaggerUi from "swagger-ui-express";
export default class {
  static init(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    const corsOptions = {
      origin: "*",
    };
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Methods",
        "GET , POST, PATCH, PUT , DELETE, OPTIONS"
      );
      next(); //   next is compulsory in middleware else no use of it
    });
  }
}
