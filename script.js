let rangeValue = document.getElementById('rangeValueInput')
let numberValue = document.getElementById('numberValue')

rangeValue.addEventListener('input', () => {
  numberValue.textContent = rangeValue.value
})

//Adding function to copy the password and show the Copied word
const copyButton = document.getElementById('copy-icon')
const passwordValue = document.getElementById('password-value')
const copyWord = document.querySelector('.copied-word')

copyButton.addEventListener('mousedown', () => {
  const textToCopy = passwordValue.value // Obtener el contenido del span

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      copyWord.classList.toggle('copied-word--active')

      //   setTimeout(function () {
      //     copyWord.classList.toggle('copied-word--active')
      //   }, 500)
    })
    .catch((error) => {
      console.error('Error al copiar al portapapeles:', error)
    })
})

copyButton.addEventListener('mouseup', () => {
  copyWord.classList.toggle('copied-word--active')

  //   const textToCopy = passwordValue.textContent // Obtener el contenido del span

  //   navigator.clipboard
  //     .writeText(textToCopy)
  //     .then(() => {
  //       copyWord.classList.toggle('copied-word--active')

  //       //   setTimeout(function () {
  //       //     copyWord.classList.toggle('copied-word--active')
  //       //   }, 500)
  //     })
  //     .catch((error) => {
  //       console.error('Error al copiar al portapapeles:', error)
  //     })
})

function generatePassword(passworLenght, options = {}) {
  const {
    uppercase = false,
    lowercase = false,
    numbers = false,
    symbols = false,
  } = options

  let characters = ''
  let password = ''

  if (uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (lowercase) characters += 'abcdefghijklmnopqrstuvwxyz'
  if (symbols) characters += '!@#$%^&*,.!@#$%^&*,.!@#$%^&*,.'
  if (numbers) characters += '012345678901234567890123456789'

  for (let i = 0; i < passworLenght; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    password += characters.charAt(randomIndex)
  }

  return password
}

//Add event to the button to create the password

let buttonGenerate = document.querySelector('.generate-button')

buttonGenerate.addEventListener('click', (event) => {
  event.preventDefault()

  let uppercaseElement = document.getElementById('uppercase')
  let lowercaseElement = document.getElementById('lowercase')
  let numbersElement = document.getElementById('numbers')
  let symbolsElement = document.getElementById('symbol')

  passwordValue.value = generatePassword(numberValue.textContent, {
    uppercase: uppercaseElement.checked,
    lowercase: lowercaseElement.checked,
    numbers: numbersElement.checked,
    symbols: symbolsElement.checked,
  })
})
