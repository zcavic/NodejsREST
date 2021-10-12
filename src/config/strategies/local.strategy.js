const passport = require('passport');
const { Strategy } = require('passport-local');

module.exports = function localStrategy(){
    passport.use(
        new Strategy(
            {
                usernameField: 'username', // TODO explore how we can use 'username' just like that 
                passwordField: 'password'
            }, 
            (username, password, done) => { // TODO explore why we can use username and password
                const user = {username, password, 'name': 'Jonathan'};
                done(null, user);
            }
        )
    );
};