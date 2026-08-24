const pool = require('../config/database');

const testDatabase = async (req, res, next) => {
    try {
        const [rows] = await pool.query("select 1 + 1 as result");

        res.json({
            success: true, 
            database: "Connected",
            result: rows

        })
    } catch (error) {
        next(error)
    }
}

module.exports = testDatabase;