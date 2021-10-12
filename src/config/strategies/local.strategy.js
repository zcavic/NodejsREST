const passport = require('passport');
const debug = require('debug')('app:localStrategy');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy(){
    passport.use(
        new Strategy(
            {
                usernameField: 'username', // TODO explore how we can use 'username' just like that 
                passwordField: 'password'
            }, 
            (username, password, done) => { // TODO explore why we can use username and password
                const url = 'mongodb+srv://dbUser:4wvTkSQovddkQvwd@cluster0.b2tlh.mongodb.net?retryWrites=true&w=majority';
                const dbName = 'globomantics';
                (async function validateUser(){
                    let client;
                    try {
                        client = await MongoClient.connect(url);
                        debug('Connected to the database');
                        const db = client.db(dbName);
                        const user = await db.collection('users').findOne({username});
                        if(user && user.password === password) {
                            done(null, user);
                        } else {
                            done(null, false);
                        }
                    } catch (error) {
                        done(error, false);
                    }
                    client.close();
                })();
            }
        )
    );
};