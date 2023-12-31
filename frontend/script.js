let root = document.getElementById('root');

//Function to create login form
function printLoginForm() {
    const loginEmail = document.createElement('input');
    const loginPassword = document.createElement('input');
    const loginBtn = document.createElement('button');

    loginEmail.id = 'loginEmail';
    loginPassword.id = 'loginPassword';
    loginBtn.id = 'loginBtn';

    loginEmail.placeholder = 'Email';
    loginPassword.placeholder = 'Password';
    loginBtn.innerText = 'Login';

    root.append(loginEmail, loginPassword, loginBtn);

    loginBtn.addEventListener('click', () => {
        let loginInput = {
            email: loginEmail.value,
            password: loginPassword.value
        }

        root.innerHTML = '';
        printNotesList();
    })
}

//Function to print notes list
function printNotesList() {
    const notesHeader = document.createElement('h3');
    let newNoteBtn = document.createElement('button');

    notesHeader.innerText = 'My notes:';
    newNoteBtn.innerText = 'New note';
    
    fetch('http://localhost:3000/notes')
    .then (res => res.json())
    .then(data => {
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
        
        root.innerHTML = '';
        root.append(notesHeader, ul, newNoteBtn);

        newNoteBtn.addEventListener('click', () => {
            createNewNote();
        })
    })
}

//Function to print one note from the list
function printOneNote(id) {
    let noteContainer = document.createElement('div');
    noteContainer.id = 'noteContainer';

    fetch('http://localhost:3000/notes/' + id)
    .then (res => res.json())
    .then(data => {
        let noteTitle = document.createElement('h3');
        let noteContent = document.createElement('p');
        let backBtn = document.createElement('button');
        let editBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        noteTitle.id = 'noteTitle';
        noteContent.id = 'noteContent';
        backBtn.id = 'backBtn';
        editBtn.id = 'editBtn';
        deleteBtn.id = 'deleteBtn';

        noteTitle.innerText = data[0].noteTitle;
        noteContent.innerHTML = data[0].noteContent;
        backBtn.innerText = 'Back to notes list';
        editBtn.innerText = 'Edit note';
        deleteBtn.innerText = 'Delete note';

        noteContainer.append(noteTitle, noteContent, backBtn, editBtn, deleteBtn);

        backBtn.addEventListener('click', () => {
            printNotesList();
        })
    
        editBtn.addEventListener('click', () => {
            editNote(id);
        })

        deleteBtn.addEventListener('click', () => {
            deleteNote(id);
            alert("The note has been deleted, you will now be sent back to the notes startpage.");
            printNotesList();
        })
    })

    root.innerHTML = '';
    root.append(noteContainer);
}

//Function to create a new note    
function createNewNote() {
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

    noteTitle.placeholder = 'Title';
    noteContent.placeholder = 'Write your note here...';
    saveBtn.innerText = 'Save';
    backBtn.innerText = 'Back to notes list';
    resultBackBtn.innerText = 'Back to notes list';

    newNoteContainer.append(noteTitle, noteContent, backBtn, saveBtn);
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
            printNotesList();
        })
    })

    backBtn.addEventListener('click', () => {
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
    noteId = id;

    const editNoteContainer = document.createElement('div');
    const editNoteTitle = document.createElement('input');
    const editNoteContent = document.createElement('textarea');
    const editSaveBtn = document.createElement('button');

    const editNoteContainerResult = document.createElement('div');
    const editNoteTitleResult = document.createElement('h3');
    const editNoteContentResult = document.createElement('p');
    const backBtn = document.createElement('button');
    
    editNoteTitle.id = 'editNoteTitle';
    editNoteContent.id = 'editNoteContent';
    editSaveBtn.id = 'editSaveBtn';

    editNoteContainerResult.id = 'editNoteContainerResult';
    editNoteTitleResult.id = 'editNoteTitleResult';
    editNoteContentResult.id = 'editNoteContentResult';
    backBtn.id = 'backBtn';

    backBtn.innerText = 'Back to notes list';
    editNoteTitle.value = noteTitle.innerHTML;
    editNoteContent.innerText = noteContent.innerHTML;
    editSaveBtn.innerText = 'Save edit';

    editNoteContainer.append(editNoteTitle, editNoteContent, backBtn, editSaveBtn);

    root.innerHTML = '';
    root.append(editNoteContainer);

    editSaveBtn.addEventListener('click', function(){
        editNoteContentResult.innerHTML = editNoteContent.value;
        editNoteTitleResult.innerHTML = editNoteTitle.value;
        editNoteContainerResult.append(editNoteTitleResult, editNoteContentResult, backBtn);
        
        fetch('http://localhost:3000/notes/edit/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: editNoteTitle.value, content: editNoteContent.value})
        })

        root.innerHTML = '';
        root.append(editNoteContainerResult);
    })
    
    backBtn.addEventListener('click', () => {
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

//Function to delete a note
function deleteNote(id) {
    fetch('http://localhost:3000/notes/delete/' + id, {
        method: 'DELETE',
    })
}

printLoginForm();
