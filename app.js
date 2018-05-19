var soundStream, recorder, chunks = [];


window.onload = function () {
  // get audio stream from user's mic
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
  .then(function (stream) {
    var video = document.createElement('video');
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', function () {
     // send out device stream, video element with stream attached.  
     initAudioStream(stream, video);
    });
  }).catch(function(error) {
    console.log('error', error);
  });
};


function initAudioStream(stream, video) {

  var audioCtx = new AudioContext();
  // create a stream from our AudioContext
  var sourceNode = audioCtx.createMediaStreamSource(stream);
  var dest = audioCtx.createMediaStreamDestination();
  soundStream = dest.stream; 
  sourceNode.connect(dest)
  // inject sound and video into canvas. 
  startCanvasAnim(stream, video);
};

function startRecording() {
  var recButton = document.getElementById('rec');
  recButton.textContent = 'stop recording';

  var recordStream = canvas.captureStream(30);
  recordStream.addTrack(soundStream.getAudioTracks()[0]);
  recorder = new MediaRecorder(recordStream);
  recorder.start();
  recorder.ondataavailable = saveChunks;
  recorder.onstop = exportStream;
  recButton.onclick = stopRecording;
};

function exportStream(e) {

  if (chunks.length) {

    var blob = new Blob(chunks)
    var vidURL = URL.createObjectURL(blob);
    var vid = document.createElement('video');
    vid.controls = true;
    vid.className = 'recordedVid'
    vid.src = vidURL;
    vid.onend = function() {
      URL.revokeObjectURL(vidURL);
    }
    document.body.insertBefore(vid, canvas);
    document.getElementById('canvas').style.display = "none";
  } else {
    document.body.insertBefore(document.createTextNode('no data saved'), canvas);

  }
}

function saveChunks(e) {
  e.data.size && chunks.push(e.data);
}

function stopRecording() {
  var myNode = this.parentNode;
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}
  recorder.stop();
}

function startCanvasAnim(stream, video) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d'); 
  ctx.fillStyle = 'rgb(200, 200, 200)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);  
  var draw = function() {   
    requestAnimationFrame(draw);
    var width = video.videoWidth/4;
    var height = video.videoHeight/4;
    ctx.drawImage(video, 10, 10, width,height);     
  };
  draw(stream, video);
}

function next(){
  var img =  "/image1.png"
  updateCanvas(img)
}

function prev(){
  var img =  "/image2.png"
  updateCanvas(img)
}

function updateCanvas(image){
  
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
    context.canvas.width = context.canvas.width;
    context.fillStyle = 'rgb(200, 200, 200)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    var img = new Image();   // Create new img element      
      img.addEventListener('load', function() {
      // execute drawImage statements here
       context.drawImage(img, 200, 10, img.width/2.5, img.height/2.5);
    }, false);
    img.src = image    
}






