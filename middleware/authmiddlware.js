// import jwt from 'jsonwebtoken';

// export const protect = (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         token = req.headers.authorization.split(' ')[1];
//     }

//     if (!token) {
//         return res.status(401).json({ message: 'Not authorized' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.staff = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Token is not valid' });
//     }
// };
