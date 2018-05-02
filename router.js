const express = require('express');
const router = express.Router();

async function home(req, res){
    res.render('home');
}

async function product(req, res){
    res.render('product');
}

function catchErrors(fn) {
    return (req, res, next) => fn(req, res, next).catch(next);
}

router.get('/', catchErrors(home));
router.get('/:product', catchErrors(product));

module.exports = router;