const express = require('express');
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectId } = require('mongodb');

const sessionsRouter = express.Router();

sessionsRouter.route('/').get((req, res) => {
  const url = 'mongodb+srv://dbUser:4wvTkSQovddkQvwd@cluster0.b2tlh.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try{
            client = await MongoClient.connect(url);
            debug('Connected to the database');
            const db = client.db(dbName);
            const sessions = await db.collection('sessions').find().toArray();
            res.render('sessions', { sessions });
        } catch(error ){
            debug(error.stack);
        }
    }())
});

sessionsRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  const url = 'mongodb+srv://dbUser:4wvTkSQovddkQvwd@cluster0.b2tlh.mongodb.net?retryWrites=true&w=majority';
  const dbName = 'globomantics';
  (async function mongo(){
      let client;
      try{
          client = await MongoClient.connect(url);
          debug('Connected to the database');
          const db = client.db(dbName);
          const session = await db.collection('sessions').findOne({ _id: new ObjectId(id) });
          res.render('session', { session });
      } catch(error ){
          debug(error.stack);
      }
  }())
});

module.exports = sessionsRouter;