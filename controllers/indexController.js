const express = require('express');
const Project = require('../models/project');
const User = require('../models/user');
const History = require('../models/history');
const mongoose = require('mongoose');

function index(request, response, next) {
  response.render('index', {
    title: "Home",
    message: request.flash('signupMessage') + request.flash("loginMessage")
  });
}

function dashboard(request, response, next) {
  Project.find({_id : request.params.id}, (err, obj)=>{
    if(err){
      response.json({
        err: true,
        message: 'No se puede extraer el proyecto',
        obj: err
      });
    }else{
      History.find({"project_id": obj[0]._id}, function(err, objs){
        response.render('dashboard', {
          title: "Dashboard",
          userName: request.user.local.name || request.user.google.name || request.user.facebook.name,
          tabActive: request.params.tab == 'undefined' ? 'home' : request.params.tab,
          project: obj,
          histories: objs
        });
      });
    }
  });
}

function logout(request, response, next) {
  request.logout();
  response.redirect('/');
}

module.exports = {
  index,
  dashboard,
  logout
}
