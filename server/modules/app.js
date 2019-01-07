
const request = require('request');

const express = require('express');
const cors = require('cors');
const { celebrate, Joi, isCelebrate } = require('celebrate');
const EscapeHtml = require('escape-html');
const DB = require('./db');


const app = express();
app.use(express.json());
app.use(cors());

// SQLite DB Handler
const db = new DB();
db.create()
    .then(() => console.log('DB created'))
    .catch(err => { throw err });
db.skeleton()
    .then(()=>console.log('DB skeleton erstellt'))
    .catch(err=> {throw err});

// Joi validation schemas for celebrate
const schema_group_get = {
    params: Joi.object().keys({
        id: Joi.number().required()
    })
};

const schema_group_post = {
    body: Joi.object().keys({
        name: Joi.string().required()
    })
};

const schema_group_put = {
    params: Joi.object().keys({
        id: Joi.number().required()
    }),
    body: Joi.object().keys({
        name: Joi.string().required()
    })
};

// celebrate error middle ware handler
const errors = () => (err, req, res, next) => {
    if (isCelebrate(err)) {
        const error = {
            success : false,
            msg: 'Bad Request',
            err: err.message,
            validation: {
                source: err._meta.source,
                keys: [],
            },
        };

        if (err.details) {
            for (let i = 0; i < err.details.length; i += 1) {
                const path = err.details[i].path.join('.');
                error.validation.keys.push(EscapeHtml(path));
            }
        }
        // return res.status(400).send(error);
        return res.send(error);
    }
    return next(err);
};
//calls
app.get('/', (req, res) => {
    res.send('Quiz App');
});


//call for category
app.get('/questions/:category', (req, res)=> {
    //console.log(req.params);
    db.get_row( `SELECT
    questions.question_content
    FROM
    questions
    WHERE
    questions.id = ?
    `
        ,[+req.params.category]

    )
        .then( row => {

            res.send({
                msg: 'hallo',
                success : true,
                data: row
            });
        })
        .catch( err => {
            res.send({
                success : false,
                msg: 'access question failed',
                err: err
            });
        });
});







app.use(errors());

module.exports = app;