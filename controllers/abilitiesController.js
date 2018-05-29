const express = require('express');
const Ability = require('../models/ability');
const mongoose = require('mongoose');

function index(request, response, next) {

}

function create(request, response, next) {
  const name = request.body.name;
  const type = request.body.type;
  const user_id = request.user._id;
  console.log(request.params.project_id);
  let ability = new Ability();
  ability.name = name;
  ability.user_id = user_id;
  ability.type = type;

  ability.save((err, obj) => {
    if (err) {
      res.render("error", {title: "Error"});
    } else {
      var abilities_db;
      Ability.find({"user_id": mongoose.Types.ObjectId(request.user._id)}, function(err, docs){
        if(err){
          abilities_db = null;
        }else{
          abilities_db = docs;
          if(request.params.dashboard_project){
            response.redirect('/profile/'+request.params.project_id+'/dashboard_project');
          }else if(request.params.project_id){
            response.redirect('/profile/'+request.params.project_id);
          }else{
            response.redirect('/profile');
          }
        }
      });
    }
  });

}

function update(request, response, next) {
  const name = request.body.name;
  const type = request.body.type;

  Ability.findOne({
    _id: mongoose.Types.ObjectId(request.params.id)
  }, function (err, doc){
  doc.name = name;
  doc.type = type;
  doc.save((err, obj) => {
    if (err) {
      res.render("error", {title: "Error"});
    } else {
      response.json({
        error: false,
        message: 'Habilidad Guardada',
        objs: obj
      });
    }
  });;
});
}

function remove(request, response, next) {
  const id = request.params.id;
  if (id) {
    Ability.remove({
      _id: id
    }, function(err) {
      if (err) {
        res.render("error", {title: "Error"});
      } else {
        response.json({
          error: false,
          message: 'Habilidad Eliminada.',
          objs: {}
        });
      }
    });
  } else {
    res.render("error", {title: "Error"});
  }
}

module.exports = {
  index,
  create,
  update,
  remove
}
