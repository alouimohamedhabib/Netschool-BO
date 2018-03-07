var express = require('express');
var router = express.Router();
var db = require("../services/connect");
var teacher = require("../services/collections").Teachers;
var lessons = require("../services/collections").Lessons;


/**
 * get list of Teachers
 */
router.get('/teachers', function (req, res, next) {
    teacher.find().then(function (teachers) {
        res.render("teachers/list", {
            "teachers": teachers
        })
    });

})
router.get('/teachers/new', function (req, res, next) {
    res.render("teachers/new", {})

})




/**
 * @Todo : When DB server gone away Fix!
 */
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/lessons', function (req, res, next) {
    lessons.find().then(function (result) {
        res.render('courses', {
            courses: result,
            title: "Liste of courses"
        })
    })
});
// @todo : Edit course
// @todo : Delete course
// View course
router.get('/lessons/view/:id', function (req, res, next) {
    const id = req.param("id");

    lessons.findOne({ _id: id }).populate('teacher').exec(function (err, data) {
        if (err) return handleError(err);
        res.render('lessons/view', {
            lesson: data
        })
    });
})
//edit
router.get("/lessons/edit/:id", function (req, res, next) {
    var id = req.params.id;
    lessons.findOne({ _id: id }).exec(function (err, data) {
        res.render('lessons/edit',
            {
                lesson: data
            }
        )
    })
});

// create new

router.get("/lessons/new", function (req, res, next) {
    teacher.find().then(function (teacher) {
        res.render('lessons/new',
            {
                teacher: teacher
            }
        )
    })
});

//

router.post('/teachers/new', function (req, res, next) {
    /**
     * @var teacher Teachers
     */
    newteacher = new teacher({
        //_id: new require("mongoose").Type.ObjectId(), 

        lastname: req.body.lastname,
        phone_number: req.body.phone_number,
        date_of_birth: req.body.date_of_birth,

        name: req.body.name,

    })
    newteacher.save().then(function (teacher) {
        res.redirect("/teachers")
    })
    // res.render();

})

router.post("/lessons/new", function (req, res, next) {
    var Lesson = new lessons({
        // _id: new require("mongoose").Type.ObjectId(),
        title: req.body.title,
        duration: req.body.duration,
        date: req.body.date,
        student: req.body.student,
        description: req.body.description,
        teacher: req.body.teacher,

    })
    Lesson.save().then(function (teacher) {
        res.redirect('/lessons/view/' + teacher._id)
    })
});

// update lesson
router.post("/lessons/edit/:id", function (req, res, next) {
    lessons.findByIdAndUpdate(req.body._id, req.body, {}, function (err, record) {
        if (err)
            res.render('lessons/edit', {
                error: handleError(err)
            })
        console.log(record);
        res.render('lessons/edit',
            {
                success: true,
                lesson: record
            })
    }
    )
})


//datatable
router.post('/lessons/data', function (req, res) {
    var Model = lessons,
        datatablesQuery = require('datatables-query'),
        params = req.body,
        query = datatablesQuery(Model);

    query.run(params).then(function (data) {
        res.json(data);
    }, function (err) {

        res.status(500).json(req.body);
    });
});


module.exports = router;
