// querySelectors
const canvas = document.querySelector('#canvas')

// canvas configuration
canvas.height = '1200'
canvas.width = '800'
const context = canvas.getContext('2d')

// constants
const pinWidth = 30
const pinHeight = 50
mapBackground(context)
fetch('/scripts/info.json')
  .then(res => res.json())
  .then(infos => {
    console.log(infos)

    // functions calls
    infos.forEach((item) => {
      const xPinPos = item.map.x
      const yPinPos = item.map.y
      pin(xPinPos, yPinPos, pinHeight, pinWidth, context)
    })

    canvas.addEventListener('click', (e) => {
      // const name = document.querySelector('#name')
      const x = e.offsetX
      const y = e.offsetY
      // console.log(name)
      infos.forEach(item => {
        const xPinPos = item.map.x - pinHeight / 2
        const yPinPos = item.map.y - pinWidth
        if (x >= xPinPos && x <= xPinPos + pinWidth && y >= yPinPos && y <= yPinPos + pinHeight) {
          console.log(item.name)
        }
      })
    })
  })

// Functions
function mapBackground (context) {
  const bg = new window.Image()
  bg.src = '../assets/map/map.png'
  bg.onload = function () {
    context.drawImage(bg, 0, 0)
  }
}

function pin (x, y, resizeHeight, resizeWidth, context) {
  y = y - resizeWidth
  x = x - resizeHeight / 2
  const pinImage = new window.Image()
  pinImage.src = '../assets/map/pin.png'
  pinImage.onload = function () {
    context.drawImage(pinImage, 0, 0, pinImage.width, pinImage.height, x, y, resizeWidth, resizeHeight)
    setTimeout(() => {
    }, 700)
  }
}