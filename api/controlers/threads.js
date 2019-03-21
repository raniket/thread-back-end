const mongoose = require('mongoose');
const Thread = require('../models/thread');
const dotenv = require('dotenv').config();

exports.getAllThreads = (req, res, next) => {
  Thread.find()
    .select('_id title description tags userName date')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        threads: docs.map(doc => {
          return {
            ...doc._doc,
            request: {
              type: 'GET',
              description: 'get thread by id',
              url: `${process.env.BASE_URL}/threads/${doc._id}`
            }
          }
        })
      }
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error });
    });
};

exports.createThread = (req, res, next) => {
  const { title, description, tags, userName } = req.body;
  // const thread = { title, description, tags, userName, date };
  // console.log('thread ::: ', thread);
  const thread = new Thread({
    _id: mongoose.Types.ObjectId(),
    title: title,
    description: description,
    tags: tags,
    userName: userName,
    date: new Date()
  });
  thread.save()
    .then(result => {
      console.log('result : ', result);
      res.status(201).json({
        _id: result._id,
        title: result.title,
        description: result.description,
        tags: result.tags,
        userName: result.userName,
        date: result.date,
        request: {
          type: 'GET',
          description: 'get thread by id',
          url: `${process.env.BASE_URL}/threads/${result._id}`
        }
      });
    })
    .catch(error => {
      console.log('error : ', error)
      res.status(500).json({error: error});
    });
};

exports.getThread = (req, res, next) => {
  const id = req.params.threadId;
  Thread.findById(id)
    .select('title description tags userName date')
    .exec()
    .then(doc => {
      console.log('from database : ', doc);
      if (doc) {
        res.status(200).json({
          ...doc._doc,
          request: {
            type: 'GET',
            description: 'get list of all threads',
            url: `${process.env.BASE_URL}/threads`
          }
        });
      } else {
        res.status(404).json({
          error: {
            message: 'Not Found'
          }
        });
      }
    })
    .catch(error => {
      console.log('error in fatching data from database');
      res.status(500).json({
        error: error
      });
    })
};

exports.updateThread = (req, res, next) => {
  const id = req.params.threadId;
  console.log('logger : ', req.body);
  const updateThread = req.body;
  Thread.update({ _id: id }, { $set: updateThread })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        ...updateThread,
        request: {
          type: 'GET',
          description: 'get thread by id',
          url: `${process.env.BASE_URL}/threads/${id}`
        }
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error });
    })
};

exports.deleteThread = (req, res, next) => {
  const id = req.params.threadId;
  Thread.remove({ _id: id })
    .exec()
    .then(response => res.status(200).json({
      message: 'thread deleted',
      request: {
        type: 'POST',
        description: 'create thread',
        url: `${process.env.BASE_URL}/threads`,
        body: {
          title: 'String',
          description: 'String',
          tags: 'Array',
          userName: 'String'
        }
      }
    }))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error });
    });
};