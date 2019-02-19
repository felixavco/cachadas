//Load User model
const User = require('../models/User');

const {messageContactForm, reportProblem} = require('../nodeMailer/gmailSMTP')

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

    const info = await messageContactForm(msg);

    const data = {
      response: info.response,
      messageId: info.messageId,
      rejected: info.rejected.length > 0 ? true : false,
      accepted: info.accepted.length > 0 ? true : false,
      messageSize: info.messageSize,
      messageTime: info.messageTime,
      envelopeTime: info.envelopeTime,
      envelope: {
        from: email,
        to: "contact@cachadas.com"
      }
    }

    res.status(200).json(data);

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

    await reportProblem(msg);

    res.status(200).json({msg: "OK"});

  } catch (err) {
    errors.error = err;
    res.status(500).json(errors);
  }

}