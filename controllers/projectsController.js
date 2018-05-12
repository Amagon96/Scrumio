const express = require('express');
const Project = require('../models/project');
const mongoose = require('mongoose');

function index(req, res, next){
  const page = req.params.page ? req.params.page : 1;
  // Project.find({"product_owner_id" : req.user._id}, (err, objs)=>{
  //
  // });

  Project.paginate({"product_owner_id" : req.user._id}, {
    page: page,
    limit:3
  }, (err, objs)=>{
    if(err){
      res.json({
        err: true,
        message: 'No se puedieron extraer los proyectos',
        objs: {}
      });
    }else{
      res.json({
        err: false,
        message:'Lista de proyectos',
        objs: objs
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

  proyect.save((err, proyect)=>{
    if (err) {
      res.json({
        err: true,
        message: 'No se pudo guardar el proyecto',
        objs: err
      });
    }else{
      res.json({
        err: false,
        message:'Proyecto Guardado',
        objs: proyect
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

function show(req, res, next){
  const id = req.params.id;
  Project.findOne({
    _id:id
  }, (err, obj)=>{
    res.json({
      err: true,
      message : 'Proyecto',
      obj: obj
    });
  });
}

function remove(req, res, next){
  const id = req.params.id;
  if(id){
    Project.remove({_id:id}, function(err){
      if (err) {
        res.json({
          err: true,
          message: 'No se pudo eliminar proyecto',
          objs: {}
        });
      }else{
        res.json({
          err: false,
          message:'Proyecto eliminado',
          objs: {}
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


module.exports = {
  index,
  create,
  update,
  show,
  remove
}
