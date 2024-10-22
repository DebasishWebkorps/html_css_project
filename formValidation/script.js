
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
    // localStorage.removeItem('useremail')
    localStorage.removeItem('userToken')
    window.location.href = "http://127.0.0.1:5500/formValidation/login.html"
})


document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('data')
    localStorage.removeItem('row')
    localStorage.removeItem('deleteRow')

    // const isAuthorize = localStorage.getItem('isLogin') || null
    // if (!isAuthorize) {
    //     window.location.href = "http://127.0.0.1:5500/formValidation/login.html"
    // }
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
    if (page++ === 1) {
        divs.forEach(div => {
            form.removeChild(div)
        })
        form.removeChild(signupBtn)

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

        const countries = ['Select', 'INDIA', 'US', 'London']

        countries.forEach(country => {
            const option = document.createElement('option')
            option.value = country === 'Select' ? '' : country
            option.innerHTML = country
            countrySelect.appendChild(option)
        })


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

        const data = localStorage.getItem('data') || null
        if (data) {
            addressBtn.innerHTML = "Save Data"
        } else {
            addressBtn.innerHTML = "Add Data"
        }
        addressBtn.setAttribute('id', 'addressBtn')

        form.appendChild(cityDiv)
        form.appendChild(countryDiv)
        form.appendChild(pincodeDiv)
        form.appendChild(addressBtn)


        const isData = localStorage.getItem('data') || null
        if (isData) {
            const data = JSON.parse(isData)

            cityInput.value = data.city
            countrySelect.value = data.country
            pincodeNumber.value = data.pincode
        }

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
        showError(cityDiv, 'Please Write Something')
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

    formObj.city = city.value
    formObj.country = country.value
    formObj.pincode = pincode.value

    const btn = document.querySelector('#addressBtn')
    btn.innerHTML = "Sending..."

    saveData()

}


async function updateData(data) {
    const { _id } = JSON.parse(data)
    try {
        const userToken = localStorage.getItem('userToken')

        // const user = localStorage.getItem('useremail')
        const response = await fetch('http://www.localhost:3000/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                userToken
            },
            body: JSON.stringify({ formObj, uid: _id })
        })
        const data = await response.json()
        if (data.message === 'Invalid Token') {
            localStorage.removeItem('userToken')
            alert('You are not authorized to update data')
            window.location.href = "http://127.0.0.1:5500/formValidation/index.html"
            return
        }

        if (!response.ok) {
            throw new Error(data.message)
        }


        const { updatedData } = data
        alert(data.message)
        // appendLive(data.formData)
        updateRow(updatedData)

    } catch (err) {
        // console.error(err.message)

        if (err.message !== 'data is not defined') {
            alert('Some error occured')
        }
        // alert('Some Error Occured')
    } finally {
        const btn = document.querySelector('#addressBtn')
        btn.innerHTML = "Update Data"
        return
    }


}


function updateRow(data) {

    const target = +localStorage.getItem('row') + 1
    const allRow = document.querySelectorAll('tr')

    allRow.forEach((row, idx) => {
        if (idx === target) {
            while (row.firstChild) {
                row.removeChild(row.firstChild)
            }

            const values = Object.values(data)
            values.forEach((val, idx) => {
                if (idx > 0 && idx < 11) {
                    const td = document.createElement('td')
                    if (idx === 3) {
                        td.innerHTML = '*'.repeat(val.length)
                    } else {
                        td.innerHTML = val
                    }
                    row.appendChild(td)
                }
            })
            const delbutton = document.createElement('button')
            delbutton.style.background = 'red'
            delbutton.style.color = 'white'
            delbutton.innerHTML = 'Delete'

            row.appendChild(delbutton)

        }
    })




}


async function isValidUser() {
    try {
        const token = localStorage.getItem('userToken')
        // const user = localStorage.getItem('useremail')
        const response = await fetch('http://www.localhost:3000/isvalid', {
            headers: {
                userInfo: token
            }
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message)
        if (data.message === 'Valid Token') {
            return true
        }
    } catch (err) {
        alert('You are not allowed to do these operation')
        localStorage.clear()
        window.location.href = "http://127.0.0.1:5500/formValidation/login.html"
        return false
    }
}



async function saveData() {
    const isAllowed = await isValidUser()
    if(!isAllowed){
        return
    }
    const data = localStorage.getItem('data') || null
    if (data) {
        await updateData(data)
        return
    }
    try {
        const userToken = localStorage.getItem('userToken')
        // const user = localStorage.getItem('useremail')
        const response = await fetch('http://www.localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                userToken
            },
            body: JSON.stringify(formObj)
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }

        const { formData } = data
        alert(data.message)
        // appendLive(data.formData)
        appendLive(formData)

    } catch (err) {
        console.error(err.message)

        if (err.message !== 'data is not defined') {
            alert('Some error occured')
        }
        // alert('Some Error Occured')
    } finally {
        const btn = document.querySelector('#addressBtn')
        btn.innerHTML = "Add Data"
    }
}


function appendLive(user) {

    const table = document.querySelector('table') || null
    if (!table) {
        newDataInsert(user)
        return
    }



    const city = document.querySelector('#city')
    const country = document.querySelector('#country')
    const pincode = document.querySelector('#pincode')


    city.value = ''
    country.value = ''
    pincode.value = ''


    const tbody = document.querySelector('#userbody')

    const tr_body = document.createElement('tr')
    tr_body.setAttribute('id', user._id)

    for (let key of Object.keys(user)) {
        if (key === '_id' || key === 'uid' || key === '__v') continue
        const td = document.createElement('td')
        if (key !== 'Password') {
            td.innerHTML = user[key]
        } else {
            td.innerHTML = '*'.repeat(user[key].length)
        }
        tr_body.appendChild(td)
    }
    
    const td = document.createElement('td')
    
    
    const deleteButton = document.createElement('button')
    deleteButton.style.background = 'red'
    deleteButton.style.color = 'white'
    deleteButton.innerHTML = 'Delete'
    
    td.appendChild(deleteButton)
    tr_body.appendChild(td)

    tbody.appendChild(tr_body)


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



// function errorHandler(msg) {
//     while (error.firstChild) {
//         error.removeChild(error.firstChild)
//     }

//     error.style.display = 'block'

//     const p = document.createElement('p')
//     p.innerHTML = msg

//     error.appendChild(p)

//     setTimeout(() => {
//         error.style.display = 'none'

//     }, 1000)

// }



function newDataInsert(user) {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')

    tbody.setAttribute('id', 'userbody')

    const tr = document.createElement('tr')


    const headings = [
        'Full Name', 'Email', 'Password', 'Phone No', 'Gender',
        'Language', 'Profession', 'City', 'Country', 'Pincode',
        // 'Delete'
    ]

    headings.forEach(heading => {
        const th = document.createElement('th')
        th.innerText = heading
        tr.appendChild(th)
    })



    thead.appendChild(tr)

    table.appendChild(thead)

    const tr_body = document.createElement('tr')
    tr_body.setAttribute('id', user._id)


    for (let key of Object.keys(user)) {
        if (key === '_id' || key === 'uid' || key === '__v') continue
        const td = document.createElement('td')
        if (key !== 'Password') {
            td.innerHTML = user[key]
        } else {
            td.innerHTML = '*'.repeat(user[key].length)
        }
        tr_body.appendChild(td)
    }


    tr_body.addEventListener('click', () => {
        listClickHandler(user, idx)
    })

    tbody.appendChild(tr_body)



    table.appendChild(tbody)


    userData.appendChild(table)

}






