const BaseException = require('./base-exception')

class InvalidCredentialException extends BaseException {

    constructor(message = 'Invalid login credentials!', status = 403) {
        super(message, status)
    }

}

module.exports = InvalidCredentialException