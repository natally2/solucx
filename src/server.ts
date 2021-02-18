// import express from "express";
import cors from "cors";
import routes from "./routes";
import { connect } from "./database";

const express = require('express')
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

connect(() => {
    app.listen(process.env.PORTA || 3333, () => {
        console.log("servidor iniciado")
    });    
});
