const nodemailer = require('nodemailer');
const express = require('express');
const Member = require('../models/member');
const mongoose = require('mongoose');
const User = require('../models/user');

// email sender function
exports.sendEmail = function(req, res){

  var email_user = req.body.email;
  const project_id = req.params.project_id;
  User.findOne({"local.email": email_user}, function(err, user){
    if(err){
      res.render("error", {title: "Error"});
    }else{
      if(user){
        createMember(user, email_user, project_id, 'local');
        res.redirect('/dashboard/'+project_id)
      }else{
        User.findOne({"google.email": email_user}, function(err, user){
          if(err){
            res.render("error", {title: "Error"});
          }else{
            if(user){
              createMember(user, email_user, project_id, 'google');
              res.redirect('/dashboard/'+project_id)
            }else{
              User.findOne({"facebook.email": email_user}, function(err, user){
                if(err){
                  res.render("error", {title: "Error"});
                }else{
                  if(user){
                    createMember(user, email_user, project_id, 'facebook');
                    res.redirect('/dashboard/'+project_id)
                  }else{
                    res.render("error", {title: "Error"});
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
  const user_id = user._id;
  console.log(user);
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
          text: "Se te ha invitado a Scrumio, crea tu cuenta en ",
          html: `
          <!DOCTYPE html>
          <html>
            <body>
              <header style="width: 100%;background-color: #f5a623;">
                <a style="  width: 138px; height: 45px; font-family: Tauri; font-size: 36px; font-weight: normal; font-style: normal; font-stretch: normal; line-height: normal; letter-spacing: normal; text-align: left; color: #ffffff;">Scrumio</a>
                <img src='http://i66.tinypic.com/10xeequ.png'/>
              </header>
               <h1>Se le a inivitado a ser parte de un proyecto.</h1>
               <h3>Accede a tu cuenta en <a href='https://scrumio.herokuapp.com' target='_blank'>Srumio</a> para poder participar en el proyecto.</h3>
            </body>
          </html>
          `
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
