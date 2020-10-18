const elementNode = document.getElementById('type-text')
let text = ''

function updateNode () {
  elementNode.innerHTML = text

}

function pushCharacter (character) {
  text += character
  updateNode()
}

function popCharacter () {
  text = text.slice(0, text.length -1)
  updateNode()
}

function clearText () {
  text = ''
  updateNode()
}


function wait (time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

function typeCharacter (character) {
  return new Promise(resolve => {
    const randomMsInterval = 100 * Math.random()
    const msInterval = randomMsInterval < 50 ? 10 : randomMsInterval
    
    pushCharacter(character)
    wait(msInterval).then(resolve)
  })
}

function removeCharacter () {
  return new Promise(resolve => {
    const randomMsInterval = 100 * Math.random()
    const msInterval = randomMsInterval < 50 ? 10 : randomMsInterval
    
    popCharacter()
    wait(msInterval).then(resolve)
  })
}

function typeText (text) {
  return new Promise(resolve => {
    function _type (index) {
      typeCharacter(text[index]).then(() => {
        if (index + 1 < text.length) _type(index + 1)
        else resolve()
      })
    }
    _type(0)
  })
}

function removeText (amount) {
  return new Promise(resolve => {
    function _remove (index) {
      removeCharacter().then(() => {
        if (index + 1 < amount) _remove(index + 1)
        else resolve()
      })
    }
    _remove(0)
  })
}


// Typing script ⌨

var text_name = '<br>I am Amal Jose.<br>'
var text_love = 'I love to code.'
var text_love2 ='<br>I am a DevOps Engineer.'
var text_travel ='Intrests include Python, Flask, Django, Rest, JavaScript, React JS, Splunk, AWS...............'


function typeLoop() {
  typeText(' ')
    .then(()=> typeText(text_love))
    .then(() => wait(500))
    .then(()=> typeText(text_love2))
    .then(() => wait(2000))
    .then(() => removeText(text_love2.length))
    .then(() => removeText(text_love.length))
    .then(()=> typeText(text_travel))
    .then(() => wait(2000))
    .then(() => removeText(text_travel.length))
    .then(()=> typeText(text_photo))
    .then(() => wait(2000))
    .then(() => removeText(text_photo.length))
    .then(typeLoop)
}

wait(300).then(() => {
  clearText()
  typeText('Hi there!')
  .then(() => wait(500))
  .then(() => typeText(text_name))
  .then(() => wait(500))
  .then(typeLoop)
})