const express = require('express');
const Sprint = require('../models/sprint');

const mongoose = require('mongoose');

function showAll(request, response, next) {
    const page = request.params.page ? request.params.page : 1;
    Sprint.paginate({}, {
        page: page,
        limit: 4
    }, (err, objs) => {
        if (err) {
            response.json({
                error: true,
                message: 'no se pudo extraer los sprints.',
                objs: {}
            });
        } else {
            response.json({
                error: false,
                message: 'Lista de Sprints',
                objs: objs
            });
        }
    });
}

function findOne (request, response, next){
    let id = request.params.id;

    if(id){
        Sprint.find({ _id: id }).exec((err, obj)=>{
            if(err){
                response.json({
                    error: true,
                    message : 'No se encontraró el sprint',
                    objs: {}
                });
            }else{
                response.json({
                    error: false,
                    message : 'Sprint Buscado:',
                    objs: obj
                });
            }
        });
    }else{
        response.json({
            error: true,
            message : 'Sprint inexistente',
            objs: {}
        });
    }
}

function create(request, response, next){
    const newSprint = new Sprint(request.body);

    console.log('New Sprint ',newSprint);
    if(request.body.start_date == ''){
        newSprint.start_date = Date.now();
    }
    newSprint.daysLeft = daysLeft(newSprint.start_date, newSprint.end_date)

    newSprint.save((err, sprint)=>{
        if (err) {
            response.json({
                err: true,
                message: 'No se pudo guardar el Sprint',
                objs: err
            });
        }else{
            response.json({
                err: false,
                message:'Sprint Guardado',
                objs: sprint
            });
        }
    });
}

function update(request, response, next){

    let id = request.params.id;

    const dataToUpdate = new Sprint(request.body);

    console.log(dataToUpdate);
    if(dataToUpdate.goals.length <= 0){
        console.log('viene vacio')
    }

    if((sameDay(dataToUpdate)=== false) && (dataToUpdate.start_date !== '')){
        if((dataToUpdate.end_date != null) && (dataToUpdate.end_date !== '')){
            //Si cruza este if indicará que el request trae para editar los campos de start date,end date y goals
            if(dataToUpdate.goals.length >= 1){
                Sprint.findOneAndUpdate({ _id: id }, { $set: { start_date: dataToUpdate.start_date, end_date : dataToUpdate.end_date, goals : dataToUpdate.goals}}, (err, sprint)=>{
                    if (err) {
                        response.json({
                            err: true,
                            message: 'No se pudo editar el Sprint',
                            objs: err
                        });
                    }else{
                        response.json({
                            err: false,
                            message:'Sprint si se edito con el escenario 1 opcion 4',
                            objs: sprint
                        });
                    }
                });
            }//Si cruza este else indicará que el request trae para editar los campos de start date y end date
            else{
                Sprint.findOneAndUpdate({ _id: id }, { $set: { start_date: dataToUpdate.start_date, end_date : dataToUpdate.end_date}}, (err, sprint)=>{
                    if (err) {
                        response.json({
                            err: true,
                            message: 'No se pudo editar el Sprint',
                            objs: err
                        });
                    }else{
                        response.json({
                            err: false,
                            message:'Sprint si se edito con el escenario uno opcion 2',
                            objs: sprint
                        });
                    }
                });
            }
        }else{
            //Si cruza este if indicará que el request trae para editar los campos de start date y goals
            if(dataToUpdate.goals.length >= 1){
                Sprint.findOneAndUpdate({ _id: id }, { $set: { start_date: dataToUpdate.start_date, goals : dataToUpdate.goals}}, (err, sprint)=>{
                    if (err) {
                        response.json({
                            err: true,
                            message: 'No se pudo editar el Sprint',
                            objs: err
                        });
                    }else{
                        response.json({
                            err: false,
                            message:'Sprint si se edito con el escenario 1 opcion 3',
                            objs: sprint
                        });
                    }
                });
            }//Si cruza este else indicará que el request trae para editar los campos de start date
            else{
                Sprint.findOneAndUpdate({ _id: id }, { $set: { start_date: dataToUpdate.start_date}}, (err, sprint)=>{
                    if (err) {
                        response.json({
                            err: true,
                            message: 'No se pudo editar el Sprint',
                            objs: err
                        });
                    }else{
                        response.json({
                            err: false,
                            message:'Sprint si se edito con el escenario uno opcion 1',
                            objs: sprint
                        });
                    }
                });
            }
        }
    }else if((dataToUpdate.end_date != null) && (dataToUpdate.end_date !== '')){
        //Si cruza este if indicará que el request trae para editar los campos de end date y goals
        if(dataToUpdate.goals.length >= 1){
            Sprint.findOneAndUpdate({ _id: id }, { $set: { end_date : dataToUpdate.end_date, goals : dataToUpdate.goals}}, (err, sprint)=>{
                if (err) {
                    response.json({
                        err: true,
                        message: 'No se pudo editar el Sprint',
                        objs: err
                    });
                }else{
                    response.json({
                        err: false,
                        message:'Sprint si se edito con el escenario 2 opcion 2',
                        objs: sprint
                    });
                }
            });
        }//Si cruza este else indicará que el request trae para editar los campos end date
        else{
            Sprint.findOneAndUpdate({ _id: id }, { $set: { end_date : dataToUpdate.end_date}}, (err, sprint)=>{
                if (err) {
                    response.json({
                        err: true,
                        message: 'No se pudo editar el Sprint',
                        objs: err
                    });
                }else{
                    response.json({
                        err: false,
                        message:'Sprint si se edito con el escenario 2 opcion 1',
                        objs: sprint
                    });
                }
            });
        }
    }else{
        //Si cruza este if indicará que el request trae para editar los campos goals
        if(dataToUpdate.goals.length >= 1){
            Sprint.findOneAndUpdate({ _id: id }, { $set: { end_date : dataToUpdate.end_date, goals : dataToUpdate.goals}}, (err, sprint)=>{
                if (err) {
                    response.json({
                        err: true,
                        message: 'No se pudo editar el Sprint',
                        objs: err
                    });
                }else{
                    response.json({
                        err: false,
                        message:'Sprint si se edito con el escenario 2 opcion 3',
                        objs: sprint
                    });
                }
            });
        }//Si cruza este else indicará que no trae nada para editar
        else{
            response.json({
                message: 'No se pudo editar el Sprint pues no se añadieron campos a la peticion',
            });
        }
    }
}

function remove(request, response, next) {
  const id = request.params.id;
  if (id) {
    Sprint.remove({
      _id: id
    }, function(err) {
      if (err) {
        response.json({
          error: true,
          message: 'Sprint no Eliminado',
          objs: {}
        });
      } else {
        response.json({
          error: false,
          message: 'Sprint Eliminado',
          objs: {}
        });
      }
    });
  } else {
    response.json({
      error: true,
      message: 'Sprint no Existe',
      objs: {}
    });
  }
}



function sameDay(requestStartDay){

    var today = new Date(Date.now());

    var utcRequest = Date.UTC(requestStartDay.start_date.getFullYear(), requestStartDay.start_date.getMonth(), requestStartDay.start_date.getDate());
    var utcHoy = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

    if(utcRequest == utcHoy){
        return true;
    }else{
        return false;
    }
}


function daysLeft(start, end) {
    const _ms_per_day = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    var utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

    return Math.floor((utc2 - utc1) / _ms_per_day);
}

module.exports = {
    create,
    showAll,
    findOne,
    update,
    remove
}