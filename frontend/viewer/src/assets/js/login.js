'use strict'

const button = document.getElementById('login')


const validarLogin = async () => {
    const email = document.getElementById('user').value
    const password = document.getElementById('password').value

    const urlLogin = 'https://back-login.vercel.app/usuarios'

    const listarUsers = await fetch(urlLogin)

    const objUsers = await listarUsers.json()

    if (email == '' || password == ''){
        Swal.fire({
            timer: 2000,
            title: '<p class="text-2xl text-secundary font-fontP"> É necessário preencher todos os dados <p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            padding: '0 0 28px 0',
            heightAuto: false,
        })
    } else {

        let validaUser = false

        objUsers.forEach(user => {
        
            if(user.email == email && user.senha == password){
                validaUser = true

                Swal.fire({
                    timer: 2000,
                    title: '<p class="text-2xl text-secundary font-fontP"> Filme cadastrado com sucesso! <p>',
                    icon: 'success',
                    iconColor: '#00c190',
                    showConfirmButton: false,
                    width: '25rem',
                    padding: '0 0 28px 0',
                    heightAuto: false,
                })

                window.location.href = './assets/pages/home.html'
            }
        })

        if (!validaUser){
            Swal.fire({
            timer: 2000,
            title: '<p class="text-2xl text-secundary font-fontP"> Email ou senha incorretos <p>',
            icon: 'warning',
            iconColor: '#FD3131',
            showConfirmButton: false,
            width: '25rem',
            padding: '0 0 28px 0',
            heightAuto: false,
        })
        }

    }

}

const validarCadastro = () => {
    
}

button.addEventListener('click', () => {
    validarLogin()
})