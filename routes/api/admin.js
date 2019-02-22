const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load Passport jwt authentication
const protected = passport.authenticate('jwt', { session: false });

//Validation
const validateContactForm = require('../../validation/contactForm');
const validateReportProblem = require('../../validation/reportProblem');

//Controllers
const { AllUsersController, ContactFormController, ReportProblemController } = require('../../controllers/admin');

//Authentication
const isAdmin = require('../../authorization/isAdmin');

//@route  /api/admin/all-users
//@method GET
//@access Protected
//@desc   return a list of users, only accesible from the admin panel
router.get('/all-users', protected, isAdmin, AllUsersController);

//@route  /api/admin/contact
//@method POST
//@access public
//@desc   Send message from a contact form
router.post('/contact', validateContactForm, ContactFormController);

//@route  /api/admin/report-problem
//@method POST
//@access public
//@desc   Send message from a contact form
router.post('/report-problem', validateReportProblem, ReportProblemController);

module.exports = router;
