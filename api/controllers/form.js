const User = require("../../models/User");

const submit = (req, res, next) => {
  const { personalNumber, phoneNumber, email, country } = req.body;
  const newUser = new User({
    personalNumber,
    phoneNumber,
    country,
    email
  });
  newUser
    .save()
    .then(user => res.json(user))
    .catch(error => next(error));
};

module.exports = {
  submit
};
