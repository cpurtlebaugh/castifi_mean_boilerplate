var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var Actor = require('../../api/actor/actor.model');
var _ = require('lodash');

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
      profileFields: [ 'emails']
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'facebook.id': profile.id
      },
      function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          user = new User({
            email: profile.emails[0].value,
            role: 'user',
            provider: 'facebook',
            facebook: profile._json
          });
          user.save(function(err, user) {
            if (err) return done(err);
            //create actor object on signup
            //set user.facebookSignup to true
              var newActor = new Actor({ownedBy: user._id, email: user.email})
              newActor.save(function(err, actor){
                var updated = _.merge(user, {actorId: actor._id});
                updated.save(function (err) {})
              })
            done(err, user);
          });
        } else {
          //check for user.facebookSignUp true
          return done(err, user);
        }
      })
    }
  ));
};
