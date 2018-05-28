const express = require('express');
const Project = require('../models/project');
const Archive = require('../models/archive');
const mongoose = require('mongoose');
const Member = require('../models/member');
const History = require('../models/history');
const Sprint = require('../models/sprint');

function index(req, res, next){
  var user;
  Project.find({"product_owner_id" : req.user._id}, (err, objs)=>{
    if(err){
      res.json({
        err: true,
        message: 'No se puedieron extraer los proyectos',
        objs: err
      });
    }else{
      if(req.user.local.name){
        user = req.user.local
      }else if(req.user.google.name) {
        user = req.user.google
      }else if(req.user.facebook.name) {
        user = req.user.facebook
      }
      res.render('projects', {
        title: "Proyectos",
        userName: user,
        projects: objs,
        project_id: req.params.project_id
      });
    }
  });
}

function create(req, res, next){
  const nombre = req.body.name;
  const date_request = req.body.date_request;
  const date_deployed = req.body.date_deployed;
  const product_owner = req.body.product_owner;
  const product_owner_id = req.user._id;
  const description = req.body.description;

  let proyect = new Project();

  proyect.nombre = nombre;
  proyect.date_request = date_request;
  proyect.date_deployed = date_deployed;
  proyect.product_owner = product_owner;
  proyect.product_owner_id = product_owner_id;
  proyect.description = description;

  proyect.save((err, archive)=>{
    if (err) {
      res.json({
        err: true,
        message: 'No se pudo guardar el proyecto',
        objs: err
      });
    }else{
      Project.find({"product_owner_id" : req.user._id}, (err, objs)=>{
        if(err){
          res.json({
            err: true,
            message: 'No se puedieron extraer los proyectos',
            objs: err
          });
        }else{
          var user;
          if(req.user.local.name){
            user = req.user.local
          }else if(req.user.google.name) {
            user = req.user.google
          }else if(req.user.facebook.name) {
            user = req.user.facebook
          }
          res.render('home_projects', {
            title: "Proyectos",
            userName: user,
            projects: objs
          });
        }
      });
    }
  });
}

function home(req, res, next){
  var user;
  var member_projects = [];
  if(req.user.local.name){
    user = req.user.local
  }else if(req.user.google.name) {
    user = req.user.google
  }else if(req.user.facebook.name) {
    user = req.user.facebook
  }
  Project.find({"product_owner_id" : req.user._id}, (err, objs)=>{
    if(err){
      res.json({
        err: true,
        message: 'No se puedieron extraer los proyectos',
        objs: err
      });
    }else{
      Member.find({"user_id": req.user._id}, function(err, members){

        if(members.length != 0){
          members.forEach(function(item, index){
            Project.findOne({_id: item.project_id}, function(err, project){
              if(err){

              }else{
                member_projects.push(project);
              }
              if(index + 1 == members.length){
                console.log(member_projects);
                res.render('home_projects', {
                  title: "Proyectos",
                  userName: user,
                  projects: objs,
                  projects_member: member_projects
                });
              }
            });
          });
        }else{
          res.render('home_projects', {
            title: "Proyectos",
            userName: user,
            projects: objs,
            projects_member: member_projects
          });
        }
      });
    }
  });
}

function update(req, res, next){
  const nombre = req.body.name;
  const date_request = req.body.date_request;
  const date_deployed = req.body.date_deployed;
  const product_owner = req.body.product_owner;
  const product_owner_id = req.user._id;
  const description = req.body.description;

  let proyect = {};

  proyect.nombre = nombre;
  proyect.date_request = date_request;
  proyect.date_deployed = date_deployed;
  proyect.product_owner = product_owner;
  proyect.product_owner_id = product_owner_id;
  proyect.description = description;

  Project.findOneAndUpdate({ _id : req.params.id}, {$set: proyect}, {new: true},
    (err, proyect)=>{
    if (err) {
      res.json({
        err: true,
        message: 'No se pudo editar el proyecto',
        objs: err
      });
    }else{
      res.json({
        err: false,
        message:'Proyecto Editado',
        objs: proyect
      });
    }
  });
}

function findByOne(req, res, next){
  const id = req.params.id;
  Project.findOne({
    _id:id
  }, (err, obj)=>{
    if(err){
      res.json({
        err: true,
        message : 'Proyecto',
        obj: err
      });
    }else{
      res.redirect('dashboard');
    }
  });
}

function remove(req, res, next){
  const id = req.params.id;
  if(id){
    Project.findByIdAndRemove(id, function(err, obj){
      if (err) {
        res.json({
          err: true,
          message: 'No se pudo eliminar proyecto',
          objs: {}
        });
      }else{
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        }
        if(mm<10) {
            mm = '0'+mm
        }
        today = yyyy + '-' + mm + '-' + dd;

        let archive = new Archive();
        archive.project = obj;
        archive.date_finished = today;

        archive.save((err, proyect)=>{
          if (err) {
            res.json({
              err: true,
              message: 'No se pudo guardar el proyecto',
              objs: err
            });
          }else{
            var user;
            if(req.user.local.name){
              user = req.user.local
            }else if(req.user.google.name) {
              user = req.user.google
            }else if(req.user.facebook.name) {
              user = req.user.facebook
            }
            Project.find({"product_owner_id" : req.user._id}, (err, objs)=>{
              if(err){
                res.json({
                  err: true,
                  message: 'No se pudieron extraer los proyectos',
                  objs: err
                });
              }else{
                res.json({
                  err: true,
                  message: 'No se puedieron extraer los proyectos',
                  objs: objs
                });
              }
            });
          }
        });

      }
    });
  }else{
    res.json({
      err: true,
      message:'Proyecto no existe',
      objs:{}
    });
  }
}

function dashboard_project(req, res, next){
  var user;
  if(req.user.local.name){
    user = req.user.local
  }else if(req.user.google.name) {
    user = req.user.google
  }else if(req.user.facebook.name) {
    user = req.user.facebook
  }
  Project.findOne({_id : req.params.id}, (err, project)=>{
    if(project == undefined){
      res.render('error', {
        title: "Error Inesperado"
      });
    }else{
      History.find({"project_id": project._id, "state": "Validado"}, function(err, histories_db){
        Sprint.find({"project_id": project._id}, function(err, sprints_db){
          if(err){
            res.render('error', {
              title: "Error"
            });
          }else{
            res.render('dashboard_project', {
              title: "Dashboard",
              userName: user,
              histories: histories_db,
              sprints : sprints_db,
              project: project
            });
          }
        });
      });
    }
  });
}

module.exports = {
  index,
  home,
  create,
  update,
  findByOne,
  remove,
  dashboard_project
}
