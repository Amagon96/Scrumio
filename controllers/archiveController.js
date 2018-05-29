const express = require('express');
const Archive = require('../models/archive');
const mongoose = require('mongoose');

function create(request, response, next) {

}


function remove(request, response, next) {
  const id = request.params.id;
  console.log(id);
  Archive.remove({
    _id: id
  }, function(err, obj) {
    if (err) {
      res.render("error", {title: "Error"});
    } else {
      response.json({
        error: false,
        message: 'Archivo Eliminado.',
        objs: obj
      });
    }
  });
}


module.exports = {
  create,
  remove
}
