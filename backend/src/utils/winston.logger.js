import winston from "winston";
import fs from "fs";
import path from "path";

const logs = "logs";

if (!fs.existsSync(logs)) {
	fs.mkdirSync(logs, { recursive: true });
}

const { combine, timestamp, json, errors, colorize, printf } = winston.format;

const timeFormat = timestamp({ format: "YYYY-MM-DD HH:mm:ss" });

const consoleFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
	level: "info",
	format: combine(timeFormat, errors({ stack: true }), json()),
	transports: [
		new winston.transports.File({
			filename: path.join(logs, "error.log"),
			level: "error",
		}),
		new winston.transports.File({
			filename: path.join(logs, "combined.log"),
		}),
	],
});

if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.Console({
			format: combine(timeFormat, colorize(), consoleFormat),
		})
	);
}

export default logger;
