const nodemailer = require('nodemailer');
const express = require('express');
const Member = require('../models/member');
const mongoose = require('mongoose');
// email sender function
exports.sendEmail = function(req, res){

  var email = req.body.email;

  // Definimos el transporter
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'scrumio.s.invitation@gmail.com',
      pass: 'Scrumio123123'
    }
  });
  // Definimos el email
  var mailOptions = {
      from: 'Remitente',
      to: email,
      subject: 'Invitación a Scrumio',
      text: 'Se te ha invitado a Scrumio, crea tu cuenta en https://scrumio.herokuapp.com/'
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function(error, info){
      if (error){
          console.log(error);
          res.send(500, err.message);
      } else {
          console.log("Email sent");
          res.status(200).jsonp(req.body);
      }
  });
};
