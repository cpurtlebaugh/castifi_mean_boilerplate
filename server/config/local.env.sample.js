'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'castifi-secret',

  FACEBOOK_ID: '178065179196089',
  FACEBOOK_SECRET: '9624f0410385410861a8485107074f5d',

  GOOGLE_ID: '809494367838-otn2v55lbciqdbr33pj22ja7mde7pv3u.apps.googleusercontent.com',
  GOOGLE_SECRET: 'ihDawvHykozXOZ3-ijQN1fp3',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
