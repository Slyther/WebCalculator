const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    let { num1, num2 } = req.body;
    let result = {
        operation: `${num1} - ${num2}`
    };

    if (typeof num1 !== "number" || typeof num2 !== "number" ) {
        result.result = "Invalid input."
    } else {
        result.result = num1 - num2;
    }
    res.json(result);
});

module.exports = router;