
module.exports = async (req, res, next) => {
    if (req.session.userID) {
        return res.status(200).redirect('/');
    }
    next();
}