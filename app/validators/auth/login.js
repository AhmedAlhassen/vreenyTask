const { body } = require('express-validator')

module.exports = (() => {
    return [
        body('email')
            .isEmail()
            .withMessage('Email needs to be a valid address!'),

        body('password')
            .notEmpty()
            .withMessage('Password cannot be empty!')
    ]
})()