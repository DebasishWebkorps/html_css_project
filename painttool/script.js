const selectedTool = document.querySelector('.status')
const brush = document.querySelector('.brush')
const bgcolor = document.querySelector('.bgcolor')
const bgColorPicker = document.querySelector('.bgcolor input[type="color"]')
const brushColorPicker = document.querySelector('.brush input[type="color"]')
const eraser = document.querySelector('.bi-eraser-fill')
const clear = document.querySelector('.bi-arrow-clockwise')
const brushColorText = document.querySelector('.brushColorText')
const bgcolorText = document.querySelector('.bgcolorText')
const save = document.querySelector('.bi-save')
const localsave = document.querySelector('.bi-cloud-arrow-down-fill')
const localupload = document.querySelector('.bi-cloud-arrow-up-fill')
const deleteStorage = document.querySelector('.bi-trash')

const rangeValueText = document.querySelector('.range h2')
const range = document.querySelector('.range input[type="range"]')

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')



document.addEventListener('mousedown', startDrawing)
document.addEventListener('mouseup', stopDrawing)
document.addEventListener('mousemove', painting)

let canvasProperties = {
    color: '#000000',
    bgcolor: '#FFFFFF',
    coord: {
        x: 0,
        y: 0
    },
    isPaint: false,
    linewidth: 5
}

deleteStorage.addEventListener('click', () => {
    localStorage.removeItem('canvasImage')

    const tool = selectedTool.innerHTML

    selectedTool.innerHTML = `Storage Cleared`
    setTimeout(() => {
        selectedTool.innerHTML = tool
    }, 1000)
})

localsave.addEventListener('click', () => {
    localStorage.setItem('canvasImage', canvas.toDataURL())
    
})

localupload.addEventListener('click', () => {
    const data = localStorage.getItem('canvasImage')
    const img = new Image()
    img.src = data
    img.onload = function () {
        ctx.drawImage(img, 0, 0)
    }

})



save.addEventListener('click', () => {
    let dataURL = canvas.toDataURL("image/jpeg");

    let link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas_image.png";
    link.click();

    const tool = selectedTool.innerHTML

    selectedTool.innerHTML = `Saved`
    setTimeout(() => {
        selectedTool.innerHTML = tool
    }, 1000)
})

range.addEventListener('input', (event) => {
    canvasProperties.linewidth = event.target.value
    rangeValueText.innerHTML = canvasProperties.linewidth
})


bgcolor.addEventListener('input', (event) => {
    const prevColor = canvasProperties.bgcolor

    canvasProperties.bgcolor = event.target.value;
    bgcolorText.innerHTML = canvasProperties.bgcolor;
    bgcolorText.style.color = canvasProperties.bgcolor
    bgcolorText.style.textTransform = 'uppercase';

    canvas.style.backgroundColor = canvasProperties.bgcolor;

    const tool = selectedTool.innerHTML
    const latestColor = canvasProperties.bgcolor

    selectedTool.innerHTML = `Background Color changed from ${prevColor.toUpperCase()} to ${latestColor.toUpperCase()}`
    setTimeout(() => {
        selectedTool.innerHTML = tool
    }, 1000)
})


eraser.addEventListener('click', () => {
    canvasProperties.color = canvasProperties.bgcolor;
    selectedTool.innerHTML = 'Eraser'
})

window.addEventListener('DOMContentLoaded', () => {
    canvasResize()
    bgColorPicker.value = canvasProperties.bgcolor;
    bgcolorText.innerHTML = canvasProperties.bgcolor;
    bgcolorText.style.color = canvasProperties.bgcolor
    bgcolorText.style.textTransform = 'uppercase';

    range.value = canvasProperties.linewidth
    rangeValueText.innerHTML = canvasProperties.linewidth
    brushColorText.innerHTML = canvasProperties.color;
    brushColorText.style.color = canvasProperties.color

})

brushColorPicker.addEventListener('input', (event) => {
    const prevColor = canvasProperties.color

    canvasProperties.color = event.target.value;
    brushColorText.innerHTML = canvasProperties.color;
    brushColorText.style.color = canvasProperties.color
    brushColorText.style.textTransform = 'uppercase';

    const tool = selectedTool.innerHTML
    const latestColor = canvasProperties.color

    selectedTool.innerHTML = `Brush Color changed from ${prevColor.toUpperCase()} to ${latestColor.toUpperCase()}`
    setTimeout(() => {
        selectedTool.innerHTML = tool
    }, 1000)
})


brush.addEventListener('click', () => {
    selectedTool.innerHTML = 'Brush'
    canvasProperties.color = brushColorPicker.value;

})

clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const tool = selectedTool.innerHTML
    selectedTool.innerHTML = 'Cleared'
    setTimeout(() => {
        selectedTool.innerHTML = tool
    }, 1000)
})


function canvasResize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    canvas.style.backgroundColor = canvasProperties.bgcolor;

}





function startDrawing(event) {
    canvasProperties.isPaint = true
    getPosition(event)
}

function stopDrawing() {
    canvasProperties.isPaint = false
}


function getPosition(event) {
    canvasProperties.coord.x = event.clientX - canvas.offsetLeft;
    canvasProperties.coord.y = event.clientY - canvas.offsetTop;
}


function painting(event) {

    if (!canvasProperties.isPaint) return

    ctx.beginPath();

    ctx.lineWidth = canvasProperties.linewidth;

    // ctx.lineCap = 'square';
    ctx.lineCap = 'round';

    ctx.strokeStyle = canvasProperties.color;

    ctx.moveTo(canvasProperties.coord.x, canvasProperties.coord.y);

    getPosition(event);

    ctx.lineTo(canvasProperties.coord.x, canvasProperties.coord.y);

    ctx.stroke();

}