export const userAuth = (req, res, next) =>{
    if (req.decoded.role === 'user' || req.decoded.role === 'admin') {
        next();
    } else {
        res.status(401).send('Unauthorized 1');
    }
}