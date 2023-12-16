const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  // Get the token from headers, cookies, or wherever you store it
  const authHeader = req.headers.authorization; // Assuming the token is sent in the Authorization header

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  // Split the header to get the token part
  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid token format.' });
  }

  const token = tokenParts[1];

  // Verify the token
  jwt.verify(token, '123456789', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token not valid.' });
    }
    
    req.user = decoded;
    next(); 
  });
};


module.exports = validateToken;
