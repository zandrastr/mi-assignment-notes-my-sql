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