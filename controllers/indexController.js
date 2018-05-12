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
  response.render('dashboard', {
    title: "Dashboard",
    userName: request.user.local.name,
    tabActive: request.params.tab == 'undefined' ? 'home' : request.params.tab
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
