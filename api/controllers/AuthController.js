/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: function (req, res) {
    User.findOne({
      email: req.param('email')
    }).exec((err, user) => {
      if (err)
        throw "Invalid Input";
      if (user.password != req.param('password')) {
        return res.status(400).send({
          message: 'Invalid Password'
        });
      } else
        return res.json(user)
    })
  },
};
