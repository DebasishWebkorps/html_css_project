const regUser = document.querySelector('.regUser')
const userData = document.querySelector('.userData')


window.addEventListener('DOMContentLoaded', getData)





async function getData() {
    try {
        const token = localStorage.getItem('userToken')
        // const user = localStorage.getItem('useremail')
        const response = await fetch('http://www.localhost:3000/', {
            headers: {
                userInfo: token
            }
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message)
        if (data.length < 1) {
            regUser.innerHTML = 'Empty User Data'
            return
        }
        listUsers(data)
    } catch (err) {
        if (err.message === 'Invalid Token') {
            window.location.href = "http://127.0.0.1:5500/formValidation/login.html"
        }
        regUser.innerHTML = 'Empty User Data'
        console.log('some error occured', err.message)
    }
}



function listUsers(data) {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')

    tbody.setAttribute('id', 'userbody')

    const tr = document.createElement('tr')


    const headings = [
        'Full Name', 'Email', 'Password', 'Phone No', 'Gender',
        'Language', 'Profession', 'City', 'Country', 'Pincode',
        'Delete'
    ]

    headings.forEach(heading => {
        const th = document.createElement('th')
        th.innerText = heading
        tr.appendChild(th)
    })




    thead.appendChild(tr)

    table.appendChild(thead)

    data.forEach((user, idx) => {
        addNewUser(user, idx)
    });

    function addNewUser(user, idx) {
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

        const delbutton = document.createElement('button')
        delbutton.style.background = 'red'
        delbutton.style.color = 'white'
        delbutton.innerHTML = 'Delete'
        tr_body.appendChild(delbutton)

        delbutton.addEventListener('click', (event) => {
            event.stopPropagation()
            deleteHandler(user._id, idx)
        })


        tr_body.addEventListener('click', () => {
            listClickHandler(user, idx)
        })

        tbody.appendChild(tr_body)

    }


    table.appendChild(tbody)


    userData.appendChild(table)

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

async function deleteHandler(id, idx) {
    const isAllowed = await isValidUser()
    if (isAllowed) {



        localStorage.setItem('deleteRow', idx)
        const isDelete = confirm('Are you sure to delete it ?')
        if (isDelete) {
            try {
                const user = localStorage.getItem('useremail')
                const response = await fetch('http://www.localhost:3000/', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        formId: id
                    }
                })
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }

                alert(data.message)
                localStorage.removeItem('deleteRow')
                // appendLive(data.formData)
                removeLive()

            } catch (err) {
                // console.error(err.message)

                if (err.message !== 'data is not defined') {
                    alert('Some error occured')
                }
                // alert('Some Error Occured')
            }
        }
    }

}


function removeLive() {
    const removeRow = +localStorage.getItem('deleteRow') + 1

    const allRow = document.querySelectorAll('tr')

    allRow.forEach((row, idx) => {
        if (idx === removeRow) {
            row.remove()
        }
    })

}



function listClickHandler(data, idx) {
    // console.log(data)

    localStorage.setItem('data', JSON.stringify(data))
    localStorage.setItem('row', idx)

    const btn = document.querySelector('#signupBtn')
    btn.innerHTML = 'Update'



    const nameText = document.querySelector('#nameId')
    const email = document.querySelector('#emailId')
    const password = document.querySelector('#pwId')
    const phoneno = document.querySelector('#phnoId')
    const gender = document.querySelectorAll('input[name="gender"]')
    const language = document.querySelectorAll('input[name="language"]')
    const profession = document.querySelector('#professionId')

    nameText.value = data.Fullname
    email.value = data.Email
    password.value = data.Password
    phoneno.value = data.PhoneNo
    profession.value = data.Profession

    gender.forEach(item => {
        if (item.value === data.Gender) {
            item.checked = true
        } else {
            item.checked = false
        }
    })



    language.forEach(item => {
        if (data.Language.includes(item.value)) {
            item.checked = true
        } else {
            item.checked = false
        }
    })


}

