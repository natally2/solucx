import cors from "cors";
import routes from "./routes";
import { connect } from "./database";

const express = require('express')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Solucx",
        description: "Medição de nível de satisfação que os clientes tem da marca.",
        contact: {
          name: "Natally Riqueto"
        },
        servers: ["http://localhost:3333/"]
      }
    },
    apis: ['.routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connect(() => {
    app.listen(process.env.PORTA || 3333, () => {
        console.log("servidor iniciado")
    });    
});

