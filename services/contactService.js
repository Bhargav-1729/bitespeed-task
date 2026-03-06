const Contact = require("../models/Contact");
const { Op } = require("sequelize");

exports.identifyContact = async (email, phoneNumber) => {

  const contacts = await Contact.findAll({
    where: {
      [Op.or]: [
        { email: email },
        { phoneNumber: phoneNumber }
      ]
    },
    order: [["createdAt", "ASC"]]
  });

  if (contacts.length === 0) {

    const newContact = await Contact.create({
      email,
      phoneNumber,
      linkPrecedence: "primary"
    });

    return {
      primaryContactId: newContact.id,
      emails: [email],
      phoneNumbers: [phoneNumber],
      secondaryContactIds: []
    };
  }

  const primary = contacts.find(c => c.linkPrecedence === "primary") || contacts[0];

  const secondaryContacts = contacts.filter(c => c.id !== primary.id);

  const emailSet = new Set();
  const phoneSet = new Set();

  contacts.forEach(c => {
    if (c.email) emailSet.add(c.email);
    if (c.phoneNumber) phoneSet.add(c.phoneNumber);
  });

  if (
    (email && !emailSet.has(email)) ||
    (phoneNumber && !phoneSet.has(phoneNumber))
  ) {

    const newSecondary = await Contact.create({
      email,
      phoneNumber,
      linkedId: primary.id,
      linkPrecedence: "secondary"
    });

    secondaryContacts.push(newSecondary);
  }

  emailSet.add(email);
  phoneSet.add(phoneNumber);

  return {
    primaryContactId: primary.id,
    emails: [...emailSet].filter(Boolean),
    phoneNumbers: [...phoneSet].filter(Boolean),
    secondaryContactIds: secondaryContacts.map(c => c.id)
  };
};