$(document).ready(() =>{
  $("#endProject").click(function(){
    var id = $(this).attr('data-id');
    console.log(id);
    $.ajax({
      url: '/projects/'+id,
      type: "DELETE"
    }).done(function() {
      window.location = "/home_projects"
      })
      .fail(function(err) {

      })
      .always(function() {
      });
  });

  $("#closeSideModal").click(()=>{
    $("#mySidenav").width("0px");
    $("#mySidenav").css("overflow-y","hidden");
    $("#overlay").width("0");
    $("#overlay").css("opacity","0.9");
  });

  $(".openSideModal").click(()=>{
    $("#mySidenav").width("521px");
    $("#mySidenav").css("overflow-y","visible");
    $("#overlay").width("100%");
    $("#overlay").css("opacity","0.5");
  });
  $("#overlay").click(()=>{
    $("#mySidenav").width("0px");
    $("#mySidenav").css("overflow-y","hidden");
    $("#overlay").width("0");
    $("#overlay").css("opacity","0.9");
  });

  var dialog;

  $(".addTeam").click(function(){
    var members = $(this).data("members");
    var body_list = [];
    if (members.length == 0){
      body_list = `<img src="/../../images/abrazame.png" class="img-fluid"/>
        <p>Oh oh! Parece que aún no tienes miembros para armar tu equipo! Agrega unos desde la pestaña de miembros.</p>`;
    }else{
      members.forEach(function(item, index){
        console.log(item);
        body_list += `
        <div class="form-row">
          <div class='col-md-8'>
            <label>${item.name}</label>
          </div>
          <div class='col-md-4'>
          <label class="container-check">
            <input type="checkbox" name="member" value='{"member_id": "${item._id}", "email": "${item.email}", "name": "${item.name}"}'>
            <span class="checkmark"></span>
          </label>
          </div>
        </div>`
      });
    }
    body = `<div id="modalAddTeam">
              <h4>Crear Nuevo Equipo</h4>
              <form action='/teams/${members[0].project_id}' method='POST'>
              <div class="form-group">
                <label>Nombre</label>
                <input name='name_project' type="text" placeholder="Escribe el nombre de tu proyecto" class="form-control"/>
              </div>
              <h5>Seleccionar Miembros</h5>
              <div class="choose-team">
                ${body_list}
              </div>
              <div class="float-right">
                <button class="closeModal">Cancelar</button>
                <button type="submit">Crear</button>
              </div>
              </form>
            </div>`;

    dialog = bootbox.dialog({
      message: body,
      closeButton: true
    });
  });

  $(".addMember").click(function(){
      var email = $(this).attr("data-email");
      var project_id = $(this).attr("data-project_id");
      console.log(email);
    body = `
    <div id="modalAddMembers">
      <h4>Agregar Miembro</h4>
      <p>Agrega los correos de tus miembros. Mandaremos
      una solicitud por correo para que se unan a tu equipo de trabajo.</p>
      <form method="POST" action="/email/${email}/project/${project_id}">
        <div class="form-row">
          <div class="col-md-8">
            <label>Email</label>
            <input id="addMember" class="form-control" name="email" type="text" placeholder="ejemplo@gmail.com" />
          </div>
          <div class='col-md-4 pl-5 pt-3'>
            <button id="enviarMembers" type="submit">Enviar</button>
          </div>
        </div>
      </form>
      <div class="float-right">
        <button class="closeModal">Cancelar</button>
      </div>
    </div>
    `;
    dialog = bootbox.dialog({
      message: body,
      closeButton: true
    })
  });

  $("#addAbility").click(function(){
    project_id = $(this).attr("data-id");
    var route = '';
    if($(this).attr("data-route")){
      route = '/dashboard_project';
    }
    body = `<div id="modalAddAbility">
              <h4>Crear Nueva Habilidad</h4>
              <form method='POST' action='/abilities/${project_id + route}'>
                <div class="form-group">
                  <label>Nombre</label>
                  <input name="name" id="createTeam" type="text" placeholder="Escribe el nombre de tu Habilidad" class="form-control"/>
                </div>
                <div class='form-group'>
                  <select name="type" class="custom-select">
                    <option value='Master'>Master</option>
                    <option value="Senior">Senior</option>
                    <option value="Junior">Junior</option>
                    <option value="Amateur" selected>Amateur</option>
                  </select>
                </div>
                <div class="float-right">
                  <button type="button" class="closeModal">Cancelar</button>
                  <button type="submit" class='btn btnGuardar'>Guardar</button>
                </div>
              </form>
            </div>`;

    dialog = bootbox.dialog({
      message: body,
      closeButton: true
    });
  });
  var parent;
  $(document).on("click", ".deleteAbility", function(){
    parent = $(this).parent().parent();
    body = `<div id="modalDeleteTeam">
              <h4>Eliminar Habilidad</h4>
              <div class="float-right">
                <button type="button" class="closeModal">Cancelar</button>
                <button data-id=${$(parent).attr('id')} type="submit" class='btn btn-danger' id='removeAbility'>Eliminar</button>
              </div>
            </div>`;

    dialog = bootbox.dialog({
      message: body,
      closeButton: true
    });
  });

  $(document).on("click", ".closeModal", ()=>{
    dialog.modal("hide");
  });

  $(document).on("click", "#removeAbility", function(){

    var id = $(this).attr('data-id');
    console.log(id);
    $.ajax({
      url: '/abilities/'+id,
      type: "DELETE"
    }).done(function() {
        let length = $(parent).siblings().length;
        dialog.modal("hide");
        $(parent).remove();
        if(length == 0){
          $("table").hide();
          $(".nonAbility").removeClass("d-none");
        }
      })
      .fail(function() {
        alert( "error" );
      })
      .always(function() {
      });

  });

  $(".update").click(function(){

    $.ajax({
      url: "/users/"+$(this).parent().parent().attr("data-id"),
      type: "PUT",
      data:{
        name: $("#name").val(),
        email: $("#email").val(),
        birthday: $("#birthday").val()
      }
    }).done(function() {
        $.toast("Usuario Actualizado :)");
      })
      .fail(function(err) {
        $.toast("Usuario no Actualizado :/");
      })
      .always(function() {
      });
  });

  $(document).on("click", ".editAbility", function(){
    parent = $(this).parent().parent();
    var ability = $(this).parent().siblings(".abilityName").html();
    var type = $(this).parent().siblings(".abilityType").html();
    var id = $(this).parent().parent().attr("id");
    body = `<div id="modalAddAbility">
              <h4>Crear Nueva Habilidad</h4>
                <div class="form-group">
                  <label>Nombre</label>
                  <input name="name" id="createTeam" type="text" placeholder="Escribe el nombre de tu Habilidad" value="${ability}" class="form-control"/>
                </div>
                <div class='form-group'>
                  <select id="selectType" name="type" class="custom-select">
                    <option value='Master'>Master</option>
                    <option value="Senior">Senior</option>
                    <option value="Junior">Junior</option>
                    <option value="Amateur">Amateur</option>
                  </select>
                </div>
                <div class="float-right">
                  <button type="button" class="closeModal">Cancelar</button>
                  <button data-id=${id} type="submit" class='btn btnUpdate'>Guardar</button>
                </div>
            </div>`;

    dialog = bootbox.dialog({
      message: body,
      closeButton: true
    });
    $('select[name="type"] option[value='+type+']').prop('selected', true);

  });

  $(document).on("click", ".btnUpdate", function(){
    console.log($("#selectType").val());
    $.ajax({
      url: "/abilities/"+$(this).attr("data-id"),
      type: "PUT",
      data:{
        name: $("input[name='name']").val(),
        type: $("#selectType").val()
      }
    }).done(function(obj) {
        $(parent).children(".abilityName").html(obj.objs.name);
        $(parent).children(".abilityType").html(obj.objs.type);
        $.toast("Habilidad Actualizada :)");
        dialog.modal("hide");
      })
      .fail(function(err) {
        $.toast("Habilidad no Actualizada :/");
      })
      .always(function() {
      });
  });

  $('#proyectos').fullpage({
        anchors:['firstPage', 'secondPage', 'thirdPage'],
        paddingTop: '0px',
        scrollOverflow: true,
        afterLoad: function(anchorLink, index){
          $("div.fp-controlArrow").hide();
          $("i.fa-long-arrow-right").addClass("fp-controlArrow fp-next");
          $("i.fa-long-arrow-left.go-back").addClass("fp-controlArrow fp-prev");
        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){

        }
	});

  $(".modalProyecto").click(function(){
    body = `<div id="modalAddAbility">
              <h4>Crear Nuevo Proyecto</h4>
              <form method='POST' action='/projects'>
                <div class="form-group">
                  <label>Nombre</label>
                  <input name="name" id="nameProyect" type="text" placeholder="Escribe el nombre de tu proyecto" class="form-control"/>
                </div>
                <div class='form-row'>
                  <div class="form-group col-6-md mr-auto">
                    <label>Fecha de Solicitud</label>
                    <input name="date_request" id="dateRequest" type="date" placeholder="Seleccione Fecha" class="form-control pr-5"/>
                  </div>
                  <div class="form-group col-6-md">
                    <label>Fecha de Arranque</label>
                    <input name="date_deployed" id="dateDeployed" type="date" placeholder="Seleccione Fecha" class="form-control pr-5"/>
                  </div>
                </div>
                <div class="form-group">
                  <label>Product Owner</label>
                  <input name="product_owner" id="productOwner" type="text" placeholder="Escribe el nombre de quien solicito el proyecto" class="form-control"/>
                </div>
                <div class="form-group">
                  <label>Descripción</label>
                  <textarea name="description" id="description" type="text" placeholder="Escribe el nombre de quien solicito el proyecto" class="form-control"></textarea>
                </div>
                <div class="float-right">
                  <button type="button" class="closeModal">Cancelar</button>
                  <button id='saveProyect' type="submit" class='btn btnGuardar'>Guardar</button>
                </div>
              </form>
            </div>`;

    dialog = bootbox.dialog({
      message: body,
      closeButton: true
    });
  });

  dragula([document.getElementById("productBacklog"), document.getElementById("releaseBacklog")],{
    revertOnSpill: true
  }).on('drop', function(el, target, source, sibling){
    const backlog = $(target).attr("id");
    const history_id = $(el).attr("data-id");
    if(backlog == 'releaseBacklog'){
      $(el).find(".status").text("Validado");
      $(el).find(".status").parent().css("background-color", "#449c48");
      var copy_el = el.cloneNode(true);
      $(copy_el).removeClass("gu-transit");
      $.ajax({
        url: "/histories/update_state/"+history_id,
        type: "PUT",
        data:{
          state: 'Validado'
        }
      }).done(function() {
          $.toast("Historia Actualizada :)");
          $("#createReleaseBacklog").append(copy_el);
        })
        .fail(function(err) {
          console.log(err);
          $.toast("Historia no Actualizada :/");
        })
        .always(function() {
        });
    }else if (backlog == "productBacklog"){
      $(el).find(".status").text("En Validación");
      $(el).find(".status").parent().css("background-color", "#f5a623");
      $.ajax({
        url: "/histories/update_state/"+history_id,
        type: "PUT",
        data:{
          state: 'En Validación'
        }
      }).done(function() {
          $.toast("Historia Actualizada :)");
        })
        .fail(function(err) {
          $.toast("Historia no Actualizada :/");
        })
        .always(function() {
        });
      $("#createReleaseBacklog div[data-id='"+$(el).attr("data-id")+"']").remove();
    }
    if($(target).children().length == 1){
      $(target).siblings().remove();
    }
    if($(source).children().length == 0){
      $(source).parent().prepend(`<div class="pt-5 empty_state"><img src="../../images/reader.png" class="img-fluid"/>
                          <p>Para comenzar a organizar tu proyecto, empecemos a crear las <a href="#" class="openSideModal">tareas</a></p>
                        </div>`);
    }
  });


  $('#slides-release').slick({
     slidesToShow: 1,
  });

  $(".addSprint").click(function(){
    var project_id = $(this).attr("data-id");
    var route = '';
    if($(this).attr("data-route")){
      route = '/dashboard_project';
    }
    body = `<div id="modalAddSprint">
              <form action="/sprints/${project_id + route}" method='POST'>
                <div class="form-group">
                  <label>Numero de Spring</label>
                  <input name="num_spring" id="numSpring" type="number" placeholder="Escoge el numero de tu Spring" class="form-control"/>
                </div>
                <div class="form-group">
                  <label>Fecha de Inicio</label>
                  <input name="start_date" id="startDate" type="date" placeholder="Selecciona la fecha de Inicio" class="form-control"/>
                </div>
                <div class="form-group">
                  <label>Fecha de Entrega</label>
                  <input name="end_date" id="endDate" type="date" placeholder="Selecciona la fecha de Entrega" class="form-control"/>
                </div>
                <div class="float-right">
                  <button type="button" class="closeModal">Cancelar</button>
                  <button id='saveProyect' type="submit" class='btn btnGuardar'>Guardar</button>
                </div>
              </form>
            </div>`;

    dialog = bootbox.dialog({
      message: body,
      closeButton: true
    });
  });

  var array = [];
  var slides =  $("#slides-release").find("div.release");
  var drops = [];
  drops.push(document.getElementById('createReleaseBacklog'));
  slides.each(function(index, item){
    var id = $(item).attr("id");
    if(id != '')
      array.push(id);
  });
  for (var i = 0; i < array.length; i++) {
    drops.push(document.getElementById(array[i]));
  }
  dragula(drops,{
    revertOnSpill: true
  }).on('drop', function(el, target, source, sibling){
    var sprint_id = $(target).attr("data-sprint_id");
    var history_id = $(el).attr("data-id");
    if($(target).attr('class') == "backlog p-1 release"){
      $.ajax({
        url: "/histories/"+history_id+"/sprints/"+sprint_id,
        type: "PUT"
      }).done(function() {
          $.toast("Historia Actualizada :)");
        })
        .fail(function(err) {
          $.toast("Historia no Actualizada :/");
        })
        .always(function() {
        });

    }else{
      $.ajax({
        url: "/histories/"+history_id+"/sprints/",
        type: "DELETE"
      }).done(function() {
          $.toast("Historia Actualizada :)");
        })
        .fail(function(err) {
          $.toast("Historia no Actualizada :/");
        })
        .always(function() {
        });
    }

  });

  $(document).on("click", ".detail-history", function(){
    var obj =  JSON.parse($(this).attr("data-obj"));
    var time = obj.time_did == undefined ? "" : obj.time_did;
    var route = '';
    if($(this).attr("data-route")){
      route = '/dashboard_project';
    }
    body = `<div id="modalDetailHistory">
              <h1>Detalle de Tarea</h1>
              <div class='row pt-3'>
                <h3>Narrativa de la Historia</h3>
              </div>
              <div class='row'>
                <div class="col-md-4">
                  <h5>Narrativa de la historia</h5>
                  <p>${obj.narrative}</p>
                </div>
                <div class="col-md-4">
                  <h5>Tamaño</h5>
                  <p>${obj.size}</p>
                </div>
                <div class="col-md-4">
                  <h5>Prioridad</h5>
                  <p>${obj.priority}</p>
                </div>
              </div>
              <div class='row'>
                <div class="col-md-6">
                  <h5>Como</h5>
                  <p>${obj.how}</p>
                </div>
                <div class="col-md-6">
                  <h5>Quiero</h5>
                  <p>${obj.what_i_want}</p>
                </div>
              </div>
              <div class='row'>
                <div class="col-md-12">
                  <h5>De tal Manera</h5>
                  <p>${obj.so_that}</p>
                </div>
              </div>
              <div class='row'>
                <h3>Criterios de Aceptación</h3>
              </div>
              <div class='row'>
                <div class="col-md-12">
                  <h5>Criterio de Aceptación</h5>
                  <p>${obj.criteria}</p>
                </div>
              </div>
              <div class='row'>
                <div class="col-md-6">
                  <h5>Dado</h5>
                  <p>${obj.give_it}</p>
                </div>
                <div class="col-md-6">
                  <h5>Cuando</h5>
                  <p>${obj.when}</p>
                </div>
              </div>
              <div class='row'>
                <div class="col-md-12">
                  <h5>Entonces</h5>
                  <p>${obj.since}</p>
                </div>
              </div>
              <form action="/histories/update_time/${obj._id}/${obj.project_id + route}" method='POST'>
                <div class='row'>
                  <h2>Horas Estimadas</h2>
                </div>
                <div class="form-group">
                  <input name='time_estimate' id="createTeam" type="number" placeholder="Estimacion de Horas" class="form-control" value='${obj.time_estimate}'/>
                </div>
                <div class='row'>
                  <h2>Horas Realizadas</h2>
                </div>
                <div class="form-group">
                  <input name='time_did' id="createTeam" type="number" placeholder="Horas hechas" class="form-control" value='${time.time}'/>
                </div>
                <div class="form-group">
                  <input name='time_did_date' id="createTeam" type="date" placeholder="Fecha de entrega" class="form-control" value='${time.date}'/>
                </div>
                <div class="float-right mt-3">
                  <button type="button" class="closeModal">Cancelar</button>
                  <button id='updateHistory' type="submit" class='btn btnGuardar'>Guardar</button>
                </div>
              </form>
            </div>`;

    dialog = bootbox.dialog({
      message: body,
      closeButton: true,
      size: "large"
    });
  });

  $(document).on("click", ".delete-member", function(){
    var id = $(this).attr('data-id');
    var $tr = $(this).parent().parent();
    console.log(id);
    $.ajax({
      url: '/members/'+id,
      type: "DELETE"
    }).done(function() {
        $.toast("Miembro Eliminado :)");
        if($tr.siblings().length == 0){
          $(".table-members").remove();
          $("#miembros .container-1").append(`<img src="../../images/abrazame.png" class="img-fluid"/>
<p>Oh no! Parece que aún no tienes miembros! Registra algunos.`);
        }
        $tr.remove();
      })
      .fail(function(err) {
        console.log(err);
        $.toast("Membro no eliminado :/");
      })
      .always(function() {
      });

  });

  $(document).on("click", ".delete-archive", function(){
    var id = $(this).attr('data-id');
    var $tr = $(this).parent().parent();
    console.log(id);
    $.ajax({
      url: '/archives/'+id,
      type: "DELETE"
    }).done(function() {
        $.toast("Archivo Eliminado :)");
        console.log($tr.siblings());
        if($tr.siblings().length == 0){
          $(".table-archives").remove();
          $("#archivero .container-1").append(`
            <img src="../../images/panzon.png"/>
            <p>Parece que no tienes ningún proyecto archivado, pero no te asustes. Una vez que terminas tus proyectos podrás verlos aqui.</p>
            `);
        }
        $tr.remove();
      })
      .fail(function(err) {
        console.log(err);
        $.toast("Membro no eliminado :/");
      })
      .always(function() {
      });

  });

  $(document).on("click", ".delete-team", function(){
    var id = $(this).attr('data-id');
    var $tr = $(this).parent().parent();
    console.log(id);
    $.ajax({
      url: '/teams/'+id,
      type: "DELETE"
    }).done(function() {
        $.toast("Equipo Eliminado :)");
        if($tr.siblings().length == 0){
          $(".table-teams").remove();
          $("#equipos .container-1").append(`
            <img src="../../images/snoppy.png" class="img-fluid"/>
            <p>Para poder agregar tus equipos primero necesitamos armarlos. Registra tus equipos.</p>
            `);
        }
        $tr.remove();
      })
      .fail(function(err) {
        console.log(err);
        $.toast("Miembro no eliminado :/");
      })
      .always(function() {
      });

  });

});
