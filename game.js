const container = document.querySelector('.container')
const topArea = document.querySelector('.topArea')
const button = document.createElement('button')
button.textContent = "Reset"

button.onclick = function(){
  gridNum = prompt("Please enter desired dimension (i.e. 12 for 12x12 grid)")
  sessionStorage.setItem('new', gridNum)
  window.location.reload()
}

const blackButton = document.createElement('button')
const colorButton = document.createElement('button')
blackButton.textContent = "Draw in shades of Black"
blackButton.classList.add('black')
colorButton.textContent = "Draw in random colors!"
colorButton.classList.add('green')

blackButton.onclick = function(){
  document.removeEventListener('mouseover', addColor)
  blackButton.classList.add('highlight')
  colorButton.classList.remove('highlight')
}

colorButton.onclick = function(){
  document.addEventListener('mouseover', addColor)
  blackButton.classList.remove('highlight')
  colorButton.classList.add('highlight')
}
topArea.appendChild(blackButton)
topArea.appendChild(colorButton)
topArea.appendChild(button)

function createGrid(n = 16){
  for(let i = 1;i<=n**2;i++){
    let grid = document.createElement('div')
    let w = (560/n)
    grid.classList.add('box')
    grid.style.width = `${w-2}px`
    grid.style.height = `${w-2}px`
    grid.style.backgroundColor = "rgb(255,255,255)"
    container.appendChild(grid)

  }
}

function addColor(e){
  if(e.target.className !== 'box') return
  a = Math.random() * 226
  b = Math.random() * 226
  c = Math.random() * 226

  e.target.style.backgroundColor= `rgb(${a},${b},${c})`
}

function addBlack(e){
  //its just needs to reduce the last one by 10%
  if(e.target.className !== 'box') return
  let color = getComputedStyle(e.target).backgroundColor
  let match = /\d*\.?\d+/
  let results = match.exec(color)
  let num = Number(results[0])
  let a = num - (255 * .1)
  e.target.style.backgroundColor= `rgb(${a},${a},${a})`
}


document.addEventListener('mouseover', addBlack)


let gridNum = sessionStorage.getItem('new')

if(gridNum === null){
  createGrid(16)
}else{
  createGrid(gridNum)
}
