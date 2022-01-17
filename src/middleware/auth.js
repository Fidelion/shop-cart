const middlewareDecode = (req, res, next) => {
    const token = req.header('userid-key');

    if(!token){
        return res.status(400).json({
            msg: 'No token. Authorization deined'
        });
    }

    console.log(token);

    next();
}   

module.exports = {
    middlewareDecode
}