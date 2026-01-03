import app from "./app.js";
import dbConnection from "./tests/dbConnection.js";
import logger from "./utils/winston.logger.js";

const req = await dbConnection();

if (req) {
	app.listen(process.env.PORT, () => {
		logger.info(`http://localhost:${process.env.PORT}`);
	});
} else {
	logger.error("Server is not running, check the logs.");
}
