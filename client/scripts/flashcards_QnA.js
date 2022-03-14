const createFlashcard = document.querySelector("#create-card")

function renderCategoryHeader() {
  document.querySelector("#category-container").innerHTML = `
    <ul class="category-header">
      <div class="header-left">
        <li><h2 class="flashcards-link" onClick="Toggles.reset(); Toggles.displayDueFlashcards(); refresh()">Flashcards</h2></li>
        <li class="material-icons edit" onClick="Toggles.reset(); Toggles.displayEditDeck()">edit</li>
        <li class="edit edit-txt" onClick="Toggles.reset(); Toggles.displayEditDeck()">Edit deck</li>
        <li class="material-icons edit" onClick="Toggles.reset(); Toggles.displayCreateFlashcard()">add_circle</li>
        <li class="edit edit-txt" onClick="Toggles.reset(); Toggles.displayCreateFlashcard()">Add card</li>
      </div>
      <li>1/10</li>
    </ul>
  `
}

function renderQuestion() {
  document.querySelector("#question-display").innerHTML = `
    <section class="question-display-container">
      <section class="display" id="flashcards">
        <div id="question" class="question">Question</div>
        <div id="answer" class="answer">Answer</div>
        <div id="finished" class="finished">You're done! :)</div>
        <div id="hint" class="hint">
          <span class="material-icons" onmousedown="showHint()" onmouseup="hideHint()">help</span>
          <div class="hint-txt" onmousedown="showHint()" onmouseup="hideHint()">HINT</div>
        </div>
        <button id="answer-btn" class="answer-btn" onClick="showAnswer()">Answer</button>
        <div id="reminder-container" class="reminder reminder-btn">
          <p class="difficult-txt">How difficult did you find this question?</p>
          <button onClick="difficulty('easy')">Easy</button>
          <button onClick="difficulty('medium')">Medium</button>
          <button onClick="difficulty('hard')">Hard</button>
        </div>
      </section>
      <button class="start-btn" onClick="start()">Start</button>
    </section>
  `
}

function renderCreateForm() {
  document.querySelector("#create-card").innerHTML = `
    <div class="create-flashcard-container">
    <div id="card-created" class="card-created">Flashcard created!</div>
    <div class="create-form-container">
      <form id="create-flashcard-form" action="/" method="POST" onSubmit="creatingCard(event)">
        <fieldset>
          <label for="question">Question:</label><br>
          <textarea name="question" cols="20" rows="5"></textarea>
        </fieldset>
        <fieldset>
          <label for="hint">Hint:</label><br>
          <textarea name="hint" cols="20" rows="5"></textarea>
        </fieldset>
        <fieldset>
          <label for="answer">Answer:</label><br>
          <textarea name="answer" cols="20" rows="5"></textarea>
        </fieldset>
        <button>Add</button>
      </form>
    </div>
    </div>
  `
}

function creatingCard(event) {
  event.preventDefault();
  const newFlashcardForm = event.target
  const data = Object.fromEntries(new FormData(newFlashcardForm));

  axios.post("/api/quiz", data)
    .then(successResponse => {
      document.querySelector("#create-flashcard-form").style.display = "none"
      document.querySelector("#card-created").style.display = "block"
    })
    .then(successResponse => {
      axios.get('/api/quiz')
        .then(response => {
          state.flashcardsdue = response.data
        })
    })
    .then(successResponse => {
      axios.get('/api/quiz/all')
        .then(response => {
          state.allFlashcards = response.data
          renderCategoryHeader()
          renderQuestion()
          renderCreateForm()
          renderAllFlashcards()
          flashcardDOM()
          grabFlashcardsDue()
          Toggles.reset()
          Toggles.displayDueFlashcards()
        })
    })
    .catch(errorResponse => {
      document.querySelector('#errors')
        .innerHTML = errorResponse.response.data.message;
    });
}

function editCategory() {
  if (allFlashcards.classList.contains("hide")) {
    if (!(answerDisplay.classList.contains("hide"))) {
      answerDisplay.classList.toggle("hide")
    } else if (!(questionDisplay.classList.contains("hide"))) {
      questionDisplay.classList.toggle("hide")
    } else if (!(createFlashcard.classList.contains("hide"))) {
      createFlashcard.classList.toggle("hide")
    } else if (!(editFlashcard.classList.contains("hide"))) {
      editFlashcard.classList.toggle("hide")
    }
    allFlashcards.classList.toggle("hide")
  }
}

function createCard(id) {
  if (createFlashcard.classList.contains("hide")) {
    if (!(answerDisplay.classList.contains("hide"))) {
      answerDisplay.classList.toggle("hide")
    } else if (!(questionDisplay.classList.contains("hide"))) {
      questionDisplay.classList.toggle("hide")
    } else if (!(allFlashcards.classList.contains("hide"))) {
      allFlashcards.classList.toggle("hide")
    } else if (!(editFlashcard.classList.contains("hide"))) {
      editFlashcard.classList.toggle("hide")
    }
    createFlashcard.classList.toggle("hide")
  }
}

function returnFlashcads() {
  Nav.playFlashcards()
}

function refresh() {
  axios.get('/api/quiz')
    .then(response => {
      state.flashcardsdue = response.data
    })
    .then(successResponse => {
      axios.get('/api/quiz/all')
        .then(response => {
          state.allFlashcards = response.data
          renderCategoryHeader()
          renderQuestion()
          renderCreateForm()
          renderAllFlashcards()
          flashcardDOM()
          grabFlashcardsDue()
          Toggles.reset()
          Toggles.displayDueFlashcards()
        })
    })
}