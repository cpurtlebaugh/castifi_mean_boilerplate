'use strict';

var express = require('express');
var controller = require('./actor.controller');
var auth = require('../../auth/auth.service');
// var multiparty = require('multiparty');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// var  multipartyMiddleware = multiparty;

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/uploads', multipartMiddleware, controller.uploadFile);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
