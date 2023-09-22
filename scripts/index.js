fetch('/scripts/info.json')
  .then(res => res.json())
  .then(infos => {
    console.log(infos)

    // querySelectors
    const canvas = document.querySelector('#canvas')

    // canvas configuration
    canvas.height = '1200'
    canvas.width = '800'
    const context = canvas.getContext('2d')

    // constants
    const pinWidth = 30
    const pinHeight = 50
    
    // functions call
    mapBackground()

    // Functions
    function mapBackground () {
      const bg = new window.Image()
      bg.src = '../assets/map/map.png'
      bg.onload = function () {
        context.drawImage(bg, 0, 0)
      }
    }

    function pin (x, y, resizeHeight, resizeWidth) {
      y = y - resizeWidth
      x = x - resizeHeight / 2
      const pinImage = new window.Image()
      pinImage.src = '../assets/pin.png'
      pinImage.onload = function () {
        setTimeout(() => {
          context.drawImage(pinImage, 0, 0, pinImage.width, pinImage.height, x, y, resizeWidth, resizeHeight)
        }, 700)
      }
    }
  })
