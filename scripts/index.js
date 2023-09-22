// querySelectors
const canvas = document.querySelector('#canvas')

// canvas configuration
canvas.height = '1200'
canvas.width = '800'
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
    const showinfos = document.querySelector('#show_infos')
    showinfos.style.visibility = 'hidden'

    // functions calls
    infos.forEach((item) => {
      const xPinPos = item.map.x
      const yPinPos = item.map.y
      pin(xPinPos, yPinPos, pinHeight, pinWidth, context)
    })

    canvas.addEventListener('click', (e) => {
      const name = document.querySelector('#name')
      const city = document.querySelector('#city')
      const hobbies = document.querySelector('#hobbies')
      const stack = document.querySelector('#stack')
      const linkedin = document.querySelector('#linkedin')
      const picture = document.querySelector('#picture')
      showinfos.style.visibility = 'visible'

      const x = e.offsetX
      const y = e.offsetY
      infos.forEach(item => {
        const xPinPos = item.map.x - pinHeight / 2
        const yPinPos = item.map.y - pinWidth
        if (x >= xPinPos && x <= xPinPos + pinWidth && y >= yPinPos && y <= yPinPos + pinHeight) {
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

    canvas.addEventListener('mouseover', (e) => {
      const x = e.offsetX
      const y = e.offsetY
      infos.forEach(item => {
        const xPinPos = item.map.x - pinHeight / 2
        const yPinPos = item.map.y - pinWidth
        if (x >= xPinPos && x <= xPinPos + pinWidth && y >= yPinPos && y <= yPinPos + pinHeight) {
          canvas.style.cursor = 'pointer'
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
