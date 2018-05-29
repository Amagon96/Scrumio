const express = require('express');
const Team = require('../models/team');
const mongoose = require('mongoose');

function create(request, response, next) {
  const project_id = request.params.project_id;
  const name = request.body.name_project;
  var members = [];
  if(typeof request.body.member === 'string'){
    members.push(JSON.parse(request.body.member));
  }else{
    request.body.member.forEach(function(item, index){
      members.push(JSON.parse(item))
    });
  }
  let team = new Team();
  team.members = members;
  team.project_id = project_id;
  team.name = name;

  team.save((err, obj) => {
    if (err) {
      res.render("error", {title: "Error"});
    } else {
      response.redirect('/dashboard/'+project_id);
    }
  });
}


function remove(request, response, next) {
  const id = request.params.id;
  console.log(id);
  Team.remove({
    _id: id
  }, function(err, obj) {
    if (err) {
      res.render("error", {title: "Error"});
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
