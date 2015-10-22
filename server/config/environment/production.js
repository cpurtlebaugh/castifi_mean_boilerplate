'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/castifi' ||
            'mongodb://castifiReadWrite:castifiReadWrite@ec2-52-8-34-169.us-west-1.compute.amazonaws.com:27017/castifiProdOne'
  }


// 'mongodb://{NEW USERNAME}:{NEW PASSWORD}@{EC2 URL}:{PORT}/dummyDB'
// 'mongodb://castifiReadWrite:castifiReadWrite@ec2-52-8-34-169.us-west-1.compute.amazonaws.com:27017/castifiProdOne'
// mongo ec2-52-8-34-169.us-west-1.compute.amazonaws.com/castifiProdOne -u castifiReadWrite -p 'castifiReadWrite'