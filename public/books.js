var clickBooks = function(e){
  document.getElementById('book-list').style.display = "block";
}

var menu = document.getElementById('close-books');
menu.addEventListener('click', function(e){
  document.getElementById('book-list').style.display = "none";
})

var bookSelector = document.querySelector('.container-input');
// bookSelector.addEventListener('click', function(e){
//   console.log('working')
//  // document.getElementById('book-list').style.display = "none";
// })

var createBooksListHTML = function(bookList, bookCheckBoxes = {}){
  return bookList.reduce(function(string, book){
    var checked = "";
    var id = book.substring(0,4) // book.replace(/ /g, "_");
    var bookTitle = book.substring(5);
    if(bookCheckBoxes[id] && bookCheckBoxes[id].checked === true){
      checked = 'checked'
    } 
    string += '<label class="container">' +
                '<input'+
                  ' class="container-input"'+
                  ' id="'+ id +'"'+ 
                  ' onclick="checkbox(this)"'+ 
                  ' type="checkbox" '+ 
                  checked +
                  '/>'+
                  '<span class="checkmark" ></span>'+
                  bookTitle +
                  '</label>'            
    return string;
  },'')
}

var setBooksListHTML= function(nameList, studentBooks, bookCheckBoxes){
  var booksArray = [];
  var bookListData = document.getElementById('book-list-data')
  bookListData.innerHTML = '';
  var html = ``;
  var booksObj = {}
  studentBooks.forEach(function(item){
    if(nameList.indexOf(item.name) >= 0){
      booksObj[item.books[0]] = true;
      booksObj[item.books[1]] = true;
    }
  })
  bookListData.innerHTML = createBooksListHTML(Object.keys(booksObj), bookCheckBoxes);
  return (Object.keys(booksObj));
}