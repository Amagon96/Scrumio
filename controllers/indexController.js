const express = require('express');
const Project = require('../models/project');
const User = require('../models/user');
const mongoose = require('mongoose');

function index(request, response, next) {
  response.render('index', {
    title: "Home",
    message: request.flash('signupMessage') + request.flash("loginMessage")
  });
}

function dashboard(request, response, next) {
  console.log(request.params.id);
  Project.find({_id : request.params.id}, (err, obj)=>{
    if(err){
      response.json({
        err: true,
        message: 'No se puede extraer el proyecto',
        obj: err
      });
    }else{
      console.log(obj);
      response.render('dashboard', {
        title: "Dashboard",
        userName: request.user.local.name,
        tabActive: request.params.tab == 'undefined' ? 'home' : request.params.tab,
        project: obj
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
