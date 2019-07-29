//Load User model
const User = require('../models/User');

const {messageContactForm, reportProblem} = require('../mailer/mailgun');

//@route  /api/admin/all-users
//@method GET
//@access Protected
//@desc   return a list of users, only accesible from the admin panel
exports.AllUsersController = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({ users });
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

//@route  /api/admin/contact
//@method POST
//@access public
//@desc   Send message from a contact form 
exports.ContactFormController = async(req, res) => {

  const { errors } = req;

  try {
    const { name, email, subject, message } = req.body;
    const msg = { name, email, subject, message };

    messageContactForm(msg);

    res.status(200).json({msg: "OK"});

  } catch (err) {
    errors.error = err;
    res.status(500).json(errors);
  }

}

//@route  /api/admin/report-problem
//@method POST
//@access public
//@desc   Send message from a contact form 
exports.ReportProblemController = async(req, res) => {

  const { errors } = req;

  try {
    const { category, subject, message } = req.body;
    const msg = { category, subject, message };

    reportProblem(msg);

    res.status(200).json({msg: "OK"});

  } catch (err) {
    errors.error = err;
    res.status(500).json(errors);
  }

}