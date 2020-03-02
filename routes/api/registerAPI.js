var express = require('express');

module.exports = () => {
    let router = express.Router();

    router.post('/', (req, res) => {
       const apiRes = req.body;
       console.log(apiRes);
       res.send(apiRes);
    });

    return router;
}