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
  var img = new Image();          
    img.src = image
    context.fillRect(0, 0, context.canvas.width, context.canvas.height); 
    context.fillStyle = '#3498db'; 
    img.addEventListener('load', function() {
         context.drawImage(img, 260, 10, img.width/1.2, img.height/1.2);
    }, false);
  return img;  
}