var fileCount = 0;
function post(){
  var data = $('.textArea').val();
$.ajax({
  url:'/api/text',
  method:'post',
  data: {
    text: data
  },
  success: function (response){
      $(data).text(response.dataText);
      console.log(data);
      addMessage();
    },
  })
}

$(document).ready(function(){
  addItems();
});
function get(){
  var data = $('.textArea').val();
  $.ajax({
    url:'/api/text',
    method:'get',
    success: function (preview){
      $('.textArea').text(preview.dataText);
      // console.log(data);
    }
  })
}
function addMessage(){
swal("Data successfully updated",  "You changed file", "success")
}
function addItems(){
 $.ajax({
      url: '/api/items',
      method: 'get',
      success: function (result){
        // console.log(result.dataText);
        for (var i = 0; i< result.dataText.length; i++){

          var itemsRow = $('.item').clone();

          $(itemsRow).find('.row-'+i).text(i);
          fileCount++;
          // $(itemsRow).find('.column-0').text(fileCount);
          $(itemsRow).find('.item').attr('data-name', result.dataText[i]);
          // console.log(result.dataText[i])
          $(itemsRow).find('.column-1').text(result.dataText[i]);
          $(itemsRow).removeClass('item');
          $('table >tbody').append($(itemsRow));
          $(itemsRow).addClass('row-'+parseInt(result.length+1));
        }
      }
   })
}

function getFile(elem){
var file = $(elem).text();
var fileName = $.trim(file);
  $.ajax({
    url: 'api/items/'+fileName,
    method: 'get',
    success: function(result){
      var value = result.dataText;
      var myWindow = window.open("");
      myWindow.document.write("<textarea class = 'form-control' rows='5'>"+value+ "</textarea>")

      console.log(fileName);
      // $('.textArea').text(result.dataText)
      }
  })
}

function createFile(){
  var newFile = $('.newFile').val();
  var fileText = $('.textArea2').val();
    $.ajax({
      url: 'api/new/'+newFile,
      method: 'post',
      data: {
        text: fileText
      },
      success: function(file){
        $(fileText).text(file.dataText);
        console.log(fileText);
      }
    })
}

  function newFile(){
    location.href = "http://localhost:8080/newfile";
    }
function openFile(){
  location.href = "http://localhost:8080/openfile"

}
