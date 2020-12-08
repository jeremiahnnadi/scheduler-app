const express = require('express');
const passport = require('passport');
const authenticator = express.Router();

// @desc Authenticate with Google 
// @route GET /auth/Google
authenticator.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc Google Auth callback
// @route GET /auth/Google/callback
authenticator.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

// @desc Log out User
// @route /auth/logout
authenticator.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = authenticator;