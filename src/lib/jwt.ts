import jwt from 'jsonwebtoken';

export function sign(payload, options) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    //expiresIn: '1d',
    ...options,
  });
}

export function verify(token, options) {
  return jwt.verify(token, process.env.JWT_SECRET, options);
}
