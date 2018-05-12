const express = require('express');
const Sprint = require('../models/sprint');
const Task = require('../models/task');
const mongoose = require('mongoose');

function showAll(request, response, next) {
    const page = request.params.page ? request.params.page : 1;

    Task.paginate({}, {
        page: page,
        limit: 4
    }, (err, objs) => {
        if (err) {
            response.json({
                error: true,
                message: 'no se pudo extraer las Tareas.',
                objs: {}
            });
        } else {
            response.json({
                error: false,
                message: 'Lista de Tareas',
                objs: objs
            });
        }
    });
}

function showSprintTasks(request, response, next) {
    let id = request.params.id;

    if(id){
        Task.find({ sprint: id }).exec((err, obj)=>{
            if(err){
                response.json({
                    error: true,
                    message : 'No se encontraron tareas',
                    objs: {}
                });
            }else{
                response.json({
                    error: false,
                    message : 'Tareas asignadas a este sprint:',
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

function findOne (request, response, next){

    let idTask = request.params.idTask;

    if(idTask){
        Task.find({ _id: idTask }).exec((err, obj)=>{
            if(err){
                response.json({
                    error: true,
                    message : 'No se encontraró la tarea',
                    objs: {}
                });
            }else{
                response.json({
                    error: false,
                    message : 'Tarea Buscada:',
                    objs: obj
                });
            }
        });
    }else{
        response.json({
            error: true,
            message : 'Tarea inexistente',
            objs: {}
        });
    }
}

function create(request, response, next){
    const newTask = new Task(request.body);

    let paramsSprint = request.params.id;

    var thisSprint = Sprint.find({_id :paramsSprint});

    if( ((isNaN(request.body.difficulty) === false) && (request.body.difficulty >= 1) && (request.body.difficulty <=5)) &&
        ((isNaN(request.body.hours)=== false) && (request.body.hours >= 1) && (request.body.hours <=8)) &&
        ((request.body.priority === 'Low') || (request.body.priority === 'Middle') || (request.body.priority === 'High')) ){
        newTask.sprint = paramsSprint;
        newTask.save((err, task)=>{
            if (err) {
                response.json({
                    err: true,
                    message: 'No se pudo guardar la Tarea',
                    objs : {}
                });
            }else{
                response.json({
                    err: false,
                    message: 'Tarea guardada',
                    objs : task
                });
            }
        });

    }else{
        response.json({
            message: 'Se ingresaron campos incorrectos. Horas debe ser un nuemero entre 1 y 8 incluyendolos, dificultad entre 1 y 5 incluyendolos y prioridad debe ser Low,Middle o High exactamente como se muestran'
        })
    }

}

function remove(request, response, next) {
    const idTask = request.params.idTask;
    if (idTask) {
        Task.remove({
            _id: idTask
        }, function(err) {
            if (err) {
                response.json({
                    error: true,
                    message: 'Tarea no Eliminada',
                    objs: {}
                });
            } else {
                response.json({
                    error: false,
                    message: 'Tarea Eliminada',
                    objs: {}
                });
            }
        });
    } else {
        response.json({
            error: true,
            message: 'Tarea no Existe',
            objs: {}
        });
    }
}

module.exports = {
    create,
    showAll,
    findOne,
    showSprintTasks,
    remove
}