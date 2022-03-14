const allFlashcards = document.querySelector("#all-flashcards")
const editFlashcard = document.querySelector("#flashcard")

function renderAllFlashcards() {
  document.querySelector("#all-flashcards").innerHTML = `
    <section class="all-questions-display-container">
      ${displayAllFlashcards()}
    </section>
  `
}

function displayAllFlashcards() {
  return state.allFlashcards.map(flashcard => `
    <section class="question-container" data-id=${flashcard.id}>
        <div class="question-preview">${flashcard.question}</div>
        <div class="edit-container">
          <span class="material-icons" onClick="mapFlashcard(event);Toggles.reset(); Toggles.displayFlashcard()">edit</span><div class="edit" onClick="mapFlashcard(event);Toggles.reset(); Toggles.displayFlashcard()">Edit</div>
        </div>
      </section>
    `).join('')
}

function mapFlashcard(event) {
  const editFlashcardId = event.target.closest('.question-container').dataset.id

  var converted = Object.assign({}, ...state.allFlashcards.map(object => ({ [object.id]: object })))
  var flashcardToBeEdited = converted[editFlashcardId]
  document.querySelector("#flashcard").innerHTML = `
    <div class="edit-flashcard-container" data-id=${flashcardToBeEdited.id}>
      <form id="edit-flashcard-form" action="/" method="POST" onSubmit="editingFlashcard(event)">
        <fieldset>
          <label for="question">Question:</label><br>
          <textarea name="question" cols="20" rows="5">${flashcardToBeEdited.question}</textarea>
        </fieldset>
        <fieldset>
          <label for="question">Hint:</label><br>
          <textarea name="hint" cols="20" rows="5">${flashcardToBeEdited.hint}</textarea>
        </fieldset>
        <fieldset>
          <label for="question">Answer:</label><br>
          <textarea name="answer" cols="20" rows="5">${flashcardToBeEdited.answer}</textarea>
        </fieldset>
        <button>Save</button>
        </form>
        <button class="delete" onClick="deleteFlashcard(event)">Delete</button>
    </div>
  `
}

function editingFlashcard(event) {
  event.preventDefault()
  const flashId = event.target.closest('.edit-flashcard-container').dataset.id
  const data = Object.fromEntries(new FormData(event.target));
  const editData = {
    question: data.question,
    hint: data.hint,
    answer: data.answer,
    id: flashId
  }

  axios
    .patch('/api/quiz/edit', editData)
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
          Toggles.displayEditDeck()
        })
    })
}

function deleteFlashcard(event) {
  const flashId = event.target.closest('.edit-flashcard-container').dataset.id
  const id = { id: parseInt(flashId) }

  axios
    .delete('/api/quiz/delete', { data: id })
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
          Toggles.displayEditDeck()
        })
        .catch(errorResponse => {
        }
        );
    }
    )
}


// test