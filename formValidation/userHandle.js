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
        console.log('some error occured')
    }
}



function listUsers(data) {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')

    tbody.setAttribute('id', 'userbody')

    const tr = document.createElement('tr')
    const th_1 = document.createElement('th')
    const th_2 = document.createElement('th')
    const th_3 = document.createElement('th')
    const th_4 = document.createElement('th')
    const th_5 = document.createElement('th')
    const th_6 = document.createElement('th')
    const th_7 = document.createElement('th')
    const th_8 = document.createElement('th')
    const th_9 = document.createElement('th')
    const th_10 = document.createElement('th')

    th_1.innerHTML = 'Full Name'
    th_2.innerHTML = 'Email'
    th_3.innerHTML = 'Password'
    th_4.innerHTML = 'Phone No'
    th_5.innerHTML = 'Gender'
    th_6.innerHTML = 'Language'
    th_7.innerHTML = 'Profession'
    th_8.innerHTML = 'City'
    th_9.innerHTML = 'Country'
    th_10.innerHTML = 'Pincode'

    tr.appendChild(th_1)
    tr.appendChild(th_2)
    tr.appendChild(th_3)
    tr.appendChild(th_4)
    tr.appendChild(th_5)
    tr.appendChild(th_6)
    tr.appendChild(th_7)
    tr.appendChild(th_8)
    tr.appendChild(th_9)
    tr.appendChild(th_10)

    thead.appendChild(tr)

    table.appendChild(thead)





    data.forEach(user => {
        addNewUser(user)
    });

    function addNewUser(user) {
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

        tr_body.addEventListener('click', () => {
            listClickHandler(user)
        })

        tbody.appendChild(tr_body)

    }


    table.appendChild(tbody)


    userData.appendChild(table)

}



function listClickHandler(data) {
    // console.log(data)

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
        }else{
            item.checked = false
        }
    })



    language.forEach(item => {
        if (data.Language.includes(item.value)) {
            item.checked = true
        }else{
            item.checked = false
        }
    })


}

