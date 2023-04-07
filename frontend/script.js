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
}

printLoginForm();
