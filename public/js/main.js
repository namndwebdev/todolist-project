$.ajax({
    url: '/api/task',
    type: 'GET'
})
.then(response=>{
    var data = response.data

    var arrTodo = data.filter(function(item){
        return item.status == 'todo'
    })

    var arrDoing = data.filter(function(item){
        return item.status == 'doing'
    })

    var arrDone = data.filter(function(item){
        return item.status == 'done'
    })

    loadData($('#todo'), arrTodo)
    loadData($('#doing'), arrDoing)
    loadData($('#done'), arrDone)
    pretty()


    $( ".column" ).droppable({
        drop: function( event, ui ) {
            var idTask = ui.draggable.attr('id')
            var newStatus = $(this).attr('id')

            $.ajax({
                url: '/api/task/' + idTask,
                type: 'PUT',
                data: {
                    status: newStatus
                }
            })
            .then(data=>{
                alert('ban da cap nhat thanh cong')
            })
        }
    });

})
.catch(err=>{
    console.log(err);
})


function loadData(container, data){
    for (let i = 0; i < data.length; i++) {
        const task = data[i];
        
        container.append(`
        <div class="portlet" id="${task._id}">
        <div class="portlet-header">${task.title}</div>
        <div class="portlet-content">${task.des}</div>
        </div>
        `)
    }
}

function pretty(){
    $( ".column" ).sortable({
        connectWith: ".column",
        handle: ".portlet-header",
        cancel: ".portlet-toggle",
        placeholder: "portlet-placeholder ui-corner-all"
      });
   
      $( ".portlet" )
        .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
        .find( ".portlet-header" )
          .addClass( "ui-widget-header ui-corner-all" )
          .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
   
      $( ".portlet-toggle" ).on( "click", function() {
        var icon = $( this );
        icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
        icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
      });
}