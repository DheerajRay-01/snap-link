import { asyncHandler } from "../utils/asyncHandler.js";
import { UAParser } from "ua-parser-js";

export const clickMiddleware = asyncHandler(async (req, _, next) => {
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  // Normalize IP (handle IPv6-mapped IPv4)
  let ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || req.ip;
  if (ip?.startsWith('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }
  if (ip === '::1' || ip === '127.0.0.1') {
    // Localhost fallback for dev (optional)
    ip = '8.8.8.8'; // Dummy IP for testing
  }

  const clickData = {
    ip,
    browser: result.browser?.name || 'Unknown',
    os: result.os?.name  || 'Unknown',
    userAgent, // raw UA string (optional)
  };

  req.clickData = clickData;
  next();
});
