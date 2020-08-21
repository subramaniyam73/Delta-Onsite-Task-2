const canvas=document.querySelector("#canvas");
const c=canvas.getContext("2d");
let draw=false;
let brushThickness=2;
let brushColor="black";
let eraser=false;
let gLength,gWidth,gLength1,gLength2,gLength3,gRadius;

let gText,gSize;

let gShape="none";

canvas.width=window.innerWidth*0.8;
canvas.height=window.innerHeight*0.65;

document.querySelector(".tools").style.height=window.innerHeight*0.2;


let drawing = false;
let x = 0;
let y = 0;



var canvasWrapper=document.getElementById("canvasWrapper");

var image = document.createElement('img');

image.onload = function (ev) {
  canvas.width=this.width;
  canvas.height=this.height;

  c.drawImage(this,0,0,this.width,this.height);

  
};

document.getElementById('imgURL').oninput = function(ev) {
  image.src = this.value;
  let imgWidth=prompt("Image Width");
  let imgHeight=prompt("Image Height");
  image.height=imgHeight;
  image.width=imgWidth;
  canvas.width=imgWidth;
  canvas.height=imgHeight;
};

document.getElementById('imgFile').onchange = function(ev) {
  var reader = new FileReader();
  reader.onload = function(ev) {
    image.src = reader.result;
    let imgWidth=prompt("Image Width");
    let imgHeight=prompt("Image Height");
    image.height=imgHeight;
    image.width=imgWidth;
    canvas.width=imgWidth;
    canvas.height=imgHeight;
  };
  reader.readAsDataURL(this.files[0]);
};

document.getElementById('download').onclick = function () {
  var img = canvas.toDataURL();
  var link = document.createElement("a");
  link.download = 'created meme';
  link.href = img;
  link.click();

  // var win = window.open('', '_blank');
  // win.document.write('<img style="box-shadow: 0 0 1em 0 dimgrey;" src="' + img + '"/>');
  // win.document.write('<h1 style="font-family: Helvetica; font-weight: 300">Right Click > Save As<h1>');
  // win.document.body.style.padding = '1em';
};

document.getElementById('textForm').addEventListener("submit",(e)=>{
  e.preventDefault();
  let {textSize,memeText}=e.target.elements;
  console.log(textSize.value);
  textSize=textSize.value;
  memeText=memeText.value;
  gShape="text";
  gText=memeText;
  gSize=textSize;
  alert("Hit C key to finalize position of text ! click on canvas to place text ! ");
  document.querySelector("#shapingStat").textContent="Placing Text !";
});




canvas.addEventListener('mousedown', (e) => {
  if(gShape=="none"){
    x = e.offsetX;
    y = e.offsetY;
    drawing = true;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing === true&&gShape=="none") {
    drawCurve(x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener('mouseup', (e) => {
  if (drawing === true&&gShape=="none") {
    drawCurve(x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    drawing = false;
  }
});

function drawCurve(x1, y1, x2, y2) {
  c.beginPath();
  c.strokeStyle = brushColor;
  if(eraser){
    c.strokeStyle="white";
  }
  c.lineWidth = brushThickness;
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
  c.closePath();
}

document.querySelector("#commit").addEventListener("submit",(e)=>{
  e.preventDefault();
  let {thickness,color,imgHeight,imgWidth}=e.target.elements;
  thickness=thickness.value;
  color=color.value;
  brushThickness=thickness;
  brushColor=color;

  // document.querySelector("#thickness").value="";
});

document.querySelector("#eraser").addEventListener("click",(e)=>{
  if(eraser==true)
    {
      eraser=false;
      document.querySelector("#eraserStat").textContent="Painting !";
    }
  else
    {
      eraser=true;
      document.querySelector("#eraserStat").textContent="Erasing !";

    }
});


document.querySelector("#selectRect").addEventListener("click",(e)=>{
  let rectDetails=document.querySelector("#rectDetails");
  toggle(rectDetails);
  hide(document.querySelector("#circleDetails"));
});

document.querySelector("#selectCircle").addEventListener("click",(e)=>{
  let circleDetails=document.querySelector("#circleDetails");
  toggle(circleDetails);
  hide(document.querySelector("#rectDetails"));
});

function toggle(elem){
  if(elem.style.display=="block")
    elem.style.display="none";
  else
    elem.style.display="block";
}

function hide(elem){
  elem.style.display="none";
}

document.querySelector("#rectForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  let {l,w}=e.target.elements;
  gLength=l.value;
  gWidth=w.value;
  console.log(gLength);
  gShape="rectangle";
  toggle(document.querySelector("#rectDetails"));
  alert("Hit C key to finalize positions ! click on canvas to place shape ! ");
  document.querySelector("#shapingStat").textContent="Drawing Rectangles !";
});

document.querySelector("#circleForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  let {radius}=e.target.elements;
  gRadius=radius.value;
  gShape="circle";
  toggle(document.querySelector("#circleDetails"));
  alert("Hit C key to finalize positions ! click on canvas to place shapes ! ");
  document.querySelector("#shapingStat").textContent="Drawing Circles !";
});

document.addEventListener("keydown",(e)=>{
  if(e.keyCode==67)
  {
    e.preventDefault();
    gShape="none";
    document.querySelector("#shapingStat").textContent="Free Drawing !";
  }
});

canvas.addEventListener("click",(e)=>{

  let x=e.offsetX;
  let y=e.offsetY;
  if(gShape=="rectangle"){
    console.log(gLength);
    c.beginPath();
    c.strokeStyle=brushColor;
    c.fillStyle="white";
    c.lineWidth=brushThickness;
    c.strokeRect(x,y,gLength,gWidth);
  }else if(gShape=="circle"){
    c.beginPath();
    c.strokeStyle=brushColor;
    c.fillStyle="white";
    c.lineWidth=brushThickness;
    c.arc(x,y,gRadius,0,Math.PI*2,false);
    c.stroke();
  }
  else if(gShape=="text"){
    c.fillStyle=brushColor;
    c.font = `${gSize}px serif`;
    c.fillText(gText, x, y);
  }
});
