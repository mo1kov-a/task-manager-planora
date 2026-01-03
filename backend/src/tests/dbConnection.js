import pool from "../config/database.js";
import logger from "../utils/winston.logger.js";

async function dbConnection() {
	try {
		const req = await pool.query("SELECT NOW()");
		if (req && req.rowCount > 0) {
			logger.info("Database is connected.", JSON.stringify(req.rows[0]));
			return true;
		}
	} catch (err) {
		logger.error("Database is not connected.", {
			error: err,
		});
		return false;
	}
}

export default dbConnection;
