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


function cloneCanvas(oldCanvas) {

    //create a new canvas
    var newCanvas = document.getElementById('canvas2');
    var context = newCanvas.getContext('2d');
    // oldCanvas.getContext('2d').scale(0.5,0.5)
    // //set dimensions
    newCanvas.width = 700//oldCanvas.width /2;
    newCanvas.height = 394//oldCanvas.height /2;

    //apply the old canvas to the new o newCanvas.widthne
    context.drawImage(oldCanvas, 0, 0, newCanvas.width, newCanvas.height);
    context.scale(0.5,0.5)

    //return the new canvas
  //  return newCanvas;
}


function updateCanvas(image = '', imageArrayLength){
  if(!imageArrayLength) image = './assets/blank.png';
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var img = new Image();          
    img.src = image;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height); 
    context.fillStyle = '#03A9F4'; 
    img.addEventListener('load', function() {
         cloneCanvas(canvas)
         context.drawImage(img, 360, 10, img.width, img.height)
         //img.scale(2,2);
    }, false);
  return img;  
}