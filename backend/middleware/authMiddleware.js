// const jwt = require('jsonwebtoken');
// const asyncHandler = require('express-async-handler');
// const User = require('../models/UserModel');


// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//       req.user = await User.findByPk({ where: { id: decoded.id }, attributes: { exclude: ['Password'] } });
//       next();
//     } catch (error) {
//       console.log(error);
//       res.status(400).send({
//         message: 'Not authorized',
//       });
//     }
//   }

//   if (!token) {
//     res.status(400).send({
//       message: 'Not authorized, no token',
//     });
//   }
// });

// module.exports = { protect };