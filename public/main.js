let imageURL = []

const main = () => {
  getNasaImage()
  getLauchDetail()
}

const getNasaImage = () => {
  fetch(`https://sdg-astro-api.herokuapp.com/api/Nasa/apod`).then((resp) => resp.json()).then((image) => {
    console.log(image)
    imageURL = image.url
    console.log(imageURL)
    let hero = document.querySelector('.hero-image')
    console.log(hero)
    hero.style.background = " url('" + `${imageURL}` + "') "
  })
}

const getLauchDetail = () => {
  fetch(`https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming`)
    .then((resp) => resp.json())
    .then((image) => console.log(image))
}

document.addEventListener('DOMContentLoaded', main)
