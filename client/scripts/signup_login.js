const login = document.querySelector("#login")
const signup = document.querySelector("#signup")

const LoginSignup = (() => {
  function renderSignup() {
    const signupBox = document.querySelector("#signup")
    signupBox.innerHTML = `
    <div class="signup-container">
      <h2>Signup</h2>
      <form id="sign-up-form" action="/" method="POST" onSubmit="createUser(event)">
        <fieldset>
          <input type="text" name="username" placeholder="Username">
        </fieldset>
        <fieldset>
          <input type="text" name="email" placeholder="Email">
        </fieldset>
        <fieldset>
          <input type="password" name="password" placeholder="Password">
        </fieldset>
        <button>Sign up</button>
        <p id="errors"></p>
      </form>
      <span class="material-icons signup" onClick="LoginSignup.hide('signup')">close</span>
    </div>
    `
  }
  
  function renderLogin() {
    const signupBox = document.querySelector("#login")
    signupBox.classList.remove("hide")
    signupBox.innerHTML = `
      <div class="login-container">
        <h2>Login</h2>
        <form id="login-form" action="/" method="POST" onSubmit="logInUser(event)">
          <fieldset>
            <input type="text" name="email" placeholder="Email">
          </fieldset>
          <fieldset>
            <input type="password" name="password" placeholder="Password">
          </fieldset>
          <p id="errors"></p>
          <button>Login</button>
        </form>
        <span class="material-icons login" onClick="LoginSignup.hide('login')">close</span>
      </div>
    `
  }
  renderSignup()
  renderLogin()
  signup.classList.toggle("hide")
  login.classList.toggle("hide")
  function hide(component) {
    if (component === "signup") {
      signup.classList.toggle("hide")
    } else if (component === "login") {
      login.classList.toggle("hide")
    }
  }
  return {
    hide: hide
  }
})()


function createUser(event) {
  event.preventDefault()
  const signUpForm = event.target
  const data = Object.fromEntries(new FormData(signUpForm));

  // validateUser()

  axios.post("/api/users", data)
    .then(successResponse => {
      const currentUser = successResponse.data
      window.location = "/"
      // state.user.push(currentUser) //needs an default user object in the cookie/session
    })
    .catch(errorResponse => {
      console.log(errorResponse);
      document.querySelector("#errors")
        .innerHTML = errorResponse.response.data.message;
    });
}

// event listener to hide the pop up modals when clicked anywhere outside of it
const modalSignUp = document.querySelector(".modal1")
const modalLogin = document.querySelector(".modal2")
window.onclick = function (event) {
  if (event.target === modalSignUp) {
    signup.classList.toggle("hide")
  } else if (event.target === modalLogin) {
    login.classList.toggle("hide")
  }
}

function logInUser(event) {
  event.preventDefault()
  const loginForm = event.target
  const data = Object.fromEntries(new FormData(loginForm))

  axios.post("/api/sessions", data)
    .then(successResponse => {
      state.logInStatus = true
      Nav.header() // => calling nav header so it generates a different nav bar
      login.classList.toggle("hide")
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
        })
    })
    .catch(errorResponse => {
      document.querySelector("#errors")
        .innerHTML = errorResponse.response.data.message;
    });
}