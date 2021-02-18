import cors from "cors";
import routes from "./routes";
import { connect } from "./database";

const express = require('express')
const app = express();
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

connect(() => {
  app.listen(process.env.PORTA || 3333, () => {
    console.log("servidor iniciado")
  });    
});

