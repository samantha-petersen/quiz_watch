# 📝 Quiz Watch
Quiz Watch is a CRUD Single Page Application flashcards platform which uses the Model View Controller architectural pattern.

Quiz Watch was designed to improve the rate at which you can learn through spaced repetition which is a powerful technique based on the 'Forgetting Curve' theorized by psychologist Hermann Ebbinghaus in the late 1880's.

## 🖥️ How to use
- Create an account
- Go to Flashcards abd there will be 3 auto generated flashcards for you to use
- You can set whether the flashcards was hard, medium or easy
- You can add, edit or delete
- Log back in another day and it will show you what cards are up for you to do based on the difficulty you selected previously
- Or alternatively, try it out using *username*: quiztest, *password*: Quiztest1

## ⚡ Try it out
- [Try Quiz Watch here](https://whispering-peak-73921.herokuapp.com/)

## ⏰ Features
- Uses CREATE TRIGGER to auto generate stock flashcards for new users upon signup
- Intergrates spaced repetition for each flashcard using Moment
- Uses self executing functions to manage the scope of variables
- Responsive CSS with iPad and mobile compatability
- Intuitive platform

## 🛠️ Technologies used
- HTML/CSS
- Node JS/Express
- Bcrypt
- PostgreSQL
- Axios

## 📐 Planning
The planning involved in this project included:
- Photoshop digital mockups of the website
- Flowcharts of the database and website
- Extensive testings of the reminder function and Moment prior to implementing

## 🐛 Bugs
- If there are no flashcards due, it displays an empty flashcard

## 🌱  Future updates
- Add a notification display in the navigation bar to indicate if there are flashcards to do
- Add a user login with various cards for people to try the app without having to sign up

## 🎨 Digital Mockups
![](https://github.com/TypeSammy/quiz_watch/blob/client/screenshots/Website%20Mockups.png)

## ✏️ Flowchart
![](https://github.com/TypeSammy/quiz_watch/blob/client/screenshots/Website%20Flowchart%201.jpg)
![](https://github.com/TypeSammy/quiz_watch/blob/client/screenshots/Website%20Flowchart%202.png)
 
***

## 🚧 Our experience
### Key learning:
- We did extensive planning and went through 5 iterations of our database until we were happy
- Debriefing each other on not only what we worked on, but why it works and how it works
- Pair programming is awesome

### 📚 Challenges:
- Creating a PSQL function to auto generate flashcards for new signups
- Understanding how an asynchronous request works in practice like when and where to retrieve specific data on the front
- Familiarizing ourselves with how Github works in a collaborative environment and how to resolve conflicts in code
- Figuring out ways to tackle specific parts of the project without compromising each others code
- Diagnosing issues with express-sessions going from a dev environment to deployment on heroku with regards to permissions/proxy server
- Refactoring code

## 🌟 Show your support
Give this a star to show your support.

## 📬 Contact us
### Ralph Shipard
- [LinkedIn](https://www.linkedin.com/in/ralph-shipard-b58924200/)
- [E-mail](mailto:rshipard@gmail.com)

### Kevin Vu
- [LinkedIn](https://www.linkedin.com/in/kevin-vu-06/)
- [E-mail](mailto:kevin.vu06@gmail.com)

### Samantha Gold
- [LinkedIn](https://www.linkedin.com/in/samantha-gold-dev/)
- [E-mail](mailto:typesammy@gmail.com)