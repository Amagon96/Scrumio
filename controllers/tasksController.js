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

function findOne (request, response, next){
    let id = request.params.id;

    if(id){
        Task.find({ _id: id }).exec((err, obj)=>{
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

    if( ((isNaN(request.body.difficulty) === false) && (request.body.difficulty >= 1) && (request.body.difficulty <=5)) &&
        ((isNaN(request.body.hours)=== false) && (request.body.hours >= 1) && (request.body.hours <=8)) &&
        ((request.body.priority === 'Low') || (request.body.priority === 'Middle') || (request.body.priority === 'High')) ){
        newTask.save((err, task)=>{
            if (err) {
                response.json({
                    err: true,
                    message: 'No se pudo guardar la Tarea',
                    objs: err
                });
            }else{
                response.json({
                    err: false,
                    message:'Tarea Guardada',
                    objs: task
                });
            }
        });
    }else{
        response.json({
            message: 'Se ingresaron campos incorrectos. Horas debe ser un nuemero entre 1 y 8 incluyendolos, dificultad entre 1 y 5 incluyendolos y prioridad debe ser Low,Middle o High exactamente como se muestran'
        })
    }

}
function update(request, response, next){

    let id = request.params.id;

    const dataToUpdate = new Task(request.body);

    /*console.log(dataToUpdate);
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
    }*/
}

module.exports = {
    create,
    showAll,
    findOne//,
    //update,
    //remove
}