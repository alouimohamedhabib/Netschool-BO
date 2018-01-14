var mongoose = require('./connect').mongoose;
var Lessons = require('./collections').Lessons;
var Teacher = require('./collections').Teachers;
var Person = require('./collections').Person;
var Story = require('./collections').Story;

var man = new Teacher({
    _id: new mongoose.Types.ObjectId(),
    name: "Aloui",
    lastname: "Samira",
    phone_number: "216 54 67 11 87",
    date_of_birth: "20/10/1990"
})
man.save(function (err) {
    console.log('teacher id : ' + man._id);
    var newlesson = new Lessons({
        title: "NodeJs",
        teacher: man._id,
        duration: 5,
        date: new Date(),
        student: 150
    })
    newlesson.save(function (err) {
        console.log('Lesson id : ' + newlesson._id);
    });

})


////////////////////////
