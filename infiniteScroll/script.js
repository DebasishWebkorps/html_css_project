const add = document.getElementById('add')

let loading = false

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100 && !loading) {
        loading = true
        getData()
    }
})
function createLoading() {
    const h1 = document.createElement('h1')
    h1.className = 'loading'
    h1.innerText = 'Loading...'
    h1.style.margin = "1rem"

    add.appendChild(h1)
}

function fakestore(d) {
    const div = document.createElement('div')

    const h1 = document.createElement('h1')
    h1.style.textAlign = 'center'

    const image = document.createElement('img')
    image.style.width = '400px'
    image.style.padding = '10px'
    image.src = d.image

    const p = document.createElement('p')
    p.style.textAlign = 'center'


    div.style.border = '1px solid black'

    div.appendChild(h1)
    div.appendChild(image)
    div.appendChild(p)


    add.appendChild(div)
}

function unsplash(data) {

}

async function getData() {

    try {

        const response = await fetch(`https://fakestoreapi.com/products?limit=2`)
        // const response = await fetch('https://api.unsplash.com/photos/random?client_id=cN4O3yeawrbpI7nGIoxaHyK7K7Qa-dzIR0G8CaitPBw')
        const data = await response.json()
        loading = false
        data.map(d => {
            fakestore(d)

        })
        return data
    } catch (err) {
        console.log(err.message)
    } finally {

    }

}


window.addEventListener('DOMContentLoaded', () => {
    getData()
})
