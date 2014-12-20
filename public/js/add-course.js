$(function() {
	$('#subjects').on('click','li a', function( event ) {
	  $('#subject').val($(this).html());
	});
});