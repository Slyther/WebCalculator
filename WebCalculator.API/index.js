const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.options('*', cors());
app.use(cors());

const PORT = process.env.PORT || 5000;

const routes = ['add', 'substract', 'multiply', 'divide', 'exp', 'sqrt'];

routes.forEach(route => {
    app.use(`/api/${route}`, require(`./routes/api/${route}`));
});

app.listen(PORT, () => {
    console.log(`Express started on ${PORT}`);
});

module.exports = app;