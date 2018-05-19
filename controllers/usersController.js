const express = require('express');
const Ability = require('../models/ability');
const User = require('../models/user');
const mongoose = require('mongoose');

function index(request, response, next) {
  var abilities_db;
  var user;
  Ability.find({"user_id": mongoose.Types.ObjectId(request.user._id)}, function(err, docs){
    if(err){
      abilities_db = null;
    }else{
      abilities_db = docs;
      if(request.user.local.name){
        user = request.user.local
      }else if(request.user.google.name) {
        user = request.user.google
      }else if(request.user.facebook.name) {
        user = request.user.facebook
      }
      response.render('profile', {
        title: "Profile",
        user_id: request.user._id,
        userName: user,
        abilities: abilities_db,
        project_id: request.params.project_id
      });
    }
  });

}

function create(request, response, next) {

}

function update(request, response, next) {
  const name = request.body.name;
  const email = request.body.email;
  const birthday = request.body.birthday;

  User.findOne({
    _id: mongoose.Types.ObjectId(request.params.id)
  }, function (err, doc){
    if(request.user.local.name){
      doc.local.name = name;
      doc.local.email = email;
      doc.local.birthday = birthday;
    }else if(request.user.google.name) {
      doc.google.name = name;
      doc.google.email = email;
      doc.google.birthday = birthday;
    }else if(request.user.facebook.name) {
      doc.facebook.name = name;
      doc.facebook.email = email;
      doc.facebook.birthday = birthday;
    }
  doc.save((err, obj) => {
    if (err) {
      response.json({
        error: true,
        message: 'Usuario no Guardado',
        objs: {}
      });
    } else {
      response.json({
        error: false,
        message: 'Usuario Guardado',
        objs: {}
      });
    }
  });;
});
}

function remove(request, response, next) {

}
module.exports = {
  index,
  create,
  update,
  remove
}
