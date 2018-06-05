var clickBooks = function(e){
  document.getElementById('book-list').style.display = "block";
}

// var menu = document.getElementById('close-books');
// menu.addEventListener('click', function(e){
//   console.log('working')
//   document.getElementById('book-list').style.display = "none";
// })


document.addEventListener('click', function(e){
  var element = document.getElementById("book-list");
  if(e.target.id === "close-books"){ 
    element.style.display = 'none'
  } 
})

var scrollWin = function() {
    window.scrollTo(0, 1000);  
}

var bookSelector = document.querySelector('.container-input');

var createBooksListHTML = function(bookList, bookCheckBoxes = {}){
  return bookList.reduce(function(string, book){
    var checked = "";
    var target = book.lastIndexOf('-');
    var pages =  book.substring(target)
    var id = book.substring(0,4) + pages // book.replace(/ /g, "_");
    var imageId = book.substring(0,4) // book.replace(/ /g, "_");
    var bookTitle = book.substring(5);
    if(bookCheckBoxes[id] && bookCheckBoxes[id].checked === true){
      checked = 'checked'
    } 
    string += '<div class="book-set">'+
                '<img width="150" src="/assets/'+imageId+'/Image1.jpg" />'+
                '<label class="container">' +

                '<input'+
                  ' class="container-input"'+
                  ' id="'+ id +'"'+ 
                  ' onclick="checkbox(this)"'+ 
                  ' type="checkbox" '+ 
                  checked +
                  '/>'+
                  '<span class="checkmark" ></span>'+
                  bookTitle +
                  '</label>'  +
              '</div>'
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