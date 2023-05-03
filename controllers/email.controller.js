const sendEmail = require('../services/sendEmail');

exports.newEmail = async (req, res) => {
    try {
        const { email, subject, text } = req.body;
        const sent = await sendEmail(email, subject, text);
        res.status(200).send(`Email sent successful! : ${sent}`);
    } catch (error) {
        res.status(500).send(error);
    }
}