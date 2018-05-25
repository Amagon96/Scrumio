const express = require('express');
const mongoose = require('mongoose');
const History = require('../models/history');

function create(req, res, next){
  const narrative = req.body.narrative;
  const project_id = req.params.project_id
  const creator_id = req.user._id
  const state = "En Validación";
  const priority = req.body.priority;
  const size = req.body.size;
  const how = req.body.how;
  const what_i_want = req.body.way;
  const so_that = req.body.give_it;
  const criteria = req.body.criteria;
  const when = req.body.when;
  const then = req.body.then;

  let history = new History();

  history.narrative = narrative;
  history.project_id = project_id;
  history.creator_id = creator_id;
  history.state = state;
  history.priority = priority;
  history.size = size;
  history.how = how;
  history.what_i_want = what_i_want;
  history.so_that = so_that;
  history.criteria = criteria;
  history.since = then;
  history.when = when;

  history.save((err, history)=>{
    if (err) {
      res.json({
        err: true,
        message: 'No se pudo guardar historia',
        objs: err
      });
    }else{
      res.redirect('/dashboard/'+req.params.project_id);
    }
  });
}

function index(req, res, next){
  const page = req.params.page ? req.params.page : 1;
  History.paginate({}, {
    page: page,
    limit:3
  }, (err, history)=>{
    if(err){
      res.json({
        err: true,
        message: 'No se pudo listar proyectos',
        objs: {}
      });
    }else{
      res.json({
        err: false,
        message:'Lista de proyectos',
        objs:history
      });
    }
  });
}

//FindById
function show(req, res, next){
  const id = req.params.id;
  History.findOne({
    _id:id
  }, (err, obj)=>{
    res.json({
      err: true,
      message : 'Historia',
      obj: obj
    });
  });
}

function update_state(request, response, next) {
  const state = request.body.state;

  History.update({_id: mongoose.Types.ObjectId(request.params.id)},
             { $set: {'state': state }},
             function(err, obj) {
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
             });
}

function update(request, response, next) {
  const narrative = request.body.narrative;
  const project_id = request.params.project_id
  const creator_id = request.user._id
  const state = "En Validación";
  const priority = request.body.priority;
  const size = request.body.size;
  const how = request.body.how;
  const what_i_want = request.body.way;
  const so_that = request.body.give_it;
  const criteria = request.body.criteria;
  const when = request.body.when;
  const then = request.body.then;

  History.findOne({
    _id: mongoose.Types.ObjectId(request.params.id)
  }, function (err, history){
    history.narrative = narrative;
    history.project_id = project_id;
    history.creator_id = creator_id;
    history.state = state;
    history.priority = priority;
    history.size = size;
    history.how = how;
    history.what_i_want = what_i_want;
    history.so_that = so_that;
    history.criteria = criteria;
    history.since = then;
    history.when = when;
    history.save((err, obj) => {
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
    });
});
}

function remove(req, res, next){
  const id = req.params.id;
  if(id){
    History.remove({_id:id}, function(err){
      if (err) {
        res.json({
          err: true,
          message: 'No se pudo eliminar historia',
          objs: {}
        });
      }else{
        res.json({
          err: false,
          message:'Historia eliminada',
          objs: {}
        });
      }
    });
  }else{
    res.json({
      err: true,
      message:'Historia no existe',
      objs:{}
    });
  }
}


module.exports = {
  create,
  index,
  show,
  update,
  remove,
  update_state
}
