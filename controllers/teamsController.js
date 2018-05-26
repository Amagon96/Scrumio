const express = require('express');
const Team = require('../models/team');
const mongoose = require('mongoose');

function create(request, response, next) {
  const project_id = request.params.project_id;
  const name = request.body.name;
  var members = [];
  request.body.member.forEach(function(item, index){
    members.push(JSON.parse(item))
  });
  console.log(members);
  let team = new Team();
  team.members = members;
  team.project_id = project_id;
  team.name = name;

  team.save((err, obj) => {
    if (err) {
      response.json({
        error: true,
        message: 'Miembro no guardado',
        objs: err
      });
    } else {
      console.log(obj);
      response.redirect('/dashboard/'+project_id);
    }
  });
}


function remove(request, response, next) {

}


module.exports = {
  create,
  remove
}
