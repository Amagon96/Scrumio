const express = require('express');
const mongoose = require('mongoose');
const History = require('../models/history');

function create(req, res, next){
  const narrative = req.body.narrative;
  const product_owner_id = req.user._id
  const state = req.body.state;
  const priority = req.body.priority;
  const size = req.body.size;
  const how = req.body.how;
  const what_i_want = req.body.what_i_want;
  const so_that = req.body.so_that;
  const criteria = req.body.criteria;
  const since = req.body.since;
  const when = req.body.when;
  const so = req.body.so;

  let history = new History();

  history.narrative = narrative;
  history.product_owner_id = product_owner_id;
  history.state = state;
  history.priority = priority;
  history.size = size;
  history.how = how;
  history.what_i_want = what_i_want;
  history.so_that = so_that;
  history.criteria = criteria;
  history.since = since;
  history.when = when;
  history.so = so;

  history.save((err, history)=>{
    if (err) {
      res.json({
        err: true,
        message: 'No se pudo guardar historia',
        objs: {}
      });
    }else{
      res.json({
        err: false,
        message:'Historia guardada',
        objs:history
      });
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

function update(request, response, next) {
  const narrative = req.body.narrative;
  const product_owner_id = req.user._id
  const state = req.body.state;
  const priority = req.body.priority;
  const size = req.body.size;
  const how = req.body.how;
  const what_i_want = req.body.what_i_want;
  const so_that = req.body.so_that;
  const criteria = req.body.criteria;
  const since = req.body.since;
  const when = req.body.when;
  const so = req.body.so;

  History.findOne({
    _id: mongoose.Types.ObjectId(request.params.id)
  }, function (err, history){
    history.narrative = narrative;
    history.product_owner_id = product_owner_id;
    history.state = state;
    history.priority = priority;
    history.size = size;
    history.how = how;
    history.what_i_want = what_i_want;
    history.so_that = so_that;
    history.criteria = criteria;
    history.since = since;
    history.when = when;
    history.so = so;
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
  remove
}
