
const form = document.querySelector('form')
const language = document.querySelectorAll('input[name="language"]')
const nameText = document.querySelector('#nameId')
const email = document.querySelector('#emailId')
const password = document.querySelector('#pwId')
const phoneno = document.querySelector('#phnoId')
const error = document.querySelector('.error')
const gender = document.querySelectorAll('input[name="gender"]')
const profession = document.querySelector('#professionId')

const nameDiv = document.querySelector('#nameDiv')
const emailDiv = document.querySelector('#emailDiv')
const pwDiv = document.querySelector('#pwDiv')
const phnoDiv = document.querySelector('#phnoDiv')
const genderDiv = document.querySelector('#genderDiv')
const languageDiv = document.querySelector('#languageDiv')
const professionDiv = document.querySelector('#professionDiv')


const signupBtn = document.querySelector('#signupBtn')

const divs = document.querySelectorAll('form div')

const logout = document.querySelector('.logout')

const formObj = {}

let page = 1

logout.addEventListener('click', () => {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('useremail')
    window.location.href = "http://127.0.0.1:5500/formValidation/login.html"
})


document.addEventListener('DOMContentLoaded', () => {

    const isAuthorize = localStorage.getItem('isLogin') || null
    if (!isAuthorize) {
        window.location.href = "http://127.0.0.1:5500/formValidation/login.html"
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

function switchToSecondPage() {
    // if (page === 1) {
    if (page++ === 1) {
        divs.forEach(div => {
            form.removeChild(div)
        })
        form.removeChild(signupBtn)
        // }

        // switchToSecondPage()


        const cityDiv = document.createElement('div')
        cityDiv.setAttribute('id', 'cityDiv')
        const cityLabel = document.createElement('label')
        const cityInput = document.createElement('input')
        cityInput.setAttribute('id', 'city')
        cityInput.type = 'text'
        cityLabel.innerHTML = "City"

        cityDiv.appendChild(cityLabel)
        cityDiv.appendChild(cityInput)


        const countryDiv = document.createElement('div')
        countryDiv.setAttribute('id', 'countryDiv')
        const countryLabel = document.createElement('label')
        const countrySelect = document.createElement('select')
        countrySelect.setAttribute('id', 'country')
        countryLabel.innerHTML = "Country"

        const optOne = document.createElement('option')
        optOne.value = ''
        optOne.innerHTML = 'Select'
        const optTwo = document.createElement('option')
        optTwo.value = 'INDIA'
        optTwo.innerHTML = 'INDIA'
        const optThree = document.createElement('option')
        optThree.value = 'US'
        optThree.innerHTML = 'US'
        const optFour = document.createElement('option')
        optFour.value = 'London'
        optFour.innerHTML = 'London'

        countrySelect.appendChild(optOne)
        countrySelect.appendChild(optTwo)
        countrySelect.appendChild(optThree)
        countrySelect.appendChild(optFour)


        countryDiv.appendChild(countryLabel)
        countryDiv.appendChild(countrySelect)


        const pincodeDiv = document.createElement('div')
        pincodeDiv.setAttribute('id', 'pincodeDiv')
        const pincodeLabel = document.createElement('label')
        const pincodeNumber = document.createElement('input')
        pincodeNumber.setAttribute('id', 'pincode')
        pincodeLabel.innerHTML = "Pincode"
        pincodeNumber.type = 'number'

        pincodeDiv.appendChild(pincodeLabel)
        pincodeDiv.appendChild(pincodeNumber)


        const addressBtn = document.createElement('button')
        addressBtn.innerHTML = "Add Address"
        addressBtn.setAttribute('id', 'addressBtn')




        form.appendChild(cityDiv)
        form.appendChild(countryDiv)
        form.appendChild(pincodeDiv)
        form.appendChild(addressBtn)

    }
}

async function addressHandler() {
    const cityDiv = document.querySelector('#cityDiv')
    const countryDiv = document.querySelector('#countryDiv')
    const pincodeDiv = document.querySelector('#pincodeDiv')
    const city = document.querySelector('#city')
    const country = document.querySelector('#country')
    const pincode = document.querySelector('#pincode')


    if (!city.value && !country.value && !pincode.value) {
        showError(cityDiv, 'Please Write Somethindddg')
        showError(countryDiv, 'Please Write Something')
        showError(pincodeDiv, 'Please Write Something')
        return
    }

    if (!city.value) {
        showError(cityDiv, 'Please Write Something')
        city.focus()
        return
    }

    if (!country.value) {
        showError(countryDiv, 'Please Write Something')
        country.focus()
        return
    }

    if (!pincode.value) {
        showError(pincodeDiv, 'Please Write Something')
        pincode.focus()
        return
    }

    if (pincode.value) {
        if (pincode.value.length < 6 || pincode.value.length > 6) {
            showError(pincodeDiv, 'Pincode should be of 6 digit')
            pincode.focus()
            return
        }
    }

    // const addressObj = {
    //     city: city.value,
    //     country: country.value,
    //     pincode: pincode.value
    // }

    formObj.city = city.value
    formObj.country = country.value
    formObj.pincode = pincode.value


    saveData()


    // alert('Address added Successfully')

    city.value = ''
    country.value = ''
    pincode.value = ''

    // console.log(addressObj)
}


// form.addEventListener('submit', (event) => {
//     event.preventDefault()

//     if (page++ === 1) {
//     // switchToSecondPage()


//         const cityDiv = document.createElement('div')
//         cityDiv.setAttribute('id', 'cityDiv')
//         const cityLabel = document.createElement('label')
//         const cityInput = document.createElement('input')
//         cityInput.setAttribute('id', 'city')
//         cityInput.type = 'text'
//         cityLabel.innerHTML = "City"

//         cityDiv.appendChild(cityLabel)
//         cityDiv.appendChild(cityInput)


//         const countryDiv = document.createElement('div')
//         countryDiv.setAttribute('id', 'countryDiv')
//         const countryLabel = document.createElement('label')
//         const countrySelect = document.createElement('select')
//         countrySelect.setAttribute('id', 'country')
//         countryLabel.innerHTML = "Country"

//         const optOne = document.createElement('option')
//         optOne.value = ''
//         optOne.innerHTML = 'Select'
//         const optTwo = document.createElement('option')
//         optTwo.value = 'INDIA'
//         optTwo.innerHTML = 'INDIA'
//         const optThree = document.createElement('option')
//         optThree.value = 'US'
//         optThree.innerHTML = 'US'
//         const optFour = document.createElement('option')
//         optFour.value = 'London'
//         optFour.innerHTML = 'London'

//         countrySelect.appendChild(optOne)
//         countrySelect.appendChild(optTwo)
//         countrySelect.appendChild(optThree)
//         countrySelect.appendChild(optFour)


//         countryDiv.appendChild(countryLabel)
//         countryDiv.appendChild(countrySelect)


//         const pincodeDiv = document.createElement('div')
//         pincodeDiv.setAttribute('id', 'pincodeDiv')
//         const pincodeLabel = document.createElement('label')
//         const pincodeNumber = document.createElement('input')
//         pincodeNumber.setAttribute('id', 'pincode')
//         pincodeLabel.innerHTML = "Pincode"
//         pincodeNumber.type = 'number'

//         pincodeDiv.appendChild(pincodeLabel)
//         pincodeDiv.appendChild(pincodeNumber)


//         const addressBtn = document.createElement('button')
//         addressBtn.innerHTML = "Add Address"
//         addressBtn.setAttribute('id', 'addressBtn')
//         addressBtn.onclick = addressHandler




//         form.appendChild(cityDiv)
//         form.appendChild(countryDiv)
//         form.appendChild(pincodeDiv)
//         form.appendChild(addressBtn)

//     }

// })


async function saveData() {
    try {
        const user = localStorage.getItem('useremail')
        const response = await fetch('http://www.localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                userInfo: user
            },
            body: JSON.stringify(formObj)
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }
        alert(data.message)
        addNewUser(data.formData)

    } catch (err) {
        console.error(err.message)
        // alert('Some Error Occured')
    }
}







form.addEventListener('submit', (event) => {
    event.preventDefault()

    if (page > 1) {
        addressHandler()
        return
    }


    let genderflag = false
    gender.forEach(gen => {
        if (gen.checked) genderflag = true
    })

    let languageflag = false
    language.forEach(lang => {
        if (lang.checked) languageflag = true
    })




    if (!nameText.value &&
        !email.value &&
        !password.value &&
        !phoneno.value &&
        !profession.value &&
        !languageflag &&
        !genderflag
    ) {

        showError(nameDiv, 'please write something')
        showError(emailDiv, 'please write something')
        showError(pwDiv, 'please write something')
        showError(phnoDiv, 'please write something')
        showError(genderDiv, 'please Select Gender')
        showError(languageDiv, 'please Select Language')
        showError(professionDiv, 'please Select Your Profession')
        nameText.focus()
        return
    }


    if (!nameText.value) {

        showError(nameDiv, 'please write something')
        nameText.focus()
        return

    }
    if (nameText.value) {
        if (nameText.value.length < 4) {

            showError(nameDiv, 'Name should be minimum of 4 letters')
            nameText.focus()
            return

        }

    }
    if (!email.value) {

        showError(emailDiv, 'please write something')
        email.focus()
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
    if (!phoneno.value) {

        showError(phnoDiv, 'please write something')
        phoneno.focus()
        return

    }

    if (phoneno.value) {

        let phFlag = false

        const phArr = phoneno.value.split('')

        for (let i = 0; i < phArr.length; i++) {
            if (parseInt(phArr[i]) === 0) continue
            if (!parseInt(phArr[i])) {
                showError(phnoDiv, 'Phone number should be digit only')
                phoneno.focus()
                return
            }
        }

        phFlag = true

        if (phoneno.value.length < 10 && phFlag) {
            showError(phnoDiv, 'Phone number should be of 10 digit')
            phoneno.focus()
            return
        }

        if (phoneno.value.length > 10 && phFlag) {
            showError(phnoDiv, 'Phone number should be of 10 digit')
            phoneno.focus()
            return
        }
    }



    if (!genderflag) {

        showError(genderDiv, 'please Select Gender')
        return
    }


    if (!languageflag) {

        showError(languageDiv, 'please Select Language')
        return

    }

    if (!profession.value) {

        showError(professionDiv, 'please Select Your Profession')
        return

    }



    // alert('Successfully Submitted')
    // const formObj = {
    //     Fullname: nameText.value,
    //     Email: email.value,
    //     Password: password.value,
    //     PhoneNo: phoneno.value,
    //     Gender: '',
    //     Language: [],
    //     Profession: profession.value
    // }

    formObj.Fullname = nameText.value
    formObj.Email = email.value
    formObj.Password = password.value
    formObj.PhoneNo = phoneno.value
    formObj.Gender = ''
    formObj.Language = []
    formObj.Profession = profession.value

    gender.forEach(gen => {
        if (gen.checked) {
            formObj['Gender'] = gen.value
        }
    })

    language.forEach(item => {
        if (item.checked) formObj['Language'].push(item.value)
    })


    switchToSecondPage()


})



function errorHandler(msg) {
    while (error.firstChild) {
        error.removeChild(error.firstChild)
    }

    error.style.display = 'block'

    const p = document.createElement('p')
    p.innerHTML = msg

    error.appendChild(p)

    setTimeout(() => {
        error.style.display = 'none'

    }, 1000)

}







function addNewUser(user) {
    const tbody = document.createElement('tbody') || null
    if (!tbody) {
        window.location.reload()
    }

    const tr_body = document.createElement('tr')

    const td_1 = document.createElement('td')
    const td_2 = document.createElement('td')
    const td_3 = document.createElement('td')
    const td_4 = document.createElement('td')
    const td_5 = document.createElement('td')
    const td_6 = document.createElement('td')
    const td_7 = document.createElement('td')
    const td_8 = document.createElement('td')
    const td_9 = document.createElement('td')
    const td_10 = document.createElement('td')


    td_1.innerHTML = user.Fullname
    td_2.innerHTML = user.Email
    td_3.innerHTML = '*'.repeat(user.Password.length)
    td_4.innerHTML = user.PhoneNo
    td_5.innerHTML = user.Gender
    td_6.innerHTML = user.Language.join(' , ')
    td_7.innerHTML = user.Profession
    td_8.innerHTML = user.city
    td_9.innerHTML = user.country
    td_10.innerHTML = user.pincode

    tr_body.appendChild(td_1)
    tr_body.appendChild(td_2)
    tr_body.appendChild(td_3)
    tr_body.appendChild(td_4)
    tr_body.appendChild(td_5)
    tr_body.appendChild(td_6)
    tr_body.appendChild(td_7)
    tr_body.appendChild(td_8)
    tr_body.appendChild(td_9)
    tr_body.appendChild(td_10)

    tbody.appendChild(tr_body)
}





