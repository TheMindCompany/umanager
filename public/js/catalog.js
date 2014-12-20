$(function() {
	$('.dropBtn').on('click', function () {
	    var dropValue = $(this).val();
	    $('input[name="grab"]').val(dropValue);
	    $('form[name=catalog]').trigger('submit');
	});
	
	//var getDays = function(){var days = '';if (obj.mon == true) days += 'M ';if (obj.tue == true) days += 'T ';if (obj.wed == true) days = 'W ';if (obj.thurs == true) days = 'Th '; if (obj.fri == true) var fri = 'F ';if (obj.sat == true) days = 'S ';if (obj.sun == trrue) days = 'Sun ';return days;};
});