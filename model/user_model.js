const bcrypt = require("bcrypt");
const db = require("../db/db");

const User = {
    create(username, email, password) {
        const password_digest = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

        const sql = `
            INSERT INTO users(username, email, password_digest)
            VALUES($1, $2, $3)
            RETURNING *
        `

        return db.query(sql, [username, email, password_digest])
            .then(dbResponse => {
                return dbResponse.rows[0];
            });
    },
    findByEmail(email) {
        const userEmail = email
        const sql = `
            SELECT * FROM users WHERE email = $1
        `
        return db.query(sql, [userEmail])
            .then(dbResponse => {
                return dbResponse.rows[0];
            });
    }
}

module.exports = User;