var stream, video, audioCtx ;

window.onload = function () {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
 getData() 
 //newCanvas()
};

const renderButtons = () => {
  var mainBody = document.getElementById('main-body');
  var startBtn = document.getElementById('vidSound');
  mainBody.style.display = 'grid'
  startBtn.style.display = 'none'


}


var newCanvas = function(){
  // get audio stream from user's mic  
  renderButtons()
  
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  }).then(function (stream) {

    const video = document.createElement('video');
    //video.srcObject = stream;
     
    try {
        video.srcObject = stream;
     } catch (error) {
        console.log(error)
        video.src = URL.createObjectURL(stream);
     }
    video.muted = true; 
    video.addEventListener('loadedmetadata', function () {
     // send out device stream, video element with stream attached.  
     //initAudioStream(stream, video);
     var options = {
      audioBitsPerSecond : 128000,
      videoBitsPerSecond : 2500000,
      mimeType : 'video/mp4',
      video: video
    }
    video.play();
    window.builder = new BuildRecorder(stream, options)
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
    //var audioCtx = new AudioContext();
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

    const draw = () => { 
    requestAnimationFrame(draw); 
    ctx.fillRect(0, 0, ctx.height, ctx.width); 
    ctx.fillStyle = '#03A9F4'; 
      
      var width = this.video.videoWidth /1.5;
      var height = this.video.videoHeight/1.5;
      ctx.drawImage(this.video, 10, 270, width,height); 
      cloneCanvas(canvas)
  };
  draw();
  }

  startRecording(){
    audioCtx.resume();
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
    e.data.size &&  this.chunks.push(e.data);
  }

  exportStream(e) {
  if (this.chunks.length) {
    var blob = new Blob(this.chunks, {type: 'video/mp4'})
   
    var vidURL = URL.createObjectURL(blob);
    //blob.type = 'video/mp4';
     sendXHR(blob);
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
    canva.appendChild(vid);
    document.getElementById('buttons').style.display = "none";
    document.getElementById('canvas').style.display = "none";
  } else {
    console.log('failed')
    //document.body.insertBefore(document.createTextNode('no data saved'), canvas);
  }
}
    stopRecording() {  
      try{
        this.recorder.stop();
        var canvas2 = document.getElementById('canvas2');
        canvas2.style.display = 'none'
        reset();
      } catch(e){
        console.log(e)
      }
    
  }
}


function sendXHR(blob){
    //Envia bien blob, no interpretado
//    var xhr = new XMLHttpRequest();
    // var video = document.getElementById('');
    // xhr.open('GET', video.src , true);
    // xhr.responseType = 'blob';
    // xhr.onload = function(e) {
    // if (this.status == 200) {
        // Note: .response instead of .responseText
        ///var blob = new Blob([this.response], {type: 'video/mp4'});
        console.log(blob.size/1024);
        console.log(blob.type);
        form = new FormData(),
        request = new XMLHttpRequest();
        form.append("myblob",blob,"Capture.mp4");
        form.append("myname",'Capture');
        request.open("POST","https://youtubev3-206805.appspot.com/upload",true);
        request.send(form);
    //   }
    //};
  //  xhr.send();
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



