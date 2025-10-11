// middleware/logger.js
const { format } = require("date-fns/format");
const { v4: uuid } = require("uuid");

/**
 * Log events to console (Vercel captures console output)
 * @param {string} message - Log message
 * @param {string} logFileName - Log file name (for categorization)
 */
const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const logId = uuid();
  const logItem = `${dateTime}\t${logId}\t${message}`;
  
  // Console logging for Vercel (appears in Function Logs)
  console.log(`[${logFileName}] ${logItem}`);
};

/**
 * Express middleware for logging HTTP requests
 */
const logger = (req, res, next) => {
  const origin = req.headers.origin || 'Direct';
  const logMessage = `${req.method}\t${origin}\t${req.url}`;
  
  logEvents(logMessage, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  
  next();
};

module.exports = { logEvents, logger };