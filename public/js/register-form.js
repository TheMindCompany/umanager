$('#add-transcript').click(function () {
	  var btn = $(this);
	  btn.button('adding...');
	  $.ajax('/credentials/register').always(function () {
		  pos++;
		  var $trans = $('#college-transcripts .row');
		  
		  $('input[name=transcript_college_record_number]').val(pos);
		  $trans.append('<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 list-group-item"><div class="col-xs-4 col-sm-4 col-md-4 col-lg-4"><div class="input-group"><div class="input-group-addon">GPA </div><input name="gpa_transcript_' + pos + '" placeholder="" type="input" class="form-control"></div></div><div class="col-xs-7 col-sm-7 col-md-7 col-lg-7"><div class="input-group"><div class="input-group-addon">School</div><input name="school_transcript_' + pos + '" placeholder="" type="input" class="form-control"></div></div><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 middle"><span class="badge">' + pos + '</span></div></div>');
		  console.log(pos, 'transcript');
	  });
	});