const express = require('express');
const cors = require('cors');
const AnalyzeDataRoute=require('./routes/DataAnalysis.routes');
const ParseRoute=require('./routes/Parse.routes');
const dotenv=require('dotenv');

const app = express();
dotenv.config();
app.use(cors({
    origin: '*',
    methods: [],
}));
app.use(express.json());

app.use('/',AnalyzeDataRoute);
app.use('/parse', ParseRoute);
module.exports=app;