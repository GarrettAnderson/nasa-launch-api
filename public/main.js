let imageObj = []
let shuttleLaunchDetails = []
let counter = 0
let launchDate = []

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
      // document.querySelector('.days').textContent = days + ' days'
      // document.querySelector('.launch-countdown').textContent = shuttleLaunchDetails[counter].launch_date_utc
      document.querySelector('.launch-location').textContent = shuttleLaunchDetails[counter].launch_site.site_name_long
      console.log(shuttleLaunchDetails[counter])
      let details = shuttleData.details
      launchDate = shuttleLaunchDetails[counter].launch_date_utc.toString()
      if (details != null) {
        document.querySelector('.launch-description').textContent = shuttleLaunchDetails[counter].details
      } else {
        document.querySelector('.launch-description').textContent = 'No description available yet.'
      }

      // launchCountdown(launchDate)
      // nextLaunchDetail()
    })
}

// Set countdown
const launchCountdown = (endDate) => {
  let days, hours, minutes, seconds

  // endDate = launchDate
  endDate = new Date(launchDate)

  // new Date(endDate).getTime()
  console.log({ endDate })
  if (isNaN(endDate)) {
    return
  }

  const calculate = () => {
    console.log({ endDate })
    let startDate = new Date()
    startDate = startDate.getTime()

    let timeRemaining = parseInt((endDate - startDate) / 1000)
    console.log({ timeRemaining })

    if (timeRemaining >= 0) {
      days = parseInt(timeRemaining / 86400)
      timeRemaining = timeRemaining % 86400

      hours = parseInt(timeRemaining / 3600)
      timeRemaining = timeRemaining % 3600

      minutes = parseInt(timeRemaining / 60)
      timeRemaining = timeRemaining % 60

      seconds = parseInt(timeRemaining)
      let daysLeft = { days, hours, minutes, seconds }
      console.log(daysLeft.days)
      document.querySelector('.days').textContent = days + ' Days '
      // document.querySelector('.days').textContent = hours
      document.querySelector('.hours').textContent = hours + ' Hours '
      document.querySelector('.minutes').textContent = minutes + ' Minutes '
      document.querySelector('.seconds').textContent = seconds + ' Seconds '
      // document.querySelector('.hours').textContent = ('0' + hours).slice(-2)
      // document.querySelector('.minutes').textContent = ('0' + minutes).slice(-2)
      // document.querySelector('.seconds').textContent = ('0' + seconds).slice(-2)
    } else {
      return
    }
  }

  setInterval(calculate, 1000)
}

// let event = new Date(shuttleLaunchDetails[counter].launch_date_utc)
// console.log(event)

const displayLaunchData = () => {
  // for (let i = 0; i <= shuttleLaunchDetails.length; i++) {
  if (counter > 0 || counter <= 18) {
    return shuttleLaunchDetails[counter]
    console.log(shuttleLaunchDetails[counter])
  } else {
    counter
    // }
  }
}

const displayPreviousLaunchData = () => {
  // for (let i = 18; i <= shuttleLaunchDetails.length; i--) {
  if (counter > 18) {
    console.log(shuttleLaunchDetails[counter])
    return shuttleLaunchDetails[counter]
    counter = counter - 1
  } else {
    return shuttleLaunchDetails[counter]
    // }
  }
}

const nextLaunchDetail = () => {
  // put logic here for the counter condition. if counter is greater then the number of launches - shuttleLaunchDetails.length - reset the counter back to zero
  if (counter === shuttleLaunchDetails.length - 1) {
    counter = 0
    console.log(shuttleLaunchDetails[counter])
  } else {
    counter++
  }

  // if (counter >= 0 && counter <= shuttleLaunchDetails.length) {
  //   counter = counter + 1
  //   console.log(shuttleLaunchDetails[counter])
  // } else {
  //   return (counter = 0)
  // }
  // displayLaunchData()
  // return shuttleLaunchDetails[counter]
  // displayLaunchData()
  getLaunchDetail()
  // return shuttleLaunchDetails[counter]
}

const previousLaunchDetail = () => {
  // for (let i = 0; i <= shuttleLaunchDetails.length; i++) {
  console.log(shuttleLaunchDetails)
  if (counter === 0) {
    counter = shuttleLaunchDetails.length - 1
  } else {
    counter--
  }
  // }

  // counter = counter - 1
  // displayPreviousLaunchData()
  // return shuttleLaunchDetails[counter]
  // displayLaunchData()
  getLaunchDetail()
  // return shuttleLaunchDetails[counter]
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.next-launch').addEventListener('click', nextLaunchDetail)
document.querySelector('.previous-launch').addEventListener('click', previousLaunchDetail)
