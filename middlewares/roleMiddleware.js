module.exports = (roles) => {
    return (req, res, next) => {
        // if (!roles.includes(req.user.role)) {
        //     return res.status(401).json({
        //         message: 'Unauthorized'
        //     });
        // }
        const userRole = req.body.role;
        if (roles.includes(userRole)) {
            next();
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            });
        }
    }
}