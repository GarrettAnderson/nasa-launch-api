let imageObj = []

const main = () => {
  getNasaImage()
  getLauchDetail()
}

const getNasaImage = () => {
  fetch(`https://sdg-astro-api.herokuapp.com/api/Nasa/apod`).then((resp) => resp.json()).then((image) => {
    console.log(image)
    imageObj = image
    console.log(imageObj)
    let hero = document.querySelector('.hero-image')
    console.log(hero)
    hero.style.background = " url('" + `${imageObj.url}` + "') "
    document.querySelector('.image-title').textContent = imageObj.title
    let copyright = imageObj.copyright
    if (copyright != null) {
      document.querySelector('.image-copyright').textContent = imageObj.copyright
    } else {
      document.querySelector('.image-copyright').textContent = 'No Copyright'
    }
  })
}

const getLauchDetail = () => {
  fetch(`https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming`)
    .then((resp) => resp.json())
    .then((image) => console.log(image))
}

document.addEventListener('DOMContentLoaded', main)
