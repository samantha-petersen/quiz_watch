// // use for the add function
// `INSERT INTO quiz_reminders (testdate) VALUES (TIMESTAMP '2021-07-28 21:24:08');`

const session = require('express-session');
const db = require('../db/db');

const Flashcards = {
    // Creating new flashcards after the user has logged in
    create(userId, category, question, hint, answer) {
        const sql = `
            INSERT INTO flashcards(user_id, category, question, hint, answer, reminder)
            VALUES($1, $2, $3, $4, $5, now())
            RETURNING *
        `
        return db.query(sql, [userId, category, question, hint, answer])
            .then(dbResponse => {
                return dbResponse.rows[0]
            })
    },
    // getting all the flashcards for the user
    flashcardsForUser(userId) {
        const sql = `
            SELECT * FROM flashcards WHERE user_id = $1
        `
        return db.query(sql, [userId])
            .then(dbResponse => {
                return dbResponse.rows
            })
    },
    // getting only the due flashcards for the user
    flashcardsDue(userId) {
        const sql = `
            SELECT * FROM flashcards WHERE user_id = $1 and reminder < now()
        `
        return db.query(sql, [userId])
            .then(dbResponse => {
                return dbResponse.rows
            })
    },
    // updating flashcard to a new reminder
    updateFlashcardReminder(timestamp, id) {
        const sql = `
            UPDATE flashcards SET reminder =  (to_timestamp($1,'YYYY-MM-DD hh24:MI:SS')) WHERE id = $2;
        `
        return db.query(sql, [timestamp, id])
            .then(dbResponse => {
                return dbResponse.rows
            })
    },
    // edit flashcards
    updateFlashcardForm(question, hint, answer, id) {
        const sql = `
            UPDATE flashcards SET question = $1, hint = $2, answer = $3 WHERE id = $4;
        `
        return db.query(sql, [question, hint, answer, id])
            .then(dbResponse => {
                return dbResponse.rows
            })
    },

    // Deleting flashcard
    flashcardsDelete(flashcardId) {
        const sql = `
            DELETE FROM flashcards WHERE id = $1
        `
        return db.query(sql, [flashcardId])
            .then(dbResponse => {
                return dbResponse.rows
            })
    }
}

module.exports = Flashcards;