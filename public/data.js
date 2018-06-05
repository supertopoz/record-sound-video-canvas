var getData = function () {
//var spreadsheetID = "1vuwPqV4Ib1sTxFUPUsuCIeNqd8TJcMcZDcVM9b1sH5s";
var spreadsheetID = "1tSHLkllPSvPOMebuyvm8wxzKFM6_1DG1btXAEfO68XA";
var studentUrl = "https://spreadsheets.google.com/feeds/list/" + 
                  spreadsheetID +"/1/public/values?alt=json";
var bookUrl = "https://spreadsheets.google.com/feeds/list/" + 
                 spreadsheetID +"/3/public/values?alt=json";


var studentDetails = function(url){
  return new Promise((resolve,reject)=> {
    axios.get(url).then((data)=>{
      var loader = document.getElementById('start-loader');
      var vidSound = document.getElementById('vidSound');
      loader.style.display = 'none';
      vidSound.style.display = 'grid';
      resolve(data)      
    }).catch(err =>{
      reject(err)
    })
  })
}

var bookDetails = function(url){
    
  return new Promise((resolve,reject)=>{
    fetch(url, function(x){
    }).then((x)=>{ 

      resolve(x)  
    }).catch(err =>{
      reject(err)
    })
  })
}

// Promise.all([studentDetails(studentUrl)]).then(function(values){
studentDetails(studentUrl).then(function(values){
   var studentList = [];
   var bookList = [];
   var student = {}
  values.data.feed.entry.forEach(function(item){
    var studentName = item.gsx$student.$t;
    studentList.push(studentName);
    student.name = studentName;
    student.books = [
       item.gsx$previousbookcode.$t +"_"+ item.gsx$previousbook.$t +"-" + 
          item.gsx$pages.$t ,
       item.gsx$currentbookcode.$t +"_"+ item.gsx$currentbook.$t + "-" +
          item.gsx$pages_2.$t

    ]

    
   
    bookList.push(student)
    student = {};
    })
  // store the book list in the state
  updateData.dispatch({type:'ADD_All_STUDENTS_BOOKS','value':bookList});
  creatNameList(studentList)
  // store the student list in the state
});

}
