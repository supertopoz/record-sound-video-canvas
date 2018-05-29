rootReducer = Redux.combineReducers({
    books:bookReducer,
    names: nameReducer
  })

const updateData = Redux.createStore(rootReducer);

updateData.subscribe(() => {
  
  var data = updateData.getState();
  //console.log(data.books.images)
  //console.log(data.books.list)
  setBottomBarVisibility(data.books.images.length)
  setNavButtons(data.books.slideNumber, data.books.images.length)
  updateCanvas(
    data.books.images[data.books.slideNumber],
    data.books.images.length
  )

  setBooksListHTML(data.names.nameList, data.books.studentBooks, data.books.list)
  updateStudentList(data.names.nameList);
  updateDownloadButton(data.names);
});


