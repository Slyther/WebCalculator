const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    let { num1, num2 } = req.body;
    let result = {
        operation: `${num1} ^ ${num2}`
    };

    if (typeof num1 !== "number" || typeof num2 !== "number" ) {
        result.errorMsg = "Invalid input.";
        result.result = -1;
    } else {
        result.result = Math.pow(num1, num2);
    }
    res.json(result);
});

module.exports = router;