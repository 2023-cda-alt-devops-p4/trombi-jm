// querySelectors
const canvas = document.querySelector('#canvas')
const name = document.querySelector('#name')
const city = document.querySelector('#city')
const hobbies = document.querySelector('#hobbies')
const stack = document.querySelector('#stack')
const linkedin = document.querySelector('#linkedin')
const github = document.querySelector('#github')
const picture = document.querySelector('#picture')
const showInfos = document.querySelector('#show_infos')
const closeButton = document.querySelector('#close_button')

// canvas configuration
const context = canvas.getContext('2d')

// constants
const pinWidth = 30
const pinHeight = 50

// display Map
mapBackground(context)

// Fetch the JSON file with the infos
fetch('scripts/info.json')
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

    showInfos.style.visibility = 'hidden'
    // Listen when clicking on the canvas
    canvas.addEventListener('click', (e) => {
      const x = e.offsetX
      const y = e.offsetY
      infos.forEach(item => {
        const responsive = resizeClickZone(item.map.x, item.map.y, canvasWidth)
        const xPinPos = responsive.newXPos - responsive.newHeight / 2
        const yPinPos = responsive.newYPos - responsive.newWidth
        if (x >= xPinPos && x <= xPinPos + pinWidth && y >= yPinPos && y <= yPinPos + pinHeight) {
          // show the card and set position in desktop mode
          showInfos.classList.remove('infos_closed')
          showInfos.style.visibility = 'visible'

          // Activate close button
          closeButton.addEventListener('click', (e) => {
            showInfos.classList.add('infos_closed')
            setTimeout(() => {
              showInfos.style.visibility = 'hidden'
            }, 500)
          })
          // Set infos from the Json file to the DOM
          name.textContent = item.name
          stack.textContent = item.stack
          linkedin.href = item.link.linkedin
          github.href = item.link.github
          hobbies.textContent = item.hobbies
          city.textContent = item.city
          picture.innerHTML = `<img src="${item.photo}" alt="${item.name}" />`
        }
      })
    })
  }).catch(err => console.log(err))

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
