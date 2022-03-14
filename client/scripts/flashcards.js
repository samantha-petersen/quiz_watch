// initialize

// const state = {
//   currentUser: null,

// }

function getUserId() {
  axios
    // for finding the user id
    .get('/api/user')
    .then(sessionInfo => {
      state.currentUser = sessionInfo.Id;
    })
}

getUserId()

function getFlashcard() {
  axios.get('api/flashcards', state.currentUser)

}
