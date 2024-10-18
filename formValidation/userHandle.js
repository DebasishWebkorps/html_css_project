const regUser = document.querySelector('.regUser')
const userData = document.querySelector('.userData')


window.addEventListener('DOMContentLoaded', getData)





async function getData() {
    try {
        const user = localStorage.getItem('useremail')
        const response = await fetch('http://www.localhost:3000/', {
            headers: {
                userInfo: user
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
        'Language', 'Profession', 'City', 'Country', 'Pincode'
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


        tr_body.addEventListener('click', () => {
            listClickHandler(user, idx)
        })

        tbody.appendChild(tr_body)

    }


    table.appendChild(tbody)


    userData.appendChild(table)

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

