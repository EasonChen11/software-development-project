const body = document.querySelector('body')
const input = document.querySelector('input')
const button = document.querySelector('button')
const link = document.querySelector('a')

button.addEventListener('click', (event) => {
  event.preventDefault()

  fetch(`/api?weight=${input.value}`)
    .then((res) => res.text())
    .then((data) => {
      link.href = data
      link.textContent = data
    })
    .catch((err) => {
      console.log(err)
    })
})
