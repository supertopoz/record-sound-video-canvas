const localData = {
  "0000":{
    "pages": 0,
    "checked": false
  },
  "0001":{
    "pages": 9
  },
  "0002":{
    "pages": 11
  },
  "0003":{
    "pages": 11
  },
  "0004":{
    "pages": 13
  },
  "0012":{
    "pages": 10
  },
  "0013":{
    "pages": 11
  },
  "0014":{
    "pages": 10
  },
  "0019":{
    "pages": 10
  },
  "0020":{
    "pages": 10
  },
  "0021":{
    "pages": 9
  },
  "0022":{
    "pages": 9
  }
}


var spreadsheetID = "1vuwPqV4Ib1sTxFUPUsuCIeNqd8TJcMcZDcVM9b1sH5s";
var studentUrl = "https://spreadsheets.google.com/feeds/list/" + 
                  spreadsheetID +"/2/public/values?alt=json";
var bookUrl = "https://spreadsheets.google.com/feeds/list/" + 
                 spreadsheetID +"/3/public/values?alt=json";
var studentDetails = function(url){
  console.log(new Date())
  return new Promise((resolve,reject)=>{
    axios.get(url).then((x)=>{
      console.log(x)
      resolve(x)
      
    }).catch(err =>{
      reject(err)
    })
  })
}

var bookDetails = function(url){
    
  return new Promise((resolve,reject)=>{
    axios.get(url, function(x){
    }).then((x)=>{ 
      resolve(x)  
    }).catch(err =>{
      reject(err)
    })
  })
}

// Promise.all([studentDetails(studentUrl)]).then(function(values){
studentDetails(studentUrl).then(function(values){
  console.log(new Date())
   var studentList = [];
   var bookList = [];
   var student = {}
  values.data.feed.entry.forEach(function(item){
    var studentName = item.gsx$student.$t;
    studentList.push(studentName);
    student.name = studentName;
    student.books = [
       item.gsx$previousbookcode.$t +"_"+ item.gsx$previousbook.$t,
       item.gsx$currentbookcode.$t +"_"+ item.gsx$currentbook.$t
    ]

    
   
    bookList.push(student)
    student = {};
    })
  // store the book list in the state
  updateData.dispatch({type:'ADD_All_STUDENTS_BOOKS','value':bookList});
  creatNameList(studentList)
  // store the student list in the state
});
