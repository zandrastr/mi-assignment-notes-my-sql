// tinymce.init({
//     selector: '#noteContent',
//     plugins: 'code',
//     toolbar: 'undo redo | forecolor backcolor | bold italic',
//     setup: function(editor){
//         editor.on('change', function(){
//             editor.save();
//         })
//     }
// })

let root = document.getElementById('root');

//Function to create login form
function printLoginForm() {
    const loginEmail = document.createElement('input');
    const loginPassword = document.createElement('input');
    const loginBtn = document.createElement('button');

    loginEmail.id = 'loginEmail';
    loginPassword.id = 'loginPassword';
    loginBtn.id = 'loginBtn';

    loginEmail.class = 'loginEmail';
    loginPassword.class = 'loginPassword';
    loginBtn.class = 'loginBtn';

    loginEmail.placeholder = 'Email';
    loginPassword.placeholder = 'Password';
    loginBtn.innerText = 'Login';

    root.append(loginEmail, loginPassword, loginBtn);

    loginBtn.addEventListener('click', () => {
        let loginInput = {
            email: loginEmail.value,
            password: loginPassword.value
        }

         console.log('Login input:', loginInput);
    
        //TO DO 
        //Add Fetch, post to backend server
        //If login not ok: show error message
        //If login ok: print notes

        //Clear root element
        root.innerHTML = '';

        //Call function to print notes list
        printNotesList();
    })
}

//Function to print notes list
function printNotesList() {
    console.log('Function to print notes list');

    const notesHeader = document.createElement('h1');
    let newNoteBtn = document.createElement('button');

    notesHeader.innerText = 'My notes:';
    newNoteBtn.innerText = 'New note';
    
    fetch('http://localhost:3000/notes')
    .then (res => res.json())
    .then(data => {
        console.log('Notes:', data);

        let ul = document.createElement('ul');

        data.map(note => {
            let li = document.createElement('li');
            li.innerText = note.noteTitle;
            li.id = note.noteId;
            
            li.addEventListener('click', () => {
                printOneNote(li.id);
            })

            ul.append(li);
        })     
        
        //Clear root element
        root.innerHTML = '';
        
        root.append(notesHeader, ul, newNoteBtn);

        newNoteBtn.addEventListener('click', () => {
            console.log('New note btn clicked');
            createNewNote();
        })
    })
}

//Function to print one note from the list
function printOneNote(id) {
    console.log('Function to print one note from the list. Id:', id);

    let noteContainer = document.createElement('div');
    noteContainer.id = 'noteContainer';

    fetch('http://localhost:3000/notes/' + id)
    .then (res => res.json())
    .then(data => {
        console.log('One note:', data);

        let noteTitle = document.createElement('h2');
        let noteContent = document.createElement('p');

        let backBtn = document.createElement('button');
        let editBtn = document.createElement('button');

        noteTitle.id = 'noteTitle';
        noteContent.id = 'noteContent';
        backBtn.id = 'backBtn';
        editBtn.id = 'editBtn';

        noteTitle.innerText = data[0].noteTitle;
        noteContent.innerHTML = data[0].noteContent;
        backBtn.innerText = 'Back to notes list';
        editBtn.innerText = 'Edit note';

        noteContainer.append(noteTitle, noteContent, backBtn, editBtn);

        backBtn.addEventListener('click', () => {
            console.log('Back btn clicked');
            printNotesList();
        })
    
        editBtn.addEventListener('click', () => {
            console.log('Edit btn clicked');
            editNote(id);
        })
    })

    //Clear root element
    root.innerHTML = '';

    root.append(noteContainer);
}

//Function to create a new note    
function createNewNote() {
    console.log('Function to create a new note');

    const newNoteContainer = document.createElement('div');
    const noteTitle = document.createElement('input');
    const noteContent = document.createElement('textarea');
    const saveBtn = document.createElement('button');
    const backBtn = document.createElement('button');

    const resultNoteContainer = document.createElement('div');
    const resultNoteTitle = document.createElement('h3');
    const resultNoteContent = document.createElement('p');
    const resultBackBtn = document.createElement('button');

    newNoteContainer.id = 'newNoteContainer';
    noteTitle.id = 'noteTitle';
    noteContent.id = 'noteContent';
    saveBtn.id = 'saveBtn';
    backBtn.id = 'backBtn';

    resultNoteContainer.id = 'resultNoteContainer';
    resultNoteTitle.id = 'resultNoteTitle';
    resultNoteContent.id = 'resultNoteContent';
    resultBackBtn.id = 'resultBackBtn';

    newNoteContainer.class = 'newNoteContainer';
    noteTitle.class = 'noteTitle';
    noteContent.class = 'noteContent';
    saveBtn.class = 'saveBtn';
    backBtn.class = 'backBtn';

    resultNoteContainer.class = 'resultNoteContainer';
    resultNoteTitle.class = 'resultNoteTitle';
    resultNoteContent.class = 'resultNoteContent';
    resultBackBtn.class = 'resultBackBtn';

    noteTitle.placeholder = 'Title';
    noteContent.placeholder = 'Write your note here...';
    saveBtn.innerText = 'Save';
    backBtn.innerText = 'Back to notes list';

    resultBackBtn.innerText = 'Back to notes list';

    newNoteContainer.append(noteTitle, noteContent, saveBtn, backBtn);
    resultNoteContainer.append(resultNoteTitle, resultNoteContent, resultBackBtn);

    root.innerHTML = '';
    root.append(newNoteContainer);

    saveBtn.addEventListener('click', function(){
        
        fetch('http://localhost:3000/notes/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: noteTitle.value, content: noteContent.value})
        })
        
        resultNoteTitle.innerHTML = noteTitle.value;
        resultNoteContent.innerHTML = noteContent.value;
        
        root.innerHTML = '';

        root.append(resultNoteContainer);

        resultBackBtn.addEventListener('click', () => {
            console.log('Back btn clicked');
            printNotesList();
        })
    })

    backBtn.addEventListener('click', () => {
        console.log('Back btn clicked');
        printNotesList();
    })

    //remove tiny mce before initializing it again (needed if function to create new note is called more than once)
    tinymce.remove('#noteContent'); 

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
}

//Function to edit an existing note    
function editNote(id) {
    console.log('Function to edit an existing note');

    noteId = id;
    console.log(noteId);

    const editNoteContainer = document.createElement('div');
    const editNoteTitle = document.createElement('input');
    const editNoteContent = document.createElement('textarea');
    const editSaveBtn = document.createElement('button');
    const editNoteContentResult = document.createElement('p');
    let backBtn = document.createElement('button');
    
    editNoteTitle.id = 'editNoteTitle';
    editNoteContent.id = 'editNoteContent';
    editSaveBtn.id = 'editSaveBtn';
    editNoteContentResult.id = 'editNoteContentResult';
    backBtn.id = 'backBtn';
    
    editNoteTitle.class = 'editNoteTitle';
    editNoteContent.class = 'editNoteContent';
    editSaveBtn.class = 'editSaveBtn';
    editNoteContentResult.class = 'editNoteContentResult';
    backBtn.innerText = 'Back to notes list';

    console.log('edit note title:', noteTitle.innerHTML);
    console.log('edit note content:', noteContent.innerHTML);

    editNoteTitle.value = noteTitle.innerHTML;
    editNoteContent.innerText = noteContent.innerHTML;
    editSaveBtn.innerText = 'Save edit';

    editNoteContainer.append(editNoteTitle, editNoteContent, editSaveBtn, editNoteContentResult, backBtn);

    root.innerHTML = '';
    root.append(editNoteContainer);

    editSaveBtn.addEventListener('click', function(){
        editNoteContentResult.innerHTML = editNoteContent.value;
        console.log('update note!');
        
        fetch('http://localhost:3000/notes/edit/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: editNoteTitle.value, content: editNoteContent.value})
        })
    })
    
    backBtn.addEventListener('click', () => {
        console.log('Back btn clicked');
        printNotesList();
    })
    
    //remove tiny mce before initializing it again (needed if function to edit note is called more than once)
    tinymce.remove('#editNoteContent'); 
    
    tinymce.init({
        selector: '#editNoteContent',
        plugins: 'code',
        toolbar: 'undo redo | forecolor backcolor | bold italic',
        setup: function(editor){
            editor.on('change', function(){
                editor.save();
            })
        }
    })    
}

printLoginForm();
