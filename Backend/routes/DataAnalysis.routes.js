const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const { AnalyzeData } = require('../controllers/AnalyzeData');

router.post('/',[
    body('domain').isString().withMessage('Domain must be a string'),
    body('url').isURL().withMessage('Invalid URL format')
],AnalyzeData);

module.exports=router;