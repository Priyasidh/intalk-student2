const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Agami Intalk API",
    version: "1.0.0",
    description: "API documentation for Agami Intalk backend",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Intalk-io Server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
     BearerAuth: [],
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["./controllers/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
