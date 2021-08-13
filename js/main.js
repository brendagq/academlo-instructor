
/*Determina que vista se va a mostrar dependiendo del valor de 'logged' que se encuentra en el localStorage
    si logged = 0, muestra el form para iniciar sesión, 
    si logged = 1 muestra el dashboard con el listado de usuarios y form para crear uno nuevo,
    si no existe, es decir, si logged no es igual ni a 0 ni a 1, muestra el form para registrarse 
    puesto que no hay información guardada en localStorage de ningun usuario
*/

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

/*Función que se ejecuta en el submit del registro*/
function SignupSubmit() {
    let form = document.getElementById("signup-form")

    /*En caso de que todos los valores sean truthy, es decir, distintos a "" (cadena vacia), undefined o null, 
    los guarda en localStorage para ser utilizados despues y cambia a la vista de login.
    Crea tambien userList donde se guardara la lista de usuarios creados.
    */
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

/* Se ejecuta en el submit de login */
function LoginSubmit() {
    let form = document.getElementById("login-form")
    let currentEmail = localStorage.getItem('email')
    let  currentPassword = localStorage.getItem('password')

    if( form.loginemail.value && form.loginpassword.value  ){ 
        /*Compara los valores de email y contraseña ingresados por el usuario en el inicio de sesión 
        y los compara con la información guardad en localStorage. Si la informacion coincide cambia el 
        valor de logged y muestra el dashboard, en caso contrario muestra una alerta*/      
        if(  currentEmail == form.loginemail.value && currentPassword == form.loginpassword.value){
            localStorage.setItem( 'logged', '1')
            DeterminateView()
        }else{
            alert("Email y/o contraseña incorrectos")
        }
    }
    
}



function  Logout() {
    /* Cierra sesión al cambiar el valor de logged sin eliminar la información almacenada en localstorage.
    Muestra la vista de login */
    localStorage.setItem( 'logged', '0')

    DeterminateView()
}

/*Agrega un nuevo usuario a la lista de usuarios almacenada*/
function AddUser() {

    let form = document.getElementById("user-form")
    /*JSON.parse() permite convertir el json alojado en userList en un array para facilitar su manipulación*/
    let currentUsers = JSON.parse( localStorage.getItem('usersList') )

    if(form.name.value && form.lastName.value && form.email.value ){

        let newUser = {
            name : form.name.value,
            lastName : form.lastName.value,
            email : form.email.value,
        }

        /*Define una variable de tipo array llamada newList, ademas de asignarle un valor con ayuda de spread syntax.
        Los elementos contenidos en la nueva variable son todos los elementos habidos en currentUsers
        (los elementos ya existentes en el localStorage), MÁS el nuevo elemento newUser
        */
        let newList = [...currentUsers, newUser]

        /*Reemplaza el valor de userList por la nueva lista que incluye al nuevo usuario.
        Lista a todos los usuarios de nuevo
        */
        localStorage.setItem( 'usersList', JSON.stringify( newList ))

        GetUsersList()
        
    }

}

/*Lista todos los usuarios almacenados en usersList*/
function GetUsersList() {
    let users = JSON.parse( localStorage.getItem('usersList') )

    const wrapper = document.getElementById("card-wrapper")
    /* Vacia de contenido para evitar mostrar usuarios repetidos*/
    wrapper.innerHTML=""

    /*  Ciclo que muestra cada uno de los usuarios. */
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

/*  Los usuarios guardados en userList se guardan de forma temporal en una variable llamada users.
    El usuario que quiere eliminarse es borrado del array users con ayuda del método splice que recibe como 
    parametros la posición desde la cual se eliminaran elementos y la cantidad de elementos a eliminar (1, en éste caso).
    
    A usersList se le reasigna el nuevo valor de users que ya ha sido modificado y ya no contiene al usuario seleccionado.
    Lista a los usuarios nuevamente ya que hubo una modificación.
*/
function DeleteUser(index) {
    let users = JSON.parse( localStorage.getItem('usersList') )

    users.splice(index, 1)

    localStorage.setItem( 'usersList', JSON.stringify( users ))

    GetUsersList()
}


/*  Permite editar la información de un usuario sobreescribiendo el valor del elemento correspondiente en 
    el array usersList
*/
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


/*Muestra un form para editar a un usuario seleccionado*/
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