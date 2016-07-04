$(document).ready(function() {
  $('#score').html(0.0);
  $('#thisscore').html(0.0);
  $('#lenny').hide();
  // Place JavaScript code here...

});

var updateScoreDisplay = function(idOfDisplay, score) {
  $('#'+idOfDisplay).html(Number((score).toFixed(2)));
};

var doStuff = function() {
   // if(e.keyCode === 13) {
   //   var parameters = { search: $(this).val() };
   //   console.log(parameters);
  
   //  };
    var rollno = "";
    var selected = $("input[type='radio'][name='student']:checked");
    if (selected.length > 0) {
        rollno = selected.val();
        // console.log(rollno);
             $.get( '/students/'+rollno, function(data) {
               score = parseFloat($('#score').text());
               originalScore = score;
               // score = 0;
               score += data.name.score($('#name').val(), 0.5);
               updateScoreDisplay('nameScore', data.name.score($('#name').val(), 0.5));

               score += data.coursecode.score($('#course').val());
               updateScoreDisplay('courseScore', data.coursecode.score($('#course').val()));

               score += data.hallcode.score($('#hall').val());
               updateScoreDisplay('hallScore', data.hallcode.score($('#hall').val()));

               score += data.minor_coursename.score($('#minor').val());
               updateScoreDisplay('minorScore', data.minor_coursename.score($('#minor').val()));

               score += data.category.score($('#category').val());
               updateScoreDisplay('categoryScore', data.category.score($('#category').val()));

               score += data.rollno.score($('#rollno').val());
               updateScoreDisplay('rollnoScore', data.rollno.score($('#rollno').val()));

               cgpaFromUser = parseFloat($('#cgpa').val());
               cgpaFromDB = 0;
               numSem = 0;
               for (var i = 0; i < data.semesters.length; i++) {
                 sem = data.semesters[i];
                 if(sem.no > numSem) {
                  numSem = sem.no;
                  cgpaFromDB = sem.cgpa;
                 }
               }
               cgpaScore = 0;
               if(cgpaFromUser) {
                diffCGPA = cgpaFromDB - cgpaFromUser;
                 if(diffCGPA < 0)
                  diffCGPA = -diffCGPA;
                 cgpaScore = (3 - (diffCGPA));
               }

               score += cgpaScore;
               updateScoreDisplay('cgpaScore', cgpaScore);
               
               $('#score').html(Number((score).toFixed(2)));
               $('#thisscore').html(Number((score - originalScore).toFixed(2)));
               if(score > 10) {
                $('#lenny').show();
               }
               else{
                $('#lenny').hide();
               }

               $('#resName').html(data.name);
               $('#resCGPA').html(cgpaFromDB);
               $('#resCourse').html(data.coursecode);
               $('#resHall').html(data.hallcode);
               $('#resMinor').html(data.minor_coursename);
               $('#resCategory').html(data.category);
               $('#resRollno').html(data.rollno);
             });
    }
    console.log('whoops');


};  