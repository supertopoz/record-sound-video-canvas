const initialState = {
  list : {},
  images: [],
  slideNumber: 0,
  studentBooks: ''
}

const bookReducer = (state, actions) => {

   if (typeof state === 'undefined') {
    return initialState
  }

    var list = state.list;
    var images = state.images
    switch (actions.type) {
        case "REMOVE_FROM_LIST" : 
       // Aim is to remove the book from the list totally. 
       var newList = list
       delete newList[actions.value]
       var newImages = images.filter(function(image){
        return image.indexOf(actions.value) === -1;
       })
       console.log(newList)
       if (Object.keys(newList).length === 0){
        newList = {}
       }
       console.log(newList)
      return Object.assign({}, state, {
        list: newList, 
        images: newImages
      })
    case "ADD_TO_LIST" :         
      return Object.assign({}, state, {
        list : list
      })   
    case "CHANGE_CHECKED_STATUS" :         
      list[actions.value[0]] = {"checked": actions.value[1]}
      return Object.assign({}, state, {
        list : list
      })

    case "CREATE_IMAGE_LIST" :
      var image_list = createFilePathList(list)
      return Object.assign({}, state, {
        images: image_list
      }) 
    case "INCREASE_SLIDE" :
      var image_list = createFilePathList(list)
      if(state.slideNumber === -1){
        increase = 2
      }
      return Object.assign({}, state, {
        slideNumber: state.slideNumber + 1
      }) 
    case "REDUCE_SLIDE" :
      var image_list = createFilePathList(list)
      return Object.assign({}, state, {
        slideNumber: state.slideNumber -1
      })       
    case "ADD_All_STUDENTS_BOOKS" :
      return Object.assign({}, state, {
        studentBooks: actions.value
      })  
      break;
    }
    return state;
}

var createFilePathList = function(list = {"0000": {"checked": false}}){
  var filesList = [];
  var x = 0;
  for (var i in list){
    var temp = [];
    while (x < localData[i].pages){
      temp.push("./assets/" + i + "/Image" + x + ".jpg")
      x ++;
    }
    filesList.push(temp)
    temp = [];
    x = 0;
  }  
  var merged = [].concat.apply([], filesList);
  return merged
}

function checkbox(e){
  console.log(e.id)
if (e.checked === true){ 
     console.log('add to list')
     updateData.dispatch({type:'ADD_TO_LIST','value': e.id});
     updateData.dispatch({type:'CHANGE_CHECKED_STATUS','value': [e.id, true]});
     updateData.dispatch({type:'CREATE_IMAGE_LIST'});
     } else {
    console.log('remove from list checkbox function')
    console.log(e.id)
     updateData.dispatch({type:'REMOVE_FROM_LIST','value':e.id});
     updateData.dispatch({type:'CHANGE_CHECKED_STATUS','value': [e.id, false]})
   //  updateData.dispatch({type:'CREATE_IMAGE_LIST'});
     }   
}