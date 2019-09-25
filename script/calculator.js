const buttons = document.querySelectorAll('.button');
const screen = document.getElementById('screen');
const graph = document.getElementById('graph');
screen.innerText = "";
let grid = [];
let dimension = 20;
let colorWheel = ['blue', 'red', 'purple', 'green', 'pink', 'yellow', 'orange', 'cadetblue', 'greenyellow'];
let functions = [];

//can graph multiplication, addition, subtraction, addition
//must use operator to multiply, cannot punch in 2a. ony 2 * a

let test = eval("function test2(){return 2} test2()");
document.getElementById('test').innerText = test;


for (let i = 0; i < buttons.length; i++){
  buttons[i].addEventListener("click", function(e){
    let key = e.target.dataset.key;
    let parsed = parseFloat(key);

    if (isNaN(parsed)){
      if (key == "+"){
        screen.innerText += "+";
      }
      if (key == "-"){
        screen.innerText += "-";
      }
      if (key == "*"){
        screen.innerText += `\xD7`;
      }
      if (key == "/"){
        screen.innerText += `\xF7`;
      }
      if (key == "."){
        screen.innerText += ".";
      }
      if (key == "="){
        evaluate(screen.innerText);
      }
      if (key == "var"){
        screen.innerText += "a";
      }
      if (key == "graph"){
        startGraph(simplifyEval(screen.innerText), functions.length-1);
      }
      if (key == "z+"){
        dimension--;
        constructGrid();
        graphAll();
      }
      if (key == "z-"){
        dimension++;
        constructGrid();
        graphAll();
      }
      if (key == "clear"){
        screen.innerText = "";
      }

    
    } else {
      screen.innerText += parsed;
    }
  })
}

function startGraph(e, index){
  let cords = [];
  for (let i = -dimension * 2; i <= dimension * 2; i++){
    let x = i / 10;
    let y = Math.round(graphEval(e, x)*10)/10;
    let cord = document.querySelector("[x='" + x + "'][y='" + y + "']");
    if (cord){
      cords.push(cord);
    }
  }
  drawGraphBlock(cords, index);
}


function simplifyEval(s){
  let e = "";
  console.log("converting function to javascript");
  console.log('before: ' + s);
  for (let i = 0; i < s.length; i++){
    const c = s.charAt(i);
    if (c == `\xD7`){
      e += "*";
    } else if (c == `\xF7`){
      e += "/";
    } else if (c == '-'){
      if (i == 0 || parseInt(s.charAt(i-1)).isNaN){
        e += "(-1*";
        for (j = i+1; j < s.length - 1; j++){
          //if (parseInt(s.charAt(j)).isNaN || j ==){
//        UNDER CONSTRUCTION - NEGATIVE OPERATOR 
  //        }
        }
      } else {
        e += s.charAt(i);
      }
    } else {
      e += s.charAt(i);
    }
  }
  console.log('after: ' + e);
  console.log("---------------------------------");
  functions.push(e);
  return e;
}
  
function graphEval(s, x){   
  console.log('x: ' + x);
  let e = "";
  for (let i = 0; i < s.length; i++){
    if (s.charAt(i) == "a"){
      e += x;
    } else {
      e += s.charAt(i);
    }
  }
  console.log('evaluating: ' + e);
  return evaluate(e);
}

function evaluate(s){
  let result = eval(s);
  return result;
}


function drawGraphBlock(cords, index){
  cords.forEach((cord) => cord.style.backgroundColor = colorWheel[index]);
}

function graphAll(){
  functions.forEach((e, index) => {
    startGraph(e, index);
  })
}

function constructGrid(){
  graph.innerText = "";
  const graphWidth = graph.offsetWidth;
  const graphHeight = graph.offsetHeight;
  for (let y = 0; y < dimension * 4 + 1; y++){
    const row = document.createElement('div');
    row.classList.add('row');
    row.style.height = graphHeight / (dimension * 4 + 1)+ "px";
    row.style.margin = "none";
    row.style.padding = "none";
    for (let x = 0; x < dimension * 4 + 1; x++){
      const cord = document.createElement('div');
      row.appendChild(cord);
      cord.style.display = "inline-block";
      cord.textContent = '\xa0';
      cord.setAttribute('x', (x - dimension * 2)/10);
      cord.setAttribute('y', (y - dimension * 2)/10);
      cord.style.margin = "none";
      cord.style.padding = "none";
      cord.style.width = graphWidth / (dimension * 4 + 1)+ "px";
      cord.style.height = graphHeight / (dimension * 4 + 1)+ "px";
      if (((x - dimension * 2)/10) == 0 || ((y - dimension * 2)/10) == 0){
        if (Number.isInteger((x - dimension * 2)/10) && Number.isInteger((y - dimension * 2)/10)){
          cord.style.backgroundColor = "gray";
        } else {
          cord.style.backgroundColor = "whitesmoke";
        }
      }
    }
    graph.appendChild(row);
  }
}

constructGrid();