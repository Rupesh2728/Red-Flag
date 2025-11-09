const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const { ParseURL } = require('../controllers/ParseURL');

router.post('/',[
    body('url').isURL().withMessage('Invalid URL'),
],ParseURL);

module.exports=router;