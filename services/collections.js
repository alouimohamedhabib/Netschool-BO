// get database connector
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// teachers
var teachers = new Schema(
    {
        
        name: {type: String, required: true, index: 1},
        lastname: {type: String, required: true},
        phone_number: {type: String},
        date_of_birth: {type: String, default: Date.now},
        lessons: [{type: Schema.Types.ObjectId, ref: 'Lessons'}]
    }
);
teachers.method.FullName = function () {
    return this.name + ' ' + this.lastname
}
// lessons collections
var lessons = Schema(
    {
        title: {type: String, required: true, index: 1},
        duration: {type: Number, required: true},
        date: {type: Date, default: Date.now},
        student: {type: Number},
        description: {type: String},
        teacher: {type: Schema.Types.ObjectId, ref: 'Teachers'},
    }
);
var personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{type: Schema.Types.ObjectId, ref: 'Story'}]
});

var storySchema = Schema({
    author: {type: Schema.Types.ObjectId, ref: 'Person'},
    title: String,
    fans: [{type: Schema.Types.ObjectId, ref: 'Person'}]
});

module.exports = {
    Teachers: mongoose.model('Teachers', teachers),
    Lessons: mongoose.model("Lessons", lessons),
    Story: mongoose.model('Story', storySchema),
    Person: mongoose.model('Person', personSchema)
}
// exports.teachers = mongoose.model('teachers', teachers);
// exports.lessons = lessonsModel;





