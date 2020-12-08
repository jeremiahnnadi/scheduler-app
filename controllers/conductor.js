const connectDB = require('../config/db');
const passport = require('../config/passport');
const Coursework = require('../models/coursework');

connectDB;

// @desc Login
exports.login = (req,res) => {
    res.render('login', {
        layout: 'login',
    })
}

// @desc Dashboard Page
exports.dashboard = async (req,res) => {
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        try {
            const coursework = await Coursework.find({ user: req.user.id, projectTitle: regex }).lean();
            if (coursework.length < 1) {
                res.render('courseworks/search-err', {
                    name: req.user.firstName,
                    profile_name: req.user.displayName,
                    picture: req.user.image,
                    coursework
                    })
            } else {
                res.render('dashboard', {
                name: req.user.firstName,
                profile_name: req.user.displayName,
                picture: req.user.image,
                coursework
                })
            }
        } catch (error) {
            console.error(error)
            res.render('error/500')
        }
    } else {
        try {
            const coursework = await Coursework.find({ user: req.user.id }).lean();
            // console.log(coursework);
            res.render('dashboard', {
            name: req.user.firstName,
            profile_name: req.user.displayName,
            picture: req.user.image,
            coursework
            })
        } catch (error) {
            console.error(error)
            res.render('error/500')
        }
    }
}

// @desc View a coursework
exports.coursework = async (req, res) => {
    const coursework = await Coursework.findOne({ _id: req.params.id}).lean();
    if(!coursework) {
    return res.render('error/404');
    } else {
        res.render('courseworks/coursework', {
            name: req.user.firstName,
            profile_name: req.user.displayName,
            picture: req.user.image, 
            coursework})
    }
}

// @desc Add a coursework 
exports.addCoursework = async (req,res) => {
    try {
        const coursework = await Coursework.find({ user: req.user.id }).lean();
        res.render('courseworks/add', {
        name: req.user.firstName,
        profile_name: req.user.displayName,
        picture: req.user.image,
        coursework
        })
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
}

// @desc POST a coursework 
exports.postCoursework = async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Coursework.create(req.body);
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
}

// @desc Delete a coursework 
exports.deleteCoursework = async (req, res) => {
    try {
        await Coursework.remove({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.render('error/500')
    }
}

exports.editCoursework = async (req, res) => {
    const coursework = await Coursework.findOne({ _id: req.params.id}).lean();
    if(!coursework) {
    return res.render('error/404');
    } else {
        res.render('courseworks/edit.hbs', {
            name: req.user.firstName,
            profile_name: req.user.displayName,
            picture: req.user.image, 
            coursework})
    }
}

exports.updateCoursework = async(req, res) => {
    try {
        let coursework = await Coursework.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    });
        res.redirect('/dashboard');
    } catch(err) {
        return res.render('error/500');
    }
}

exports.incomplete = async(req, res) => {
    try {
        const coursework = await Coursework.find({ user: req.user.id, status: 'Incomplete' }).lean();
        res.render('dash-i', {
            name: req.user.firstName,
            profile_name: req.user.displayName,
            picture: req.user.image, 
            coursework
        })
    } catch(err) {
        console.error(err);
        res.render('error/500.hbs');
    }   
}

exports.complete = async(req, res) => {
    try {
        const coursework = await Coursework.find({ user: req.user.id, status: 'Completed' }).lean();
        res.render('dash-c', {
            name: req.user.firstName,
            profile_name: req.user.displayName,
            picture: req.user.image, 
            coursework
        })
    } catch(err) {
        console.error(err);
        res.render('error/500.hbs');
    }   
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

