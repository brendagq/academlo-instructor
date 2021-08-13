
function DeterminateView() {
    const session = localStorage.getItem('logged')
  
    const view = document.getElementById('main-wrapper')

    if( session === "0"  ){
        const nav = document.getElementById('navbar')
        nav.classList.add('hide') 

        view.innerHTML= `
            <form id="login-form" >
                <h2>INICIAR SESIÓN</h2>
                <div class="form-input-wrapper">
                    <label for="loginemail">Correo electrónico</label>
                    <input type="email" autocomplete="off" required id="loginemail">
                    <span></span>
                </div>
                <div class="form-input-wrapper">
                    <label for="loginpassword">Contraseña</label>
                    <input type="password" autocomplete="off" required id="loginpassword">
                    <span></span>
                </div>
                <button type="submit" onclick="LoginSubmit()">Entrar</button>
            </form>`
    }else if( session === "1" ){ 
        const nav = document.getElementById('navbar')
        nav.classList.remove('hide')  

        view.innerHTML = `
            <section>
                <form id="user-form" >
                    <h2>CREAR USUARIO</h2>
                    <div class="form-input-wrapper">
                        <label for="name">Nombre</label>
                        <input type="text" autocomplete="off" required id="name">
                        <span></span>
                    </div>
                    <div class="form-input-wrapper">
                        <label for="lastName">Apellidos</label>
                        <input type="text" autocomplete="off" required id="lastName">
                        <span></span>
                    </div>
                    <div class="form-input-wrapper">
                        <label for="email">Correo electrónico</label>
                        <input type="email" autocomplete="off" required id="email">
                        <span></span>
                    </div>
                    <button type="submit" onclick="AddUser()">Crear</button>
                </form>
                <div id="card-wrapper"></div>
            </section>
        `

        GetUsersList()
    }else{
        const nav = document.getElementById('navbar')
        nav.classList.add('hide') 

        view.innerHTML = `
              <form id="signup-form" >
                <h2>CREAR UNA CUENTA</h2>
                <div class="form-input-wrapper">
                    <label for="name">Nombre</label>
                    <input type="text" autocomplete="off" required id="name">
                    <span></span>
                </div>
                <div class="form-input-wrapper">
                    <label for="lastName">Apellidos</label>
                    <input type="text" autocomplete="off" required id="lastName">
                    <span></span>
                </div>
                <div class="form-input-wrapper">
                    <label for="email">Correo electrónico</label>
                    <input type="email" autocomplete="off" required id="email">
                    <span></span>
                </div>
                <div class="form-input-wrapper">
                    <label for="password">Contraseña</label>
                    <input type="password" autocomplete="off" required id="password">
                    <span></span>
                </div>
                <button type="submit" onclick="SignupSubmit()">Registrarse</button>
            </form>
        `
    }
}


function SignupSubmit() {
    let form = document.getElementById("signup-form")

    if( form.name.value && form.lastName.value && form.email.value && form.password.value){
        localStorage.setItem( 'name', form.name.value )
        localStorage.setItem( 'lastName', form.lastName.value )
        localStorage.setItem( 'email', form.email.value )
        localStorage.setItem( 'password', form.password.value.toString() )
        localStorage.setItem( 'logged', '0')
        localStorage.setItem( 'usersList', JSON.stringify( [] ))

        DeterminateView()
    }


}

function LoginSubmit() {
    let form = document.getElementById("login-form")
    let currentEmail = localStorage.getItem('email')
    let  currentPassword = localStorage.getItem('password')

    if( form.loginemail.value && form.loginpassword.value  ){       
        if(  currentEmail == form.loginemail.value && currentPassword == form.loginpassword.value){
            localStorage.setItem( 'logged', '1')
            DeterminateView()
        }else{
            alert("Email y/o contraseña incorrectos")
        }
    }
    
}



function  Logout() {
    localStorage.setItem( 'logged', '0')

    DeterminateView()
}

function AddUser() {
    let form = document.getElementById("user-form")
    let currentUsers = JSON.parse( localStorage.getItem('usersList') )

    if(form.name.value && form.lastName.value && form.email.value ){

        let newUser = {
            name : form.name.value,
            lastName : form.lastName.value,
            email : form.email.value,
        }

        let newList = [...currentUsers, newUser]

        localStorage.setItem( 'usersList', JSON.stringify( newList ))

        GetUsersList()
        
    }

}

function GetUsersList() {
    let users = JSON.parse( localStorage.getItem('usersList') )

    const wrapper = document.getElementById("card-wrapper")
    wrapper.innerHTML=""

    for(let i = 0 ; i < users.length; i++){
        wrapper.innerHTML += `
                    <div class="card">
                        <h4>${users[i].name} ${users[i].lastName}</h4>
                        <h5>${users[i].email}</h5>
                        <button onclick="DeleteUser(${i})" class="danger">Eliminar</button>
                        <button onclick="ChangeToEditUser(${i})">Editar</button>
                    </div>
        `
    }

}

function DeleteUser(index) {
    let users = JSON.parse( localStorage.getItem('usersList') )

    users.splice(index, 1)

    localStorage.setItem( 'usersList', JSON.stringify( users ))

    GetUsersList()
}

function EditUser(index) {
    const form = document.getElementById("edit-form")
    const list = JSON.parse( localStorage.getItem('usersList') )

    if(form.name.value && form.lastName.value && form.email.value ){

        let editUser = {
            name : form.name.value,
            lastName : form.lastName.value,
            email : form.email.value,
        }

        list[index] = editUser

        localStorage.setItem( 'usersList', JSON.stringify( list ))       

        DeterminateView()  
    }
}

function ChangeToEditUser(index) {
    const view = document.getElementById('main-wrapper')
    const list = JSON.parse( localStorage.getItem('usersList') )
    const user = list[index]

    view.innerHTML = `
            <section>
                <form id="edit-form" >
                    <h2>EDITAR USUARIO</h2>
                    <div class="form-input-wrapper">
                        <label for="name">Nombre</label>
                        <input type="text" autocomplete="off" required id="name" value=${user.name}>
                        <span></span>
                    </div>
                    <div class="form-input-wrapper">
                        <label for="lastName">Apellidos</label>
                        <input type="text" autocomplete="off" required id="lastName" value=${user.lastName}>
                        <span></span>
                    </div>
                    <div class="form-input-wrapper">
                        <label for="email">Correo electrónico</label>
                        <input type="email" autocomplete="off" required id="email" value=${user.email}>
                        <span></span>
                    </div>
                    <button type="button" onclick="EditUser(${index})">Editar usuario</button>
                    <button type="button" class="danger" onclick="DeterminateView()">Cancelar acción</button>
                </form>
                <div id="card-wrapper"></div>
            </section>
    `

    
}


DeterminateView()