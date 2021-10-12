const passport = require('passport');

// TODO configuration is on the site 'https://www.npmjs.com/package/passport'

module.exports = function passportConfig(){
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done)=> {
        done(null, user); // TODO explore how serialize works
    });
    passport.deserializeUser((user, done)=>{
        done(null, user); // TODO explore how deserialize works
    })
}