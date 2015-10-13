'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "castifi-secret",

  FACEBOOK_ID: '178065179196089',
  FACEBOOK_SECRET: '330b5b5fa1041bd53b95430efb2150a8',

  GOOGLE_ID: '809494367838-j9jakg9i4v37vhubblbi99kmadi889ne.apps.googleusercontent.com',
  GOOGLE_SECRET: 'lvsyDZd-1PoZaKBA2k14uqkF',

  AMAZON_ACCESS_KEY_ID: 'AKIAIISRGLXO4APRQGFQ',
  AMAZON_SECRET_ACCESS_KEY: '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',
  S3_BUCKET: 'actortest'

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
