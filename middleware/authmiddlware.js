import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.role_data = decoded;
        console.log(decoded);
        
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

export const adminOnly  = (req,res,next) =>{
    if(req.role_data.role != 'admin'){
        res.status(403).json({message:'access denied!'})
    }
    next()
}

export default {protect,adminOnly};
