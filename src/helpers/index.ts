const jwt = require('jsonwebtoken');

export const getUserId = (req: {
  headers: { authorization: string };
}): number => {
  const token = req.headers.authorization.split(' ')[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return payload.userId;
};
