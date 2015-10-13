'use strict';

var _ = require('lodash');
var Actor = require('./actor.model');
var AWS = require('aws-sdk');
var AWS_ACCESS_KEY = '';
var AWS_SECRET_KEY = '';
var S3_BUCKET      = '';
var fs = require('fs');



// Get list of actors
exports.index = function(req, res) {
  Actor.find(function (err, actors) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(actors);
  });
};

// Get a single actor
exports.show = function(req, res) {
  Actor
  .findById(req.params.id)
  .populate('ownedBy')
  .exec(function(err, actor) {
      if(err) { return handleError(res, err); }
      if(!actor) { return res.status(404).send('Not Found'); }
      return res.json(actor);
  });
};

// Creates a new actor in the DB.
exports.create = function(req, res) {
  Actor.create(req.body, function(err, actor) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(actor);
  });
};

// Updates an existing actor in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Actor.findById(req.params.id, function (err, actor) {
    if (err) { return handleError(res, err); }
    if(!actor) { return res.status(404).send('Not Found'); }
    var updated = _.merge(actor, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(actor);
    });
  });
};

exports.uploadFile = function(req, res) {
      var file = req.files.file;
  fs.readFile(file.path, function (err, data) {
    if (err) throw err; // Something went wrong!
      var bucket = new AWS.S3({ params: { Bucket: 'actortest' } });
      console.log(file)
       AWS.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
       AWS.config.region = 'us-west-1';
       var s3 = new AWS.S3();
       var params = {
           Key: file.originalFilename,
           Bucket: 'actortest',
           Body: data
           // Expires: 60,
           // ContentType: file.type,
           // ACL: 'public-read'
       };

       s3.putObject(params, function(err, data) {
         if(err) {
           console.log(err.message,err.code);
           return false;
         }
         else {
           // Upload Successfully Finished
           console.log('File Uploaded Successfully', 'Done');
         }
       })
      })
    }
       // s3.getSignedUrl('putObject', s3_params, function(err, data){
       //     if(err){
       //         console.log(err);
       //     }
       //     else{
       //      console.log(data)
       //         var return_data = {
       //             signed_request: data,
       //             url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+file.name
       //         };
       //         res.write(JSON.stringify(return_data));
       //         res.end();
       //     }

       // });

   // console.log(file.name);
   // console.log(file.type);


// Deletes a actor from the DB.
exports.destroy = function(req, res) {
  Actor.findById(req.params.id, function (err, actor) {
    if(err) { return handleError(res, err); }
    if(!actor) { return res.status(404).send('Not Found'); }
    actor.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
