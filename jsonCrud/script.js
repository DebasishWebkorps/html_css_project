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


addform.addEventListener('submit', async (event) => {
    event.preventDefault()
     addPostHandler()
}
)

async function addPostHandler() {
    const posttitle = document.getElementById('posttitle')
    const title = posttitle.value.trim()
    if (!title) {
        alert('Write Something')
        return
    }
    try {
        const response = await fetch(`http://localhost:3000/posts`, {
            method: 'POST',
            body: JSON.stringify({
                title
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        if (data) {
            createPost(data)
            overlayView.classList.toggle('hide')
        } else {
            throw new Error('some error occured')
        }

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
        const data = await response.json()
        const targetElement = document.querySelector(`li[id="${data.id}"]`);
        const textElement = targetElement.querySelector('h4')
        textElement.innerHTML = data.title
        overlayEditView.classList.toggle('hide')
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
    // const postName = document.createTextNode(data.title)
    h4.innerHTML = data.title
    // h4.appendChild(postName)

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
        const id = event.target.getAttribute('id')
        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'DELETE'
            }

            )
            const data = await response.json()
            if (data) {
                const delElement = document.querySelector(`li[id="${data.id}"]`)
                allPosts.removeChild(delElement)
            } else {
                throw new Error('Some error occured')
            }
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
    if (event.target.closest('.addForm') !== null) return;
    overlayView.classList.toggle('hide')
})

overlayEditView.addEventListener('click', (event) => {
    if (event.target.closest('.editForm') !== null) return;
    overlayEditView.classList.toggle('hide')
})


