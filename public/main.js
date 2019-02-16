let imageObj = []
let shuttleLaunchDetails = []
let counter = 0

const main = () => {
  getNasaImage()
  getLaunchDetail()
}

const getNasaImage = () => {
  fetch(`https://sdg-astro-api.herokuapp.com/api/Nasa/apod`).then((resp) => resp.json()).then((image) => {
    console.log(image)
    imageObj = image
    console.log(imageObj)
    let hero = document.querySelector('.hero-image')
    console.log(hero)
    hero.style.backgroundImage = " url('" + `${imageObj.url}` + "') "
    document.querySelector('.image-title').textContent = imageObj.title
    let copyright = imageObj.copyright
    if (copyright != null) {
      document.querySelector('.image-copyright').textContent = imageObj.copyright
    } else {
      document.querySelector('.image-copyright').textContent = 'No Copyright'
    }
  })
}

const getLaunchDetail = () => {
  fetch(`https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming`)
    .then((resp) => resp.json())
    .then((shuttleData) => {
      console.log(shuttleData)
      shuttleLaunchDetails = shuttleData
      console.log(shuttleLaunchDetails)
      console.log(shuttleLaunchDetails[counter])
      // displayLaunchData()
      document.querySelector('.shuttle-name').textContent = shuttleLaunchDetails[counter].mission_name
      document.querySelector('.launch-description').textContent = shuttleLaunchDetails[counter].details
      document.querySelector('.launch-countdown').textContent = shuttleLaunchDetails[counter].launch_date_utc
      document.querySelector('.launch-location').textContent = shuttleLaunchDetails[counter].launch_site.site_name_long
      console.log(shuttleLaunchDetails[counter])
      // nextLaunchDetail()
    })
}
const displayLaunchData = () => {
  // for (let i = 0; i <= shuttleLaunchDetails.length; i++) {
  if (counter > 0 || counter < 18) {
    return shuttleLaunchDetails[counter]
    console.log(shuttleLaunchDetails[counter])
  } else {
    counter = 0
    // }
  }
}
const nextLaunchDetail = () => {
  counter = counter + 1
  displayLaunchData()
  // return shuttleLaunchDetails[counter]
  // displayLaunchData()
  getLaunchDetail()
  return shuttleLaunchDetails[counter]
}

const previousLaunchDetail = () => {
  counter = counter - 1
  // return shuttleLaunchDetails[counter]
  // displayLaunchData()
  getLaunchDetail()
  return shuttleLaunchDetails[counter]
}

// attach an if else statement to reset i to 0 in order to display the first element of the array when loop completely through
// for (let i = 0; i < shuttleLaunchDetails.length; i++) {
//   if (i <= 18) {
//     i = 0
//   } else {
//     i++
//     return shuttleLaunchDetails[i]
//   }
// }
// }

// const previousLaunchDetail = () => {
//   // attach an if else statement to reset i to 0 in order to display the first element of the array when loop completely through
//   i = 18
//   document.querySelector('.shuttle-name').textContent = shuttleLaunchDetails[i].mission_name
//   document.querySelector('.launch-description').textContent = shuttleLaunchDetails[i].details
//   document.querySelector('.launch-countdown').textContent = shuttleLaunchDetails[i].launch_date_utc
//   document.querySelector('.launch-location').textContent = shuttleLaunchDetails[i].launch_site.site_name_long
// }

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.next-launch').addEventListener('click', nextLaunchDetail)
document.querySelector('.previous-launch').addEventListener('click', previousLaunchDetail)
