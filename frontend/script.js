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
    notesHeader.innerText = 'My notes:';
    
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
    
        root.append(notesHeader, ul);
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

        noteTitle.id = 'noteTitle';
        noteContent.id = 'noteContent';

        noteTitle.innerText = data[0].noteTitle;
        noteContent.innerText = data[0].noteContent;

        noteContainer.append(noteTitle, noteContent);
    })

    //Clear root element
    root.innerHTML = '';

    root.append(noteContainer);
}

printLoginForm();
