const bodyParser = require('body-parser');
const GitHubStrategy = require('passport-github').Strategy;
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const axios = require('axios');

const PORT = 3001;
const HOST = "0.0.0.0";
const GITHUB_CLIENT_ID = '0128f170a2535c58c4ed';
const GITHUB_CLIENT_SECRET = '8c7da198caf393e3ad94ec5391e470dd826be5a1';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/login', (req, res) => {
  res.redirect('http://localhost:3000');
});

app.get('/me', async (req, res) => {
  try {
    const token = req.query.access_token;
    if(!token) {
      return res.status(400).send()
    }
    const user = await axios.get(`https://api.github.com/user?access_token=${token}`);
    if(!user) {
      return res.status(400).send()
    }
    res.status(200).send({user: user.data})
  } catch (e) {
    res.status(400).send()
  }
});

app.get('/languages', async (req, res) => {
  try {
    const token = req.query.access_token;
    if(!token) {
      return res.status(400).send()
    }
    const {data }  = await axios.get(`https://api.github.com/user/repos?access_token=${token}&visibility=all`);

    const names = [];
    data.forEach(async(repo) => {
      try{
        const stats = {
          name: repo.name,
          languages: repo.language
        };
        names.push(stats)
      } catch (e) {
        console.log(e)
        return
      }
    });
    res.status(200).json(names)
  } catch (e) {
    res.status(400).send()
  }
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
