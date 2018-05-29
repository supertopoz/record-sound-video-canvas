function setBottomBarVisibility(imageArrayLength = 0){
  var buttons = document.getElementById('buttons');
  return imageArrayLength? 
    buttons.style.display = "grid" :
    buttons.style.display = "none"       
}

function setNavButtonsHelper(buttonType, pointerStatus){
  var button = document.getElementById(buttonType);
  button.style["pointer-events"] = pointerStatus ;
  pointerStatus === 'none'? 
    button.style.opacity = 0.4 : 
    button.style.opacity = 1 ;
  return button;  
}

function setNavButtons(slideNumber = 0, imageArrayLength = 0){  
  var back = '';
  var forward = '';
  slideNumber === 0? 
    back = setNavButtonsHelper('prev','none'): 
    back = setNavButtonsHelper('prev','auto')
  slideNumber === (imageArrayLength -1)? 
    forward = setNavButtonsHelper('next','none'): 
    forward = setNavButtonsHelper('next', 'auto')
  return [back, forward];
}

function updateCanvas(image = '', imageArrayLength){
  if(!imageArrayLength) image = './assets/blank.png';
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.fillStyle = 'rgb(200, 200, 200)';  
  context.canvas.width = context.canvas.width;
  var img = new Image();          
    img.src = image
    img.addEventListener('load', function() {
       context.drawImage(img, 255, 10, img.width/1.2, img.height/1.2);
    }, false);
  return img;  
}