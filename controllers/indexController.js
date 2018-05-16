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
  // Project.find({"product_owner_id" : request.user._id}, (err, objs)=>{
  //   if(err){
  //     response.json({
  //       err: true,
  //       message: 'No se puedieron extraer los proyectos',
  //       objs: err
  //     });
  //   }else{
  //     response.render('dashboard', {
  //       title: "Dashboard",
  //       userName: request.user.local.name,
  //       tabActive: request.params.tab == 'undefined' ? 'home' : request.params.tab,
  //       projects: objs
  //     });
  //   }
  // });

  response.render('dashboard', {
        title: "Dashboard",
        userName: request.user.local.name,
        tabActive: request.params.tab == 'undefined' ? 'home' : request.params.tab,
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
