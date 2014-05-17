var url = window.location.href;
url = url.substr(url.indexOf('//') + 2);
var urlSegments = url.substr(0, (url.indexOf('?') > 0 ? url.indexOf('?') : url.length)).split(/\/{1}/);

console.log(urlSegments);

if(!urlSegments[1]){
  $('.menu-home').addClass('active');
} else {
  switch(urlSegments[1]){
    case 'search':
      $('.menu-projects').addClass('active');
      break;

    case 'project':
      $('.menu-post').addClass('active');
      break;
  }
}


$('#goTop').click(function(){
  $('html, body').animate({
    scrollTop: 0
  }, 1000);

  return false;
});

$('#searchForm').submit(function(){
  event.preventDefault();
  window.location.href = config.baseUrl + 'search?keywords=' + $('#keywords').val();
});
