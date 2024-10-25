const file = document.querySelector('#inputFile')
const form = document.querySelector('form')
const button = document.querySelector('button')
const content = document.querySelector('.content')


form.addEventListener('submit', (event) => {
    event.preventDefault()

    withoutMulter()
    // usingFormDataButWithoutMulter()




    // uploadImage()
    // return
})

// async function usingFormDataButWithoutMulter() {
//     var data = new FormData()
//     // data.append('name', file.files[0].name)
//     // data.append('image', file.files[0])
//     data.append('filetoupload', file.files[0])

//     try {
//         const response = await fetch('http://www.localhost:3000/upload', {
//             method: 'POST',
//             body: data
//             // body: JSON.stringify(data)
//         })
//     }catch(err){
//         console.log(err.message)
//     }
// }

async function withoutMulter() {
    button.innerHTML = 'uploading';
    button.disabled = true;
    const reader = new FileReader();
    const data = file.files[0];
    
    if (!data) {
        console.error("No file selected.");
        button.innerHTML = 'upload';
        button.disabled = false;
        return;
    }

    reader.readAsDataURL(data);

    reader.onload = async function (e) {
        const fileContent = e.target.result; 

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: fileContent
                }),
            });

            const responseData = await response.json();
            if (response.ok) {
                const div = document.createElement('div');
                div.setAttribute('class', 'card');

                const img = document.createElement('img');
                img.src = responseData.imageUrl; 

                div.appendChild(img);
                content.appendChild(div); 
                // document.body.appendChild(div); 
            
            } else {
                console.error("Upload failed:");
            }
        } catch (err) {
            console.log("Error:", err.message);
        } finally {
            button.innerHTML = 'upload';
            button.disabled = false;
        }
    };
}


// async function uploadImage() {
//     button.innerHTML = 'uploading'
//     button.disabled = true
//     var data = new FormData()
//     // data.append('name', file.files[0].name)
//     // data.append('image', file.files[0])
//     data.append('filetoupload', file.files[0])

//     try {
//         const response = await fetch('http://www.localhost:3000/upload', {
//             method: 'POST',
//             body: data
//             // body: JSON.stringify(data)
//         })
//         const responseData = await response.json()
//         if (response.ok) {

//             const div = document.createElement('div')
//             div.setAttribute('class', 'card')

//             const img = document.createElement('img')
//             img.src = responseData.imageUrl

//             div.appendChild(img)
//             content.appendChild(div)
//         }
//     } catch (err) {
//         console.log(err.message)
//     } finally {
//         button.innerHTML = 'upload'
//         button.disabled = false
//     }

// }


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://www.localhost:3000/upload')
        const images = await response.json()

        images.forEach(image => {
            const div = document.createElement('div')
            div.setAttribute('class', 'card')

            const img = document.createElement('img')
            img.src = image.url

            div.appendChild(img)
            content.appendChild(div)


        });

    } catch (err) {
        console.log(err.message)
    }
})