const express = require('express');
const mongoose = require('mongoose');

function index(request, response, next) {
  response.render("error",{
    title: "Error"
  });
}

function create(request, response, next) {


}

function update(request, response, next) {

}

module.exports = {
  index,
  create,
  update,
  remove
}
