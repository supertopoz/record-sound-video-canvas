var stream, video;

window.onload = function () {
  // get audio stream from user's mic
  creatNameList()
  newCanvas()
};

var newCanvas = function(){
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
     //initAudioStream(stream, video);
      window.builder = new BuildRecorder(stream, video)
      builder.initAudioStream(stream, video);
    });
  }).catch(function(error) {
    console.log('error', error);
  });

}

class BuildRecorder {
  construtor(stream, video){
    this.stream = stream;
    this.video = video; 
    this.soundStream = '';
    this.sourceNode = '';
    this.recorder = '';
    this.chunks = [];
  }
  initAudioStream(stream, video){
    this.stream = stream;
    this.video = video; 
    var audioCtx = new AudioContext();
  // create a stream from our AudioContext
    this.sourceNode = audioCtx.createMediaStreamSource(this.stream);
    var dest = audioCtx.createMediaStreamDestination();
    this.soundStream = dest.stream; 
    this.sourceNode.connect(dest)
      // inject sound and video into canvas. 
    this.startCanvasAnim(); 
  }

  startCanvasAnim(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d'); 
      ctx.fillStyle = 'rgb(200, 200, 200)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);  
    const draw = () => {  
      requestAnimationFrame(draw);
      var width = this.video.videoWidth/2.8;
      var height = this.video.videoHeight/2.8;
      ctx.drawImage(this.video, 10, 10, width,height);     
  };
  draw();
  }

  startRecording(){
    var recButton = document.getElementById('rec');
    var recordStream = canvas.captureStream(30);
      recButton.textContent = 'Stop';
      recordStream.addTrack(this.soundStream.getAudioTracks()[0]);
      this.recorder = new MediaRecorder(recordStream);
      this.recorder.start();
      this.recorder.ondataavailable = this.saveChunks;
      this.recorder.chunks = [];
      this.recorder.onstop = this.exportStream;
      recButton.onclick = this.stopRecording.bind(this);
  }

  saveChunks(e) {
    console.log(e)
    e.data.size &&  this.chunks.push(e.data);
  }

  exportStream(e) {
  if (this.chunks.length) {
    var blob = new Blob(this.chunks)
    var vidURL = URL.createObjectURL(blob);
    updateData.dispatch({type:'SET_DOWNLOAD_URL','value':vidURL});
    var vid = document.createElement('video');
    vid.controls = true;
    vid.controlsList = "nodownload";
    vid.className = 'recordedVid'
    vid.src = vidURL;
    vid.onend = function() {
      URL.revokeObjectURL(vidURL);
    }

    var canva = document.getElementById('vid-holder')
    console.log(vid)
    console.log(canvas)
    canva.appendChild(vid);
    document.getElementById('buttons').style.display = "none";
    document.getElementById('canvas').style.display = "none";
  } else {
    console.log('failed')
    //document.body.insertBefore(document.createTextNode('no data saved'), canvas);
  }
}
    stopRecording() {
    this.recorder.stop();
  }
}

function startRecording() {
  var booklist = document.getElementById('book-list');
    booklist.style.display = 'none'
  window.builder.startRecording()
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

