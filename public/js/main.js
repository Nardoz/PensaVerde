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
