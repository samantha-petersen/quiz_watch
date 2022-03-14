CREATE DATABASE flashcardsdb;
\c flashcardsdb

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username TEXT,
email TEXT,
password_digest TEXT
);

CREATE TABLE flashcards (
id SERIAL PRIMARY KEY,
user_id INT,
question TEXT,
hint TEXT,
answer TEXT,
answered_correctly INT,
answered_incorrectly INT,
reminder TIMESTAMP,
difficulty INT[], 
category TEXT
);

CREATE OR REPLACE FUNCTION insertStockFlashcards()
  RETURNS TRIGGER 
  LANGUAGE plpgsql
  AS $$
  BEGIN

  INSERT INTO "flashcards" ("user_id", "question", "hint", "answer", "answered_correctly", "answered_incorrectly", "reminder", "category")
  VALUES(NEW."id", 'In JS how do you remove whitespace', 'for example shrek 1 ', 'console.log(shrek 1.trim)', 0, 0, now(), 'Javascript' );

  INSERT INTO "flashcards" ("user_id", "question", "hint", "answer", "answered_correctly", "answered_incorrectly", "reminder", "category")
  VALUES(NEW."id", 'In JS how do you remove whitespace', 'for example shrek 1 ', 'console.log(shrek 1.trim)', 0, 0, now(), 'Javascript' );

  INSERT INTO "flashcards" ("user_id", "question", "hint", "answer", "answered_correctly", "answered_incorrectly", "reminder", "category")
  VALUES(NEW."id", 'What is the output of:
   let newVariable = "Shreklord"
   console.log(typeof newVariable)', ' What does typeof do ',' tells us what the variable type is - string', 0, 0, now(), 'Javascript' );

RETURN NEW;
END;
$$;

CREATE TRIGGER stockFlashcards
  AFTER INSERT
  ON "users"
  FOR EACH ROW
  EXECUTE PROCEDURE insertStockFlashcards();


 -- COPY TO JUST ABOVE HERE!!!!!!

-- NOTES:
TRUNCATE TABLE table_name; --to delete the table data
DROP DATABASE flashcardsdb; --to delete the whole db