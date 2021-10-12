const passport = require('passport');
require('./strategies/local.strategy')();

// TODO configuration is on the site 'https://www.npmjs.com/package/passport'

module.exports = function passportConfig(app){
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done)=> {
        done(null, user); // TODO explore how serialize works
    });
    passport.deserializeUser((user, done)=>{
        done(null, user); // TODO explore how deserialize works
    })
}