const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgen = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000;
const app = express();
const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');

// TODO order of execution 'configure passport Module 8 4:55'
// TODO is this controller
app.use(morgen('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json()); // TODO
app.use(express.urlencoded({extended:false}));
app.use(cookieParser);
app.use(session({secret: 'globomantics'}));

require('./src/config/passport.js')(app); // TODO

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('index', {title: 'Globomantics.', data: ['a', 'b', 'c']});
})

app.listen(PORT, ()=>{
    debug(`listening on port ${chalk.green(PORT)}`);
})