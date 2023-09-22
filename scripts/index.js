// querySelectors
const canvas = document.querySelector('#canvas')

// canvas configuration

// canvas.height = '1200'
// canvas.width = '800'
const context = canvas.getContext('2d')

// constants
const pinWidth = 30
const pinHeight = 50

// display Map
mapBackground(context)

// Fetch the JSON file with the infos
fetch('/scripts/info.json')
  .then(res => res.json())
  .then(infos => {
    // functions calls
    infos.forEach((item) => {
      const xPinPos = item.map.x
      const yPinPos = item.map.y
      const timeOut = Math.floor(Math.random() * 15) * 100 + 200
      setTimeout(() => {
        pin(xPinPos, yPinPos, pinHeight, pinWidth, context)
      }, timeOut)
    })
    // Getting width of the window to calculate a responsive position on the map
    let canvasWidth = canvas.offsetWidth
    window.addEventListener('resize', (e) => {
      canvasWidth = canvas.offsetWidth
    })

    canvas.addEventListener('click', (e) => {
      const name = document.querySelector('#name')
      const city = document.querySelector('#city')
      const hobbies = document.querySelector('#hobbies')
      const stack = document.querySelector('#stack')
      const linkedin = document.querySelector('#linkedin')
      const picture = document.querySelector('#picture')
      const showInfos = document.querySelector('#show_infos')

      showInfos.style.visibility = 'hidden'

      const x = e.offsetX
      const y = e.offsetY
      infos.forEach(item => {
        const responsive = resizeClickZone(item.map.x, item.map.y, canvasWidth)
        const xPinPos = responsive.newXPos - responsive.newHeight / 2
        const yPinPos = responsive.newYPos - responsive.newWidth
        if (x >= xPinPos && x <= xPinPos + pinWidth && y >= yPinPos && y <= yPinPos + pinHeight) {
          // show the card and set position
          showInfos.style.visibility = 'visible'
          showInfos.style.left = e.clientX + 'px'
          showInfos.style.top = (e.clientY - 100) + 'px'

          name.textContent = item.name
          stack.textContent = item.stack
          linkedin.textContent = item.linkedin
          linkedin.href = item.linkedin
          hobbies.textContent = item.hobbies
          city.textContent = item.city
          picture.innerHTML = `<img src="${item.photo}" alt="${item.name}" />`
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

function resizeClickZone (xpinPos, ypinPos, canvasWidth) {
  const newXPos = Math.trunc(xpinPos * canvasWidth / 800)
  const newYPos = Math.trunc(ypinPos * canvasWidth / 800)
  const newHeight = Math.trunc(pinHeight * canvasWidth / 800)
  const newWidth = Math.trunc(pinWidth * canvasWidth / 800)

  return { newHeight, newWidth, newXPos, newYPos }
}
