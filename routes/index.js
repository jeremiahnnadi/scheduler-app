const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Coursework = require('../models/coursework');
const conductor = require('../controllers/conductor');

// @desc Login/Landing Page
// @route GET
router.get('/', ensureGuest, conductor.login);

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, conductor.dashboard);

// @desc Process coursework POST request 
// @route POST /courseworks
router.get('/coursework/:id', ensureAuth, conductor.coursework);

// @desc Re-display Dashboard with Incomplete Coursework
// @route GET /incomplete
router.get('/incomplete', ensureAuth, conductor.incomplete);

// @desc Re-display Dashboard with Complete Coursework
// @route GET /complete
router.get('/complete', ensureAuth, conductor.complete);

// @desc Show Add page
// @route GET /courseworks/add
router.get('/add', ensureAuth, conductor.addCoursework);

// @desc Process coursework POST request 
// @route POST /courseworks
router.post('/add', ensureAuth, conductor.postCoursework);

// @desc Delete a coursework
// @route GET /deleteCoursework/{{_id}}
router.get('/coursework/delete/:id', ensureAuth, conductor.deleteCoursework);

// @desc Edit a coursework
// @route GET /deleteCoursework/{{_id}}
router.get('/coursework/edit/:id', ensureAuth, conductor.editCoursework);

// @desc Update a coursework
// @route GET /updateCoursework/{{_id}}
router.post('/:id', ensureAuth, conductor.updateCoursework);

module.exports = router;