const express = require('express');
const Project = require('../models/project');
const User = require('../models/user');
const mongoose = require('mongoose');

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
    res.redirect('home_projects');
  }else {
    return next();
  }

}

var hasProyect = (req, res, next) => {
  var project;
  Project.find({_id: req.params.id}, function(err, obj){
    project = obj;
    if(project != undefined){
      next();
    }else{
      res.redirect('/home_projects');
    }
  });
};

module.exports = {
  isLoggedIn,
  isLog,
  hasProyect
};
