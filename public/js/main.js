function loadAllData(){
    $.ajax({
        url: '/api/tasks',
        type: 'GET'
    })
    .then(data=>{
        $('#content').html('')
    
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            
            var li = $(`<li class="list-group-item" id=${element._id}>
            
            ${element.title} - <b>${element.deadline}</b>
            <button type='button' class="deleteBtn btn btn-primary">Delete</button>
            </li>`)
            $('#content').append(li)
        }
        
        $('.deleteBtn').click(function(){
            deleteById($(this).parent().attr('id'))
        })

    })
    .catch(err=>{
        console.log('loi');
    })
    
}

loadAllData()

$('#addBtn').click(()=>{
    var title = $('#title').val()
    var deadline = $('#deadline').val()

    $.ajax({
        url: '/api/tasks',
        type:'POST',
        data: {
            title: title,
            deadline: deadline
        }
    })
    .then(data=>{
        alert('them thanh cong')
        var li = $(`<li class="list-group-item" id=${data._id}>${data.title} - <b>${data.deadline}</b> 
        
            <button type='button' class="deleteBtn btn btn-primary">Delete</button>
        
        </li>`)
        $('#content').append(li)

        $('.deleteBtn').click(function(){
            deleteById($(this).parent().attr('id'))
        })
    })
    .catch(err=>{
        console.log(err);
        alert('THAT BAI')
    })

  
})


function deleteById(id){
    $.ajax({
        url: '/api/tasks/' + id,
        type: 'delete'
    })
    .then(data=>{
        $('#'+id).remove()
    })
    .catch(err=>{

    })
}