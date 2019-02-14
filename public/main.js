const main = () => {
  if (document.querySelector('h1.hello-world')) {
    document.querySelector('h1.hello-world').textContent = 'Hello, World!'
  }
}

const getNasaImage = () => {
  fetch(`https://sdg-astro-api.herokuapp.com/api/Nasa/apod`)
    .then((resp) => resp.json())
    // {
    //   return resp.json()
    // })
    .then((image) => {
      console.log(image)
    })
}

document.addEventListener('DOMContentLoaded', main)
