const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const checkAuth = require('../middleware/check-auth');

const ThreadControler = require('../controlers/threads');

router.get('/', checkAuth, ThreadControler.getAllThreads);

router.post('/', checkAuth, ThreadControler.createThread);

router.get('/:threadId', checkAuth, ThreadControler.getThread);

router.put('/:threadId', checkAuth, ThreadControler.updateThread);

router.delete('/:threadId', checkAuth, ThreadControler.deleteThread);

module.exports = router;