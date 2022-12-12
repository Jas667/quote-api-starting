const express = require('express');

const quotes = require('./data');
const { getRandomElement } = require('./utils');

quotesRouter = express.Router();

quotesRouter.get('/', (req, res, next) => {
    const personArray = quotes.filter(element => element.person === req.query.person);
    if (personArray.length > 0) {
        res.send({quotes: personArray});
    } else {
        res.send({quotes: quotes})
    }
});

//get request to send back random quote
quotesRouter.get('/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    // console.log(randomQuote);
    res.send({quote : randomQuote});
});

//post request
quotesRouter.post('/', (req, res, next) => {
    const id = quotes.length + 1
    const person = req.query.person;
    const quote = req.query.quote;

    if (person && quote) {
        const newQuote = {"id": id, "person": person, "quote": quote};
        quotes.push(newQuote);
        console.log(quotes)
        res.send({quote: newQuote});
    } else {
        res.status(400).send(`Oops, that didn't work!`);
    }
})

// //put request
quotesRouter.put('/edit', (req, res, next) => {
    //find correct quote to modify. If it does not exist, index of will be set as -1
    const quoteIndexFromId = quotes[Number(req.query.id - 1)];
    //extract the person and quote to modify, as well as id number
    const idSelected = Number(req.query.id);
    const editPerson = req.query.person;
    const editQuote = req.query.quote;

    if (quoteIndexFromId) {
        if (editPerson && editQuote) {
            const newQuote = {
                "id": idSelected, 
                "quote": editQuote, 
                "person": editPerson
            };
            quotes[idSelected - 1] = newQuote;
            res.send({quote: newQuote});
        }
    } else {
        res.status(404).send(`Id does not exist.`);
    }
});

//for deleting quote
quotesRouter.delete('/delete', (req, res, next) => {
    const quoteSelected = quotes[Number(req.query.id - 1)];
    //extract id chosen and change it so that it equals the element position in array. This can then be used to find/delete
    const idSelected = Number(req.query.id);
    if (quoteSelected) {
        quotes.splice((idSelected - 1), 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});


module.exports = quotesRouter;