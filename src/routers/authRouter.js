const express = require('express');
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectId } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
    const { username, password } = req.body;
    const url = 'mongodb+srv://dbUser:4wvTkSQovddkQvwd@cluster0.b2tlh.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globomantics';

    (async function addUser(){
        let client = null;
        try{
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            const user = { username, password };
            const results = await db
                .collection('users')
                .insertOne(user);
            debug(results);
            req.login(results, () => {
                res.redirect('/auth/profile');
            });
        } catch(error) {
            debug(error);
        }
        if (client) {
            client.close();
        }
    }())
});

authRouter
    .route('/signIn')
    .get((req, res) => {
        res.render('signin');
    })
    .post(passport.authenticate('local', { // TODO what mean 'local' authenticate
        successRedirect: '/auth/profile',
        failureMessage: '/'
    }));

authRouter.route('/profile').get((req, res)=>{
    res.json(req.user);
});

module.exports = authRouter;