const bodyParser = require('body-parser');
const GitHubStrategy = require('passport-github').Strategy;
const express = require('express');
const passport = require('passport');

const PORT = 3001;
const HOST = "0.0.0.0";
const GITHUB_CLIENT_ID = '0128f170a2535c58c4ed';
const GITHUB_CLIENT_SECRET = '8c7da198caf393e3ad94ec5391e470dd826be5a1';

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/login', (req, res) => {
  res.redirect('http://localhost:3000/login');
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/github/callback"
  }, function (accessToken, refreshToken, profile, cb) {
    const user = {
      profile: profile,
      accessToken: accessToken,
      refreshToken: refreshToken
    };
    return cb(null, user);
  }
));

app.get('/auth/github', passport.authenticate('github', { session: false}));

app.get('/auth/github/callback', passport.authenticate('github', { session: false ,failureRedirect: '/login'}), (req, res) => {

  res.redirect('http://localhost:3000/callback?access_token='+ req.user.accessToken);
});


app.listen(PORT, HOST, e => {
  if (e) {
    throw e;
  }
  console.log(`Server started running at port ${PORT} on ${HOST}`);
});
