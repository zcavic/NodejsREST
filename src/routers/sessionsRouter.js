const express = require('express');
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectId } = require('mongodb');
const speakerService = require('../services/speakerService');

const sessionsRouter = express.Router();

sessionsRouter.use((req, res, next)=>{
    if(req.user) {
        next();
    } else {
        res.redirect('/auth/signIn');
    }
});

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
          const speaker = await speakerService.getSpeakerById(
              session.speakers[0].id
          );
          session.speaker = speaker.data;
          res.render('session', { session });
      } catch(error ){
          debug(error.stack);
      }
  }())
});

module.exports = sessionsRouter;
