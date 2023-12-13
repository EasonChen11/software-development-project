const input = document.querySelector('input')
const button = document.querySelector('button')
const link = document.querySelector('a')
const invalid = document.querySelector('p')

// submit event handler
button.addEventListener('click', (event) => {
  // prevent refresh
  event.preventDefault()

  // call api
  fetch(`/api?weight=${input.value}`)
    .then((res) => res.text())
    .then((data) => {
      // create file link
      link.href = data
      link.textContent = data

      // validation
      if (data.length === 0) {
        invalid.style.display = 'block'
      } else {
        invalid.style.display = 'none'
      }
    })
    .catch((err) => {
      // handle error
      invalid.style.display = 'block'
      console.log(err)
    })
})
