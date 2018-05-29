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
  const what_i_want = req.body.what_i_want;
  const so_that = req.body.way;
  const give_it = req.body.give_it;
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
  history.give_it = give_it;
  history.criteria = criteria;
  history.since = then;
  history.when = when;

  history.save((err, history)=>{
    if (err) {
      res.render("error", {title: "Error"});
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
      res.render("error", {title: "Error"});
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
    res.render("error", {title: "Error"});
  });
}

function update_state(request, response, next) {
  const state = request.body.state;

  History.update({_id: mongoose.Types.ObjectId(request.params.id)},
             { $set: {'state': state }},
             function(err, obj) {
                if (err) {
                  res.render("error", {title: "Error"});
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
        res.render("error", {title: "Error"});
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
        res.render("error", {title: "Error"});
      }else{
        res.json({
          err: false,
          message:'Historia eliminada',
          objs: {}
        });
      }
    });
  }else{
    res.render("error", {title: "Error"});
  }
}

function update_sprint(request, response, next) {
  const sprint_id = request.params.sprint_id
  const history_id = request.params.history_id

  History.findOne({
    _id: mongoose.Types.ObjectId(history_id)
  }, function (err, history){
    history.sprint_id = sprint_id;
    history.save((err, obj) => {
      if (err) {
        res.render("error", {title: "Error"});
      } else {
        response.json({
          error: true,
          message: 'Historia Guardada :)',
          objs: err
        });
      }
    });
});
}

function remove_sprint(request, response, next) {
  const history_id = request.params.history_id

  History.findOne({
    _id: mongoose.Types.ObjectId(history_id)
  }, function (err, history){
    history.sprint_id = undefined;
    history.save((err, obj) => {
      if (err) {
        res.render("error", {title: "Error"});
      } else {
        response.json({
          error: false,
          message: 'Historia agregada correctamente :)',
          objs: obj
        });
      }
    });
  });
}

function update_time(request, response, next) {
  const history_id = request.params.history_id;
  const time_estimate = request.body.time_estimate;
  const time_did = {
                    time : request.body.time_did,
                    date : request.body.time_did_date
                  };

  History.findOne({
    _id: mongoose.Types.ObjectId(history_id)
  }, function (err, history){

    history.time_estimate = time_estimate;
    history.time_did = time_did;

    history.save((err, obj) => {
      if (err) {
        res.render("error", {title: "Error"});
      } else {
        if(request.params.dashboard){
          response.redirect('/dashboard_project/'+request.params.project_id);
        }else{
          response.redirect('/dashboard/'+request.params.project_id);
        }
      }
    });
  });
}

module.exports = {
  create,
  index,
  show,
  update,
  remove,
  update_state,
  update_sprint,
  update_time,
  remove_sprint
}
