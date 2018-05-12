const express = require('express');

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.render('index', {
      title: "Home",
      message: "Necesita logearse primero."
    });
}

var isLog = (req, res, next) => {

  if(req.isAuthenticated()){
    res.redirect('dashboard');
  }else {
    return next();
  }

}

module.exports = {
  isLoggedIn,
  isLog
};
