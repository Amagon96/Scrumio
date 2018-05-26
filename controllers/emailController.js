const nodemailer = require('nodemailer');
const express = require('express');
const Member = require('../models/member');
const mongoose = require('mongoose');
const User = require('../models/user');

// email sender function
exports.sendEmail = function(req, res){

  var email_user = req.body.email;
  const project_id = req.params.project_id;
  console.log(email_user);
  User.findOne({"local.email": email_user}, function(err, user){
    if(err){
      console.log(err);
    }else{
      if(user){
        createMember(user, email_user, project_id, 'local');
        res.redirect('/dashboard/'+project_id)
      }else{
        User.findOne({"google.email": email_user}, function(err, user){
          if(err){
            console.log(err);
          }else{
            if(user){
              createMember(user, email_user, project_id, 'google');
              res.redirect('/dashboard/'+project_id)
            }else{
              User.findOne({"facebook.email": email_user}, function(err, user){
                if(err){
                  console.log(err);
                }else{
                  if(user){
                    createMember(user, email_user, project_id, 'facebook');
                    res.redirect('/dashboard/'+project_id)
                  }else{
                    res.send(500, err.message);
                  }
                }
              });
            }
          }
        });
      }
    }
  });
};

function createMember(user, email_user, project_id, type){
  console.log(user.local.name);
  const user_id = user._id;
  var name = '';
  if(type == 'local'){
    name = user.local.name;
  }else if (type == 'google') {
    name = user.google.name;
  }else if (type == 'facebook') {
    name = user.facebook.name;
  }
  let member = new Member();

  member.email = email_user;
  member.name = name;
  member.user_id = user_id;
  member.project_id = project_id;

  member.save((err, obj) => {
    if (err) {
      response.json({
        error: true,
        message: 'Miembro no guardado',
        objs: err
      });
    } else {
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
          to: email_user,
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
          }
      });
    }
  });
}
