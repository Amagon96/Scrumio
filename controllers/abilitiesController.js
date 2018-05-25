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
      response.json({
        error: true,
        message: 'Abilidad no guardada',
        objs: err
      });
    } else {
      var abilities_db;
      Ability.find({"user_id": mongoose.Types.ObjectId(request.user._id)}, function(err, docs){
        if(err){
          abilities_db = null;
        }else{
          abilities_db = docs;
          response.redirect('/profile/'+request.params.project_id);
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
      response.json({
        error: true,
        message: 'Habilidad no Guardada',
        objs: err
      });
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
        response.json({
          error: true,
          message: 'Habilidad no Eliminado.',
          objs: {}
        });
      } else {
        response.json({
          error: false,
          message: 'Habilidad Eliminada.',
          objs: {}
        });
      }
    });
  } else {
    response.json({
      error: true,
      message: 'Habilidad no Existe',
      objs: {}
    });
  }
}

module.exports = {
  index,
  create,
  update,
  remove
}
