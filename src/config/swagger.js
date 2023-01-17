import swaggerJSDoc from "swagger-jsdoc";

const definition = {
  openapi: "3.0.0",
  info: {
    title: "treegram Apis",
    version: `1.0.0`,
  },
  servers: [
    {
      url: `http://localhost:8000/api/v1`,
    },
  ],
};
const options = {
  failOnErrors: true,
  definition,
  apis: ["./src/docs/*.yml"],
};

export default swaggerJSDoc(options);
