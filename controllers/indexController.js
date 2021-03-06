const express = require('express');
const Project = require('../models/project');
const User = require('../models/user');
const History = require('../models/history');
const Sprint = require('../models/sprint');
const Member = require('../models/member');
const Team = require('../models/team');
const Archive = require('../models/archive');
const mongoose = require('mongoose');

function index(request, response, next) {
  response.render('index', {
    title: "Home",
    message: request.flash('signupMessage') + request.flash("loginMessage")
  });
}

function dashboard(request, response, next) {
  var user_db;
  if(request.user.local.name){
    user_db = request.user.local
  }else if(request.user.google.name) {
    user_db = request.user.google
  }else if(request.user.facebook.name) {
    user_db = request.user.facebook
  }
  Project.find({_id : request.params.id}, (err, obj)=>{
    if(err){
      res.render("error", {title: "Error"});
    }else{
      History.find({"project_id": obj[0]._id}, function(err, objs){
        Sprint.find({"project_id": obj[0]._id}, function(err, sprints_db){
          Member.find({"project_id": obj[0]._id}, function(err, members_db){
            Team.find({"project_id": obj[0]._id}, function(err, teams_db){
              Archive.find({"project.product_owner_id": request.user._id}, function(err, archives_db){
                response.render('dashboard', {
                  title: "Dashboard",
                  userName: request.user.local.name || request.user.google.name || request.user.facebook.name,
                  user: user_db,
                  tabActive: request.params.tab == 'undefined' ? 'home' : request.params.tab,
                  project: obj,
                  histories: objs,
                  sprints: sprints_db,
                  members: members_db,
                  teams: teams_db,
                  archives: archives_db
                });
              });
            });
          });
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
