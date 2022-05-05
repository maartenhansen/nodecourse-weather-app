// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// }) 




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'Loading the location'
    messageTwo.textContent = ''
    
    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((weather) => {
        if (weather.error) {
            messageOne.textContent = weather.error
        } else {
            messageOne.textContent = 'Location: ' + weather.location
            messageTwo.textContent = weather.forecast
        }
    })
})   
console.log(location + ' was possibly found')
})
