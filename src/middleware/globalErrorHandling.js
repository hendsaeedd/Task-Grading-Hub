// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    if (err) {
        return res.status(400).json({
            message: err.message,
            status: 'error'
        })
    }
}


module.exports = errorHandler
