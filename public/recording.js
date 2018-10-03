var stream, video, audioCtx ;

window.onload = function () {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
 getData() 
 //newCanvas()
};

const createButtons = () => {
  var mainBody = document.getElementById('main-body');
  var startBtn = document.getElementById('vidSound');
  mainBody.style.display = 'grid'
  startBtn.style.display = 'none'
}

const injectNewAudio = (video, stream) => {
    video.addEventListener('loadedmetadata', function () {
      var options = { audioBitsPerSecond : 128000, videoBitsPerSecond : 2500000, mimeType : 'video/mp4', video: video }
      video.play();
      window.builder = new canvasRecorder(stream, options)
      builder.initStreaming(stream, video);
    });
}

const createVideo = (stream) => {
    var video = document.createElement('video');
    video.srcObject = stream;
      try {
        video.srcObject = stream;
     } catch (error) {
        console.log(error)
        video.src = URL.createObjectURL(stream);
     }
    video.muted = true; 
    injectNewAudio(video, stream)    
}

var newCanvas =() => {
 createButtons();
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
  .then(function (stream) {
   createVideo(stream)

  }).catch(function(error) {
    console.log('error', error);
  });
}



const  startCanvasAnim = (video) => {
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d'); 
    const draw = () => { 
      requestAnimationFrame(draw); 
      ctx.fillRect(0, 0, ctx.height, ctx.width); 
      ctx.fillStyle = '#03A9F4';       
      var width = video.videoWidth /1.5;
      var height = video.videoHeight/1.5;
      ctx.drawImage(video, 10, 270, width,height); 
      cloneCanvas(canvas)
  };
  draw();
  }


  const addVidToDom =(vidURL) => {
    let vid = document.createElement('video');
    vid.controls = true;
    vid.controlsList = "nodownload";
    vid.className = 'recordedVid'
    vid.src = vidURL;
    vid.onend = function() { URL.revokeObjectURL(vidURL) }
    var canva = document.getElementById('vid-holder')
    canva.appendChild(vid);
    document.getElementById('buttons').style.display = "none";
    document.getElementById('canvas').style.display = "none";    
  }

  const exportStream = (e) => {
    console.log(e)
  if (e.currentTarget.chunks.length) {
    const blob = new Blob(e.currentTarget.chunks)
    const vidURL = URL.createObjectURL(blob);
    updateData.dispatch({type:'SET_DOWNLOAD_URL','value':vidURL});
    addVidToDom(vidURL);
  } else {
    console.log('recording export failed')
  }
}


class canvasRecorder {
  construtor(stream, video){
    this.soundStream = '';
    this.recorder = '';
    this.chunks = [];
  }

  initStreaming(stream, video){
    const sourceNode = audioCtx.createMediaStreamSource(stream);
    const destination = audioCtx.createMediaStreamDestination();
    this.soundStream = destination.stream; 
    sourceNode.connect(destination)
    startCanvasAnim(video); 
  }

  startRecording(){
    // Start up recorder
    audioCtx.resume();
    // inject it into the canvas
    var recordStream = canvas.captureStream(30);      
    recordStream.addTrack(this.soundStream.getAudioTracks()[0]);
    this.recorder = new MediaRecorder(recordStream);
    this.recorder.start();
    this.recorder.ondataavailable = function(e){ e.data.size &&  this.chunks.push(e.data)}
    this.recorder.chunks = [];
    this.recorder.onstop = function(e){ exportStream(e)};     
  }

  stopRecording() {  
    try{
      this.recorder.stop();
      const canvas2 = document.getElementById('canvas2');
      canvas2.style.display = 'none'
      } catch(e){
      console.log(e)
    }
  }
}





function startRecording() {
  var booklist = document.getElementById('book-list');
    booklist.style.display = 'none'
  window.builder.startRecording()
};

function stopRecording() {
  window.builder.stopRecording()
};

function next(){
 var booklist = document.getElementById('book-list');
 booklist.style.display = 'none' 
 updateData.dispatch({type:'INCREASE_SLIDE'});
}

function prev(){  
  var booklist = document.getElementById('book-list');
    booklist.style.display = 'none'
 updateData.dispatch({type:'REDUCE_SLIDE'});
}



