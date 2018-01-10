const container = document.querySelector('.container')
function createGrid(n = 16){
  for(let i = 1;i<=n**2;i++){
    let grid = document.createElement('div')
    let w = (560/n)
    grid.classList.add('box')
    grid.style.width = `${w-2}px`
    grid.style.height = `${w-2}px`
    container.appendChild(grid)

  }
}

function addColor(e){
  if(e.target.className !== 'box') return
  e.target.style.backgroundColor="black"
}

document.addEventListener('mouseover', addColor)

const topArea = document.querySelector('.topArea')
const button = document.createElement('button')
button.textContent = "Reset"

button.onclick = function(){
  gridNum = prompt("Please enter desired dimension (i.e. 12 for 12x12 grid)")
  sessionStorage.setItem('new', gridNum)
  window.location.reload()
}

topArea.appendChild(button)
let gridNum = sessionStorage.getItem('new')

if(gridNum === null){
  createGrid(16)
}else{
  createGrid(gridNum)
}
