const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    let { num1 } = req.body;
    let result = {
        operation: `√(${num1})`
    };

    if (typeof num1 !== "number" || num1 < 0) {
        result.result = "Invalid input."
    } else {
        result.result = Math.sqrt(num1);
    }
    res.json(result);
});

module.exports = router;