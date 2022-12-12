const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

const quotesRouter = require('./quotesRouter.js')
app.use('/api/quotes', quotesRouter);

//start server listening at port 4001

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});