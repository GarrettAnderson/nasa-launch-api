const main = () => {
  getNasaImage()
  getLauchDetail()
}

const getNasaImage = () => {
  fetch(`https://sdg-astro-api.herokuapp.com/api/Nasa/apod`)
    .then((resp) => resp.json())
    .then((image) => console.log(image))
}

const getLauchDetail = () => {
  fetch(`https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming`)
    .then((resp) => resp.json())
    .then((image) => console.log(image))
}

document.addEventListener('DOMContentLoaded', main)
