const creatNameList = function(nameList = []){
  var html = ''
  var list = document.getElementById('nameList');
  nameList.forEach(function(item){
    html += `<div class="nameItem">${item}</div>`
  })
  list.innerHTML = html
}

