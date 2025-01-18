// Middleware to check if the user's email ends with '@gmail.com'
// Middleware to validate email domain
const validateEmailDomain = (req, res, next) => {
  const email = req.body.email;

  if (!email || !email.endsWith('@gmail.com')) {
    return res.status(403).json({ message: 'Invalid email domain. Only @gmail.com emails are allowed.' });
  }

  next();
};

  // Middleware to validate task length (<= 140 characters)
  const validateTaskLength = (req, res, next) => {
    const { title } = req.body;
  
    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }
  
    if (title.length > 140) {
      return res.status(400).json({ message: 'Task title cannot exceed 140 characters' });
    }
  
    next();
  };
  
  // Middleware to check if the content type is JSON
  const validateJSONContentType = (req, res, next) => {
    const contentType = req.headers['content-type'];
  
    if (contentType !== 'application/json') {
      return res.status(400).json({ message: 'Invalid content type. Only application/json is allowed.' });
    }
  
    next();
  };
  
  module.exports = {
    validateEmailDomain,
    validateTaskLength,
    validateJSONContentType,
  };
  