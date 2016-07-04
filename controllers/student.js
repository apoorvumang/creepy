/**
 * GET /students
 * List all students.
 */
var Student = require('../models/Student.js');
var async = require('async');


exports.getResult = (req, res) => {
  console.log(req.params.rollno);
  Student.findOne({rollno:req.params.rollno}, function (err, doc) {
    if(err || !doc) {
      res.send('Error');
    } else {
      res.send(doc);
    }   
  });
}

exports.getStudents = (req, res) => {
  numStudents = 9;
  queries = [];
  for (var i = 0; i < numStudents; i++) {
    queries.push(function (cb) {
      Student.find({rollno: /^11/,rand:{$gte:Math.random()}}, {_id:0}).sort({rand:1}).limit(1).exec(function (err, docs) {
          if (err) {
              throw cb(err);
          }
          // do some stuff with docs & pass or directly pass it
          if (!docs.length) {
              // do stuff here
            Student.find({rollno: /^11/,rand:{$lte:Math.random()}}, {_id:0}).sort({rand:1}).limit(1).exec(function (err, docs) {
              if (err) {
                throw cb(err);
              }
              cb(null, docs[0]);
            });
          }
          else {
            cb(null, docs[0]);
          }
          
      });
    })   
  }


  async.parallel(queries, function(err, docs) {
      // if any query fails
      if (err) {
          throw err;
      }
      // var merged = [].concat.apply([], docs);
      // console.log(docs[0]);
      // res.render('students', { students: docs });
      Student.findOne({rollno: /^11/}, {_id:0}, function (err, docs) {
        res.send(docs);
      });
      // res.send(Math.random());
  })

  // Student.findOne({rollno:'11CS30005'}, function(err, docs) {
  //   res.send(docs);
  // });

};