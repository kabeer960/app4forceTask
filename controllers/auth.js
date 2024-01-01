const { User } = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const { handleResponse, handleError } = require("../utils/responses");

exports.login = (req, res) => {

  const body = req.body;

  User.findOne({
    where: {
      email: body.email,
    },
  })
    .then((user) => {
      if (!user) return handleError(res, "User Not found!", 404);

      var passwordIsValid = bcrypt.compareSync(
        body.password,
        user.password
      );

      if (!passwordIsValid) return handleError(res, "Invalid Password!", 401);

      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      handleResponse(res, {
        user,
        accessToken: token,
      });
    })
    .catch((err) => {
      handleError(res, err);
    });
};

exports.signUp = (req, res) => {

  const body = req.body;
  
  // Email
  User.findOne({
    where: {
      email: body.email,
    },
  }).then(async (user) => {
    if (user) return handleError(res, "Email is already taken!", 400);

    User.create({
      email: body.email,
      password: bcrypt.hashSync(body.password, 8),
      firstName: body.firstName,
      lastName: body.lastName,
    })
      .then((user) => {

        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 86400, // 24 hours
        });

        handleResponse(res, {
          user,
          accessToken: token,
        });
      })
      .catch((err) => {
        handleError(res, err);
      });
    // });
  });
};
