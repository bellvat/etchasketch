//creating container for grid
const container = document.querySelector('.container')
//creating div for buttons
const topArea = document.querySelector('.topArea')
const button = document.createElement('button')
button.textContent = "Reset"
button.onclick = function(){
  gridNum = prompt("Please enter desired dimension (i.e. 12 for 12x12 grid)")
  if(!gridNum || gridNum <= 0){
    alert("Please enter a number greater than 0.")
  }else{
    sessionStorage.setItem('new', gridNum)
    window.location.reload()
  }
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
//creating the grid using tr and td
function createGrid(n){
  for(let i = 1;i<=n;i++){
    let gridR = document.createElement('tr')
    gridR.classList.add('row')
    gridR.style.height = `${560.0/n}px`
    container.appendChild(gridR)
    for(let i =1;i<=n;i++){
      let gridC = document.createElement('td')
      gridC.classList.add('col')
      gridC.style.width = `${560.0/n}px`
      gridC.style.backgroundColor = "rgb(255,255,255)"
      gridR.appendChild(gridC)
    }
  }
}
//function for transforming squares to random colors
function addColor(e){
  if (!e) e = window.event;
  let targ = e.target || e.srcElement
  if(targ.className !== 'col') return
  a = Math.random() * 226
  b = Math.random() * 226
  c = Math.random() * 226

  targ.style.backgroundColor= `rgb(${a},${b},${c})`
}
//function to transform squares to darker shades of black
function addBlack(e){
  //its just needs to reduce the last one by 10%
  if (!e) e = window.event;
  let targ = e.target || e.srcElement
  if(targ.className !== 'col') return
  let color = getComputedStyle(e.target).backgroundColor
  let match = /\d*\.?\d+/
  let results = match.exec(color)
  let num = Number(results[0])
  let a = num - (255 * .1)
  targ.style.backgroundColor= `rgb(${a},${a},${a})`
}
//adding mouseover event
document.addEventListener('mouseover', addBlack)
//calling the stored user entered grid size using the 'new' key
let gridNum = sessionStorage.getItem('new')
//the first grid will not contain a user entry, and therefore will be null
//set default grid to 16
if(gridNum === null){
  createGrid(16)
}else{
  createGrid(gridNum)
}
