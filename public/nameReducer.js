/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    var items = document.getElementsByClassName("nameItem")
  //  items.style.display = "block";
    
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("div");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

const initialNameReducerState = {
  nameList : [],
  downloadURL : ''
}

const nameReducer = (state, actions) => {
// 
   if (typeof state === 'undefined') {
    return initialNameReducerState;
  }
  switch (actions.type) {
  case "ADD_TO_NAME_LIST" :
      var list = state.nameList;
      list.push(actions.value)
      return Object.assign({}, state, {
        nameList: list
      }) 
  case "REMOVE_NAME_FROM_LIST" :
      var list = state.nameList;
      list.splice(actions.value,1);
      return Object.assign({}, state, {
        nameList: list
      })
  case "SET_DOWNLOAD_URL" :
      return Object.assign({}, state, {
        downloadURL: actions.value
  })

      break;
    }

    return state;
}

document.addEventListener('click', function(e){
  if(e.target.className=="nameItem"){
   var name = e.target.innerHTML;
   var bookSelector = document.getElementById('select-books');
   bookSelector.style.display = 'grid'
   reset()
   updateData.dispatch({type:'ADD_TO_NAME_LIST','value':name});
  }
})

document.addEventListener('click', function(e){
  var element = document.getElementById("nameList");
  
  if(e.target.id === "myInput"){ 
    element.className = ("show");
    scrollWin();
  } 
  else  {
    element.className = ("hidden");
  }
})

document.addEventListener('click', function(e){
 // var element = document.getElementByClassName("remove-student");
  if(e.target.className.indexOf("remove-student") >= 0 ){  
    reset() 
    var index = e.target.id.replace('student_','');
    updateData.dispatch({type:'REMOVE_NAME_FROM_LIST','value':index});
  }
})


const updateStudentList = function(names){
  var html = ''
  names.forEach(function(item, index){
    html += `<span class="student-name">
                <span>${item}</span>
                  <span class="remove-student" id="student_${index}">
                  <i class="material-icons remove-student">delete</i></span>
              </span>`;
  })
  document.getElementById('name-container').innerHTML = html
}

const updateDownloadButton = function(data){
  var selectors = document.getElementById('selectors');
  var names = document.getElementById('name-container');
  if(data.downloadURL !== '') {
  //  selectors.style.display = 'none'
    selectors.style['pointer-events'] = 'none'
    names.style['pointer-events'] = 'none'
    selectors.style.opacity = '0.4'    
    names.style.opacity = '0.4'    
  }
  let today = new Date().toISOString().slice(0, 10)
  var names = data.nameList.join("-")
  var download = today +"-"+ names + ".mp4";
  var downloadButton = document.getElementById('download-button');
  if(data.downloadURL !== '')  downloadButton.style.display = 'block'
    downloadButton.href = data.downloadURL;
    downloadButton.download = download

}

