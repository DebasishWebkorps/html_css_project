const user = document.querySelector('.user')
const allPosts = document.querySelector('.allPosts')
const overlayView = document.querySelector('.overlayView')
const overlayEditView = document.querySelector('.overlayEditView')
const content = document.querySelector('.content')
const addPost = document.querySelector('.addPost')
const posttitle = document.getElementById('editposttitle')
const addform = document.querySelector('.addForm')
const editform = document.querySelector('.editForm')

function cancelHandler(e) {
    e.stopPropagation()
    overlayView.classList.toggle('hide')
}

async function addPostHandler(event) {
    event.preventDefault()
    const posttitle = document.getElementById('posttitle')
    const title = posttitle.value
    if (!title) {
        alert('Write Something')
        return
    }
    try {
        const response = await fetch(`http://localhost:3000/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title
            })
        })
        // const data = await response.json()

    } catch (err) {
        console.log(err.message)
    }
}

async function editPostHandler(event) {
    event.preventDefault()
    const id = posttitle.getAttribute('id')
    const updatedTitle = posttitle.value
    try {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: updatedTitle
            })
        })
        // const data = await response.json()

    } catch (err) {
        console.log(err.message)
    }

}

const getUser = async () => {
    const response = await fetch('http://localhost:3000/profile')
    const data = await response.json()
    const { name } = data
    user.innerHTML = name
}

const createPost = (data) => {
    const li = document.createElement('li')

    const h4 = document.createElement('h4')
    const postName = document.createTextNode(data.title)
    h4.appendChild(postName)

    li.setAttribute('id', data.id)

    const editbutton = document.createElement('button')
    editbutton.setAttribute('id', data.id)
    editbutton.innerHTML = "Edit"

    const div = document.createElement('div')
    div.style.display = 'flex'
    div.style.gap = '10px'


    const delbutton = document.createElement('button')
    delbutton.setAttribute('id', data.id)
    delbutton.innerHTML = "Delete"


    div.appendChild(editbutton)
    div.appendChild(delbutton)

    li.appendChild(h4)
    li.appendChild(div)
    allPosts.appendChild(li)

    editbutton.addEventListener('click', (event) => {
        editPost(event.target.getAttribute('id'))
    })

    delbutton.addEventListener('click', async (event) => {
        event.stopPropagation();
        const id = event.target.getAttribute('id')
        // overlayView.classList.toggle('hide')

        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'DELETE'
            }

            )
            const data = await response.json()
        } catch (err) {
            console.log(err.message)
        }
    }
    )

}


async function editPost(id) {
    overlayEditView.classList.toggle('hide')
    try {
        const response = await fetch(`http://localhost:3000/posts/${id}`)
        const data = await response.json()

        posttitle.value = data.title
        posttitle.setAttribute('id', id)



    } catch (err) {
        console.error(err.message)
    }
}

addPost.addEventListener('click', () => {
    overlayView.classList.toggle('hide')
})


async function getAllPosts() {
    const response = await fetch('http://localhost:3000/posts')
    const data = await response.json()
    data.forEach(element => {
        createPost(element)
    });
}



window.addEventListener('DOMContentLoaded', (event) => {
    getUser()
    getAllPosts()
})

overlayView.addEventListener('click', (event) => {
    overlayView.classList.toggle('hide')
})

overlayEditView.addEventListener('click', (event) => {
    overlayEditView.classList.toggle('hide')
})

addform.addEventListener('click', (event) => {
    event.stopPropagation();
})

editform.addEventListener('click', (event) => {
    event.stopPropagation();
})

