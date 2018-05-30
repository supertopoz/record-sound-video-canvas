/*var expect = chai.expect;

describe("Book interface", function() {
  describe("updateBooksListHTML", function() {
    it("should create a filtered list of student's books", function() {

      var nameList = ["장두영","임연석","이정민"]
      var studentBooks = [{
        "name" : "장두영",
        "books":[
        "0014_Reading Rookie 1 Book 5 Jungle Colors",
        "0014_Reading Rookie 1 Book 5 Jungle Colors"
        ]
      },
      {
        "name" : "임연석",
        "books":[
        "0013_I Love Stories Book 6 Weather",
        "0013_I Love Stories Book 6 Weather"
        ]
      }]
      var bookCheckBoxes  = {
                            "0014": {"checked": true},
                            "0013": {"checked": false}

                            }

      var refinedList = setBooksListHTML(nameList,studentBooks, bookCheckBoxes)
      expect(refinedList).to.deep.equal( ["0014_Reading Rookie 1 Book 5 Jungle Colors", "0013_I Love Stories Book 6 Weather"]);
    });

    it("should return an HTML string with two books", function() {
      var bookCheckBoxes  = {
                            "0014": {"checked": true}
                            }
      var bookList = ["0014_Reading Rookie 1 Book 5 Jungle Colors"]
      var HTMLString = createBooksListHTML(bookList, bookCheckBoxes)
      var checked = "checked"
      var string = '<label class="container">' +
                '<input'+
                  ' class="container-input"'+
                  ' id="0014"'+ 
                  ' onclick="checkbox(this)"'+ 
                  ' type="checkbox" '+ 
                  checked +  
                  '/>'+
                  '<span class="checkmark" ></span>'+
                  'Reading Rookie 1 Book 5 Jungle Colors'+
                  '</label>'
      expect(HTMLString.length).to.equal(193);
      expect(HTMLString).to.equal(string);
    });
  });
  describe('Book Navigation interface', function(){
    it("should set visibility of the bottom navigation to grid", function() {
      var imageArrayLength = 3      
       expect(setBottomBarVisibility(imageArrayLength)).to.equal('grid')
    });
    it("should set visibility of the bottom navigation to none", function() {
      var imageArrayLength = 0      
       expect(setBottomBarVisibility(imageArrayLength)).to.equal('none')
    });
    it("should handle no argument case", function() {   
       expect(setBottomBarVisibility()).to.equal('none')
    }); 
    it("should deacivate back navigation button on first slide", function() { 
      var result = setNavButtons(slideNumber = 0, 0)
      var data = result[0].style["pointer-events"]
       expect(data).to.equal('none')
    });
    it("should deacivate forward navigation button on last slide", function() {
      var result = setNavButtons(currentSlideNumber = 4, imageArrayLength = 5)
      var data = result[1].style["pointer-events"]
       expect(data).to.equal('none')
    });
    it("should set opacity pointerStatus to 0.4 and 'none' - nav", function() {
      var result = setNavButtonsHelper('prev', 'none');
      var pointer = result.style["pointer-events"];
      var opacity = result.style.opacity;
      expect(pointer).to.equal('none')
      expect(opacity).to.equal('0.4')
    });
    it("should set opacity pointerStatus to 1 and 'auto' - nav", function() {
      var result = setNavButtonsHelper('next', 'auto');
      var pointer = result.style["pointer-events"];
      var opacity = result.style.opacity;
      expect(pointer).to.equal('auto')
      expect(opacity).to.equal('1')
    });
    it("should add a blank image to canvas if image is undefined", function() {
      var result = updateCanvas(undefined, '');
      var imageUrl = result.src
      expect(imageUrl).to.equal('http://127.0.0.1:8887/assets/blank.png')
    });
    it("should add an new image to canvas", function() {
      var result = updateCanvas('./assets/0021/Image0.jpg', 1);
      var imageUrl = result.src
      expect(imageUrl).to.equal('http://127.0.0.1:8887/assets/0021/Image0.jpg')
    });
    it("should create an array of file paths", function() {
      var func = createFilePathList({"0021": {"checked": true}});
      var result =  ["./assets/0021/Image0.jpg", "./assets/0021/Image1.jpg", "./assets/0021/Image2.jpg", "./assets/0021/Image3.jpg", "./assets/0021/Image4.jpg", "./assets/0021/Image5.jpg", "./assets/0021/Image6.jpg", "./assets/0021/Image7.jpg", "./assets/0021/Image8.jpg"]
      expect(func).to.deep.equal(result)
    });
  });

});*/