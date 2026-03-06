const { identifyContact } = require("../services/contactService");

exports.identify = async (req, res) => {

  try {

    const { email, phoneNumber } = req.body;

    const result = await identifyContact(email, phoneNumber);

    res.status(200).json({
      contact: result
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Internal Server Error"
    });

  }

};