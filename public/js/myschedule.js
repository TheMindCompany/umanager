$(function() {
	$('.dropListBtn').on('click', function () {	    
	    var listValue = $('select[name="teach-class-list"]').val();
	    $('input[name="grab"]').val(current[$('input[name="grab"]').val()].students[listValue].id);
	    $('form[name=teach-class-list]').attr('action','/student/drop').trigger('submit');
	});

	$('.viewHistoryListBtn').on('click', function () {	    
	    var listValue = $('select[name="teach-class-list"]').val();
	    $('input[name="grab"]').val(current[$('input[name="grab"]').val()].students[listValue].user._id);
	    
	    $('form[name=teach-class-list]').attr('action','/student/history/' + $('input[name="grab"]').val()).trigger('submit');
	    
	});

	$('.dropBtn').on('click', function () {
	    var dropValue = $(this).val();
	    $('input[name="grab"]').val(dropValue);
	    
	    $('form[name=teach-class-list]').attr('action','/student/drop').trigger('submit');
	});
	
	$('.studentsBtn').on('click', function () {
	    var position = $(this).val();
	    $('input[name="grab"]').val(position);
	    $('select[name=teach-class-list]').find('option').remove().end();
	    $('select[name=teach-class-list]').empty();
	    current = schedule;
	    $('#student-list-title').empty();
	    $('#student-list-title').append('( ' + schedule[position].course.code + ' )  ' + schedule[position].course.name);
	    for(i in schedule[position].students){
	    	$('select[name=teach-class-list]').append('<option value="' + i + '">' + schedule[position].students[i].user.first + ' ' + schedule[position].students[i].user.last + '</option>');
	    }
	});
	$('.studentsPendingBtn').on('click', function () {
	    var position = $(this).val();
	    $('input[name="grab"]').val(position);
	    $('select[name=teach-class-list]').find('option').remove().end();
	    $('select[name=teach-class-list]').empty();
	    current = pending;
	    $('#student-list-title').empty();
	    $('#student-list-title').append('( ' + pending[position].course.code + ' )  ' + pending[position].course.name);
	    for(i in pending[position].students){
	    	$('select[name=teach-class-list]').append('<option value="' + i + '">' + pending[position].students[i].user.first + ' ' + pending[position].students[i].user.last + '</option>');
	    }
	});
});