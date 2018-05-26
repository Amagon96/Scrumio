const express = require('express');
const Member = require('../models/member');
const mongoose = require('mongoose');

function create(request, response, next) {
  const user_id = request.body.user_id;
  const proyect_id = request.body.proyect_id;
  const name = request.body.name;
  const email = request.body.email;

  let member = new Member();
  member.user_id = user_id;
  member.proyect_id = proyect_id;
  member.name = name;
  member.email = email;

  member.save((err, obj) => {
    if (err) {
      response.json({
        error: true,
        message: 'Miembro no guardado',
        objs: err
      });
    } else {
      response.json({
        error: true,
        message: 'Miembro Guardado',
        objs: obj
      });
    }
  });
}


function remove(request, response, next) {
  const id = request.params.id;
  console.log(id);
  Member.remove({
    _id: id
  }, function(err, obj) {
    if (err) {
      console.log(err);
      response.json({
        error: true,
        message: 'Miembro no Eliminado.',
        objs: err
      });
    } else {
      response.json({
        error: false,
        message: 'Miembro Eliminado.',
        objs: obj
      });
    }
  });
}


module.exports = {
  create,
  remove
}
