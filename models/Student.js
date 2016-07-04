const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

// var studentSchema = new mongoose.Schema({
//   name: String,

// });


var studentSchema = new mongoose.Schema({
  Remarks: String,
  category: String,
  coursecode: String,
  coursename: String,
  current_status_desc: String,
  deptcode: String,
  deptname: String,
  eAA: String,
  email: String,
  fac_adv: String,
  hallcode: String,
  inst_email: String,
  micro_coursename: String,
  minor_coursename: String,
  mob: Number,
  name: String,
  nature_of_admission: String,
  overall_min_crd_req: Number,
  rollno: String,
  semno: Number,
  sex: String,
  showSemno: Number,
  subReq: Number,
  semesters: [{  
    sgpa: Number,
    tot_add_cred_taken: Number,
    sem_cred_cleared: Number,
    add_cgpa: Number,
    add_cred_taken: Number,
    tot_add_cred_cleared: Number,
    add_cred_cleared: Number,
    courses:[  
      {  
        ltp: String,
        name: String,
        no: String,
        grade: String,
        credit: Number,
        type: String,
      }
    ],
    tot_cred_taken: Number,
    add_sgpa: Number,
    tot_cred_cleared: Number,
    no: Number,
    cgpa: Number,
    sem_cred_taken: Number,
    }
  ],
  rand: Number,
});

var Student = mongoose.model('Student', studentSchema);
module.exports = Student;
