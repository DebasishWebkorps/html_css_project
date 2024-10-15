const array = [
    {
        id: 1,
        src: "https://m.media-amazon.com/images/I/713n+TxyfCL._AC_UL480_FMwebp_QL65_.jpg",
        size: 'Small',
        category: 'Shirts',
        Name: "tshirt_1"
    },
    {
        id: 2,
        src: "https://m.media-amazon.com/images/I/712XTTg1j6L._AC_UL480_FMwebp_QL65_.jpg",
        size: 'Medium',
        category: 'Shirts',
        Name: "tshirt_2"
    },
    {
        id: 3,
        src: "https://m.media-amazon.com/images/I/71rjzNln29L._AC_UL480_FMwebp_QL65_.jpg",
        size: 'Small',
        category: 'Shirts',
        Name: "tshirt_3"
    },
    {
        id: 4,
        src: "https://m.media-amazon.com/images/I/61JizrHuLIL._AC_UL480_FMwebp_QL65_.jpg",
        size: 'Large',
        category: 'Shirts',
        Name: "tshirt_4"
    },
    {
        id: 5,
        src: "https://m.media-amazon.com/images/I/71DNOWgs62L._AC_UL480_FMwebp_QL65_.jpg",
        size: 'Medium',
        category: 'Shirts',
        Name: "tshirt_5"
    },
    {
        id: 6,
        src: "https://m.media-amazon.com/images/I/71SPhfeKRmL._AC_UL480_FMwebp_QL65_.jpg",
        size: 'Large',
        category: 'Shirts',
        Name: "tshirt_6"
    },
    {
        id: 7,
        src: "https://m.media-amazon.com/images/I/51-mD4zzE-L._AC_UL480_FMwebp_QL65_.jpg",
        size: 'Medium',
        category: 'Jeans',
        Name: "jeans_1"
    },
    {
        id: 8,
        src: "https://m.media-amazon.com/images/I/61-n3zi0ldL._AC_UL480_FMwebp_QL65_.jpg",
        size: 'Large',
        category: 'Jeans',
        Name: "jeans_2"
    },
    {
        id: 9,
        src: "https://m.media-amazon.com/images/I/61sT3P1473L._AC_UL480_FMwebp_QL65_.jpg",
        size: 'Small',
        category: 'Jeans',
        Name: "jeans_3"
    },
    {
        id: 10,
        src: "https://m.media-amazon.com/images/I/51sGSGpOWSL._AC_UL480_FMwebp_QL65_.jpg",
        size: 'Medium',
        category: 'Jeans',
        Name: "jeans_4"
    }, {
        id: 11,
        src: "https://m.media-amazon.com/images/I/510pXlXF5qL._AC_UL480_FMwebp_QL65_.jpg",
        size: 'Small',
        category: 'Jeans',
        Name: "jeans_5"
    }, {
        id: 12,
        src: "https://m.media-amazon.com/images/I/61rsNDlTPiL._AC_UL480_FMwebp_QL65_.jpg",
        size: 'Large',
        category: 'Jeans',
        Name: "jeans_6"
    },
]

const content = document.querySelector('.content')
const totalResults = document.querySelector('#totalResults')


const filterObj = {
    types: {
        Jeans: false,
        Shirts: false
    },
    sizes: {
        Small: false,
        Medium: false,
        Large: false
    }
}

const cardCreator = (data) => {
    const div = document.createElement('div')
    div.setAttribute('class', 'card')

    const img = document.createElement('img')
    img.src = data.src

    const h4 = document.createElement('h4')
    h4.innerHTML = data.Name
    h4.style.textAlign = 'center'

    const p = document.createElement('p')
    p.innerHTML = data.size[0]

    div.appendChild(img)
    div.appendChild(h4)
    div.appendChild(p)
    content.appendChild(div)
}

const showAllData = () => {
    array.map((data, index) => {
        cardCreator(data)
    })

    totalResults.innerHTML = array.length
}


window.addEventListener('DOMContentLoaded', () => {


    showAllData()

})


const filterHandler = (event) => {
    const filterValue = event.target.value

    if (filterObj.types.hasOwnProperty(filterValue)) {
        filterObj.types[filterValue] = !filterObj.types[filterValue]
    }

    if (filterObj.sizes.hasOwnProperty(filterValue)) {
        filterObj.sizes[filterValue] = !filterObj.sizes[filterValue]
    }

    getData(filterObj)

}


function getData(obj) {

    while (content.firstChild) {
        content.removeChild(content.firstChild)
    }

    let types = Object.values(filterObj.types)
    let sizes = Object.values(filterObj.sizes)

    let isType = types.includes(true)
    let isSizes = sizes.includes(true)


    let filteredArray;


    if (isType && isSizes) {
        filteredArray = array.filter(data => obj.sizes[data.size] && obj.types[data.category])
    } else if (isType && !isSizes) {
        filteredArray = array.filter(data => obj.types[data.category] === true)
    } else if (isSizes && !isType) {
        filteredArray = array.filter(data => obj.sizes[data.size] === true)
    }else{
        showAllData()
        return
    }

    filteredArray.map(data => {
        cardCreator(data)
    })

    totalResults.innerHTML = filteredArray.length


}


function clearFilter() {

    const checks = document.querySelectorAll('input')
    checks.forEach(check => {
        if (check.checked) check.checked = false
    })

    while (content.firstChild) {
        content.removeChild(content.firstChild)
    }

    showAllData()

}


