function errorHandler(err,req,res,next) {
    let status 
    let message 
    // console.log(err,'masuk ga nih');

    switch (err.name) {
        case 'not-found':
            status = '404'
            message = 'Data not found'
            break;
        case `invalid Email/Password`:
            status = '401'
            message = 'Error login user not found atau password not matched'
            break;
        case 'JsonWebTokenError':
        case 'invalid-token':
            status = '401'
            message = 'Error authentication'
            break;
        case 'forbidden':
            status = '403'
            message = 'Forbidden error di Authorization'
            break;
        case 'InvalidInput':
            status = '400'
            message = 'Email/Password required'
            break;
        case 'SequelizeUniqueConstraintError':
        case 'SequelizeValidationError':
            status = '400'
            message = err.errors[0].message
            break;
        default:
            status = '500'
            message = 'Server internal error'
            break;
    }

    res.status(status).json({message})
}

module.exports = errorHandler