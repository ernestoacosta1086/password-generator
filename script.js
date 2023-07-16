let rangeValue = document.getElementById('rangeValueInput')
let numberValue = document.getElementById('numberValue')
let buttonGenerate = document.querySelector('.generate-button')

rangeValue.addEventListener('input', () => {
  numberValue.textContent = rangeValue.value
  updateButtonStatus()
})

//Adding function to copy the password and show the Copied word
const copyButton = document.getElementById('copy-icon')
const passwordValue = document.getElementById('password-value')
const copyWord = document.querySelector('.copied-word')

copyButton.addEventListener('click', () => {
  const textToCopy = passwordValue.value // Obtener el contenido del span

  if (passwordValue.value) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        copyWord.classList.toggle('copied-word--active')
      })
      .catch((error) => {
        console.error('Error al copiar al portapapeles:', error)
      })

    setTimeout(function () {
      copyWord.classList.toggle('copied-word--active')
    }, 1000)
  }
})

//Update button status when range is 0
function updateButtonStatus() {
  if (rangeValue.value === '0')
    buttonGenerate.classList.add('generate-button--active')
  else buttonGenerate.classList.remove('generate-button--active')
}
updateButtonStatus()

//Change the color when password has no value
passwordValue.addEventListener('input', () => {
  updateIconCopyColor()
  checkStrength()
})

function updateIconCopyColor() {
  let iconCopy = document.querySelector('#copy-icon svg path')
  if (!passwordValue.value) iconCopy.style.fill = '#e6e5ea'
  else if (passwordValue.value) iconCopy.style.fill = '#a4ffaf'
}

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
  if (symbols) characters += '!@#$%&*,.!@#$%&*,.!@#$%&*,.'
  if (numbers) characters += '012345678901234567890123456789'

  for (let i = 0; i < passworLenght; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    password += characters.charAt(randomIndex)
  }
  return password
}

//Add event to the button to create the password

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
  checkStrength()
  updateIconCopyColor()
})

function checkStrength() {
  let password = passwordValue.value
  setBarsColors(0)

  // const hasUpperCase = /[A-Z]/.test(password)
  // const hasLowerCase = /[a-z]/.test(password)
  const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  const hasNumbers = /[0-9]/.test(password)

  if (!password) {
    setBarsColors(0)
  } else if (password.length < 6) {
    setBarsColors(0)
    setBarsColors(1)
  } else if (password.length >= 6 && password.length <= 8) {
    if (!hasNumbers && !hasSymbols) {
      setBarsColors(0)
      setBarsColors(1)
    } else {
      setBarsColors(0)
      setBarsColors(2)
    }
  } else if (password.length === 9) {
    if (!hasNumbers && !hasSymbols) {
      setBarsColors(0)
      setBarsColors(1)
    } else {
      setBarsColors(0)
      setBarsColors(3)
    }
  } else {
    if (!hasNumbers && !hasSymbols) {
      setBarsColors(0)
      setBarsColors(1)
    } else if (!hasNumbers || !hasSymbols) {
      setBarsColors(0)
      setBarsColors(3)
    } else {
      setBarsColors(0)
      setBarsColors(4)
    }
  }
}

//Set the category color bars and category background depends on category
function setBarsColors(categoryNumber) {
  let bars = document.querySelectorAll('.bar')
  let strengthCategory = document.getElementById('strengh-category')

  if (categoryNumber === 0) {
    bars.forEach((bar) => {
      bar.style.backgroundColor = 'transparent'
      strengthCategory.textContent = ''
    })
  } else if (categoryNumber === 1) {
    setBarsColors(0)
    bars[0].style.backgroundColor = '#f64a4a'
    strengthCategory.textContent = 'too weak!'
  } else if (categoryNumber === 2) {
    setBarsColors(0)
    for (let i = 0; i < 2; i++) {
      bars[i].style.backgroundColor = '#fb7c58'
    }
    strengthCategory.textContent = 'weak!'
  } else if (categoryNumber === 3) {
    for (let i = 0; i < 3; i++) {
      bars[i].style.backgroundColor = '#f8cd65'
    }
    strengthCategory.textContent = 'medium'
  } else if (categoryNumber === 4) {
    setBarsColors(0)
    for (let i = 0; i < 4; i++) {
      bars[i].style.backgroundColor = '#a4ffaf'
    }
    strengthCategory.textContent = 'strong'
  }
}

checkStrength()
