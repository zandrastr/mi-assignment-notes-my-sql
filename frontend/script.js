tinymce.init({
    selector: '#noteContent',
    plugins: 'code',
    toolbar: 'undo redo | forecolor backcolor | bold italic',
    setup: function(editor){
        editor.on('change', function(){
            editor.save();
        })
    }
})

const saveBtn = document.getElementById('saveBtn');
const noteContent = document.getElementById('noteContent');
const noteContentResult = document.getElementById('noteContentResult');

saveBtn.addEventListener('click', function(){
    noteContentResult.innerHTML = noteContent.value;
})