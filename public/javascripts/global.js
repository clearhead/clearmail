$(function(){
  $('button').click(function(){
    methodList.addUser();
  });
});


var methodList = {
  addUser: function() {
    var data = {
      email: $('.email').val(),
      fullname: $('.fullname').val()
    };

    $.post(
      '/api/adduser',
      data,
      function(data){
        methodList.displayUsers(data);
      }
    );
  },

  displayUsers: function(userAry) {
    var htmlStr = '<ul>';
    $.each(userAry, function(){
      htmlStr += '<li>Name: ' + this.fullname + '</li>';
    });
    htmlStr += '</ul>';
    
    $('#user-list ul').html(htmlStr);
  }
};