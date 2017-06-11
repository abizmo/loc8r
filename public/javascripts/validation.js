$('#addReview').submit(function (e) {
  $('.alert.alert-danger').hide();
  if (!$('input#name').val() || !$('select#rating').val() || !$('textarea#review').val()) {
    if ($('.alert.alert-danger').length) {
      $('.alert.alert-danger').show();
    } else {
      $(this).prepend('<div role="alert" class="alert alert-danger">All fields required, please try again</div>');
    }
    return false;
  }
});

$('#addTime').submit(function (e) {
  $('.alert.alert-danger').hide();
  if (!$('input#days').val() || (!$('input#closed').is(':checked') && ((!$('input#opening').val() && $('input#opening').val()!== '') || (!$('input#closing').val() && $('input#opening').val()!== '')))) {
    if ($('.alert.alert-danger').length) {
      $('.alert.alert-danger').show();
    } else {
      $(this).prepend('<div role="alert" class="alert alert-danger">Days field is required! Does it have hours? or is it closed?, please try again.</div>');
    }
    return false;
  }
});
