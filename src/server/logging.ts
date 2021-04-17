import winston from "winston";
import "../extensions/date";

const date = new Date();

const folderName = "logs/" + date.toFileName();
const errorFileName = folderName + "/error.log";
const allFileName = folderName + "/all.log";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    ({ level, message, timestamp }) => `[${timestamp}] [${level}]: [${message}]`
  )
);

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    ({ level, message, timestamp }) => `[${timestamp}] [${level}]: [${message}]`
  )
);

const transports = [
  new winston.transports.Console({ format: consoleFormat }),
  new winston.transports.File({
    filename: errorFileName,
    level: "error",
    format: fileFormat,
  }),
  new winston.transports.File({ filename: allFileName, format: fileFormat }),
];

export const Logger = winston.createLogger({
  level: level(),
  levels,
  transports,
});
