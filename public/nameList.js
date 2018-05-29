// const nameList = [
// "장두영",
// "임연석",
// "이정민",
// "박보경",
// "최유준",
// "박세현",
// "장다연",
// "김민서",
// "안선우",
// "김지민",
// "임연주",
// "박재은",
// "정찬우",
// "김지후",
// "이정호",
// "문지현",
// "김보미",
// "김효미",
// "박현준",
// "박기혁"
// ]

const creatNameList = function(nameList = []){
  var html = ''
  var list = document.getElementById('nameList');
  nameList.forEach(function(item){
    html += `<div class="nameItem">${item}</div>`
  })
  list.innerHTML = html
}

