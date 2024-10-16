const form = document.querySelector('form')
const email = document.querySelector('#emid')
const password = document.querySelector('#pwid')
const emailDiv = document.querySelector('#emailDiv')
const pwDiv = document.querySelector('#pwDiv')

const pageInfo = document.querySelector('#pageInfo')

document.addEventListener('DOMContentLoaded',()=>{
    const isAuthorize = localStorage.getItem('isLogin') || null
    if(isAuthorize){
        window.location.href = "http://127.0.0.1:5500/formValidation/index.html"
    }
})


form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const page = pageInfo.innerHTML


    if (!email.value && !password.value) {
        showError(emailDiv, 'Please write something')
        showError(pwDiv, 'Please write something')
        email.focus()
        return
    }

    if (!email.value) {
        showError(emailDiv, 'Please write something')
        return
    }

    if (email.value) {

        if (!email.value.includes('.com') || !email.value.includes('@') || !email.value.length > 6) {
            showError(emailDiv, 'Invalid Email Address')
            return
        }


        if (email.value.includes('.com') && email.value.includes('@') && email.value.length > 6) {
            const emailArray = email.value.split('')
            const firstIndex = emailArray.indexOf('@')
            const secondIndex = emailArray.indexOf('.')
            if (secondIndex - firstIndex < 2) {
                showError(emailDiv, 'Invalid Email Address')
                return
            }
            if (emailArray.indexOf('@') !== emailArray.lastIndexOf('@')) {
                showError(emailDiv, 'Invalid Email Address')
                return
            }
            if (emailArray.indexOf('.') !== emailArray.lastIndexOf('.')) {
                showError(emailDiv, 'Invalid Email Address')
                return
            }
            if (emailArray.includes('!') ||
                emailArray.includes('#') ||
                emailArray.includes('$') ||
                emailArray.includes('%') ||
                emailArray.includes('^') ||
                emailArray.includes('*') ||
                emailArray.includes('&')) {
                showError(emailDiv, 'Invalid Email Address')
                return
            }

        }

    }

    if (!password.value) {

        showError(pwDiv, 'please write something')
        password.focus()
        return

    }
    if (password.value && password.value.length < 6) {

        showError(pwDiv, 'password should be more than 5 letter')
        password.focus()
        return

    }

    const user = {
        email: email.value,
        password: password.value
    }


    try {


        const response = await fetch(`http://www.localhost:3000/${page === 'Login' ? 'login' : 'signup'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }
        alert(data.message)
        if (data.message === 'Successfully Login') {
            localStorage.setItem('isLogin', true)
            localStorage.setItem('useremail',user.email)
            window.location.href = "http://127.0.0.1:5500/formValidation/index.html"
        }
        // addNewUser(data.formData)

    } catch (err) {
        console.error(err.message)
        // alert('Some Error Occured')
    }


})









function showError(div, msg) {

    const p = document.createElement('p')
    p.innerHTML = msg
    div.appendChild(p)

    setTimeout(() => {
        div.removeChild(p)
    }, 1000)
}