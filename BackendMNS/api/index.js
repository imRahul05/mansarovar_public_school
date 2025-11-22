// api/index.js
import app from '../server.js';

// Explicit handler so there is no ambiguity
export default function handler(req, res) {
  return app(req, res);
}
