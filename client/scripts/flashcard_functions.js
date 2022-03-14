function flashcardDOM() {
  const question = document.querySelector("#question")
  const answer = document.querySelector("#answer")
  const answerBtn = document.querySelector("#answer-btn")
  const reminderBtnContainer = document.querySelector(".reminder-btn")
  const hint = document.querySelector(".hint")
  const hintTxt = document.querySelector(".hint-txt")
  const displayQContainer = document.querySelector('.question-display-container')
  const finish = document.querySelector('#finished')
  return { question, answer, answerBtn, reminderBtnContainer, hint, hintTxt, displayQContainer, finish }
}

function grabFlashcardsDue() {
  return state.flashcardsdue
}

let currentCardIndex = null

function start() {
  let dom = flashcardDOM()
  document.querySelector(".start-btn").style.display = "none"
  currentCardIndex = 0
  dom.question.style.display = "block"
  dom.hint.style.display = "flex"
  dom.answerBtn.style.display = "block"
  nextQ()
}

function nextQ() {
  let flashcardsDue = grabFlashcardsDue()
  showCard(flashcardsDue[currentCardIndex])
}

function showCard(flashcardsDue) {
  let dom = flashcardDOM()
  dom.displayQContainer.setAttribute("data-id", flashcardsDue.id)
  dom.question.innerText = flashcardsDue.question
  dom.answer.innerText = flashcardsDue.answer
  dom.hintTxt.innerText = flashcardsDue.hint
  dom.answer.style.display = "none"
  dom.hintTxt.style.display = "none"
}

function showAnswer() {
  let dom = flashcardDOM()
  dom.answer.style.display = "block"
  dom.reminderBtnContainer.style.display = "block"
  dom.answerBtn.style.display = "none"
  dom.question.style.display = "none"
  dom.hint.style.display = "none"
}

function showHint() {
  let dom = flashcardDOM()
  dom.hintTxt.style.display = "block"
}

function hideHint() {
  let dom = flashcardDOM()
  dom.hintTxt.style.display = "none"
}

function difficulty(lvl) {
  let dom = flashcardDOM()
  let flashcardsDue = grabFlashcardsDue()
  let cardId = dom.displayQContainer.getAttribute("data-id")
  // dom object for question page
  dom.answerBtn.style.display = "block"
  dom.question.style.display = "block"
  dom.hint.style.display = "flex"

  // dom object for answer page
  dom.answer.style.display = "none"
  dom.reminderBtnContainer.style.display = "none"
  // functions to add minute or days
  function addDays(date, days) {
    date.setDate(date.getDate() + days)
    return date;
  }

  function addMinutes(date, minutes) {
    date.setTime(date.getTime() + minutes * 60000)
    return date;
  }

  var someDate = new Date();
  if (lvl == 'easy') { addDays(someDate, 7) }
  else if (lvl == 'medium') { addDays(someDate, 1) }
  else if (lvl == 'hard') { addMinutes(someDate, 1) }

  var dd = someDate.getDate();
  var mm = someDate.getMonth() + 1;
  var y = someDate.getFullYear();
  var hour = someDate.getHours();
  var minutes = someDate.getMinutes();
  var seconds = someDate.getSeconds();

  var reminder = y + '/' + mm + '/' + dd + " " + hour + ":" + minutes + ":" + seconds;

  axios.patch('/api/quiz', { timestamp: reminder, id: cardId })

  if (currentCardIndex === flashcardsDue.length - 1) {
    dom.finish.style.display = "block"
    dom.answerBtn.style.display = "none"
    dom.question.style.display = "none"
    dom.hint.style.display = "none"
  } else {
    currentCardIndex += 1
    nextQ()
  }
}

// function createNewFlashcard(question, hint, answer) {
//   axios.post('/api/quiz', { question: question, hint: hint, answer: answer })
// }

// function editingFlashcard(question, hint, answer, id) {
//   axios.post('/api/quiz/edit', { question: question, hint: hint, answer: answer, id: id })
// }