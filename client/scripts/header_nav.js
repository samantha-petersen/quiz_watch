const Nav = (() => {
  function header() {
    if (state.logInStatus) {
      document.querySelector("#header-nav").innerHTML = `
        <nav>
        <a onClick="Toggles.reset()"><h3>Quiz Watch</h3></a>
        <ul>
          <div>
            <li class="material-icons flashcards" onClick="Toggles.reset(); Toggles.displayDueFlashcards()">view_carousel</li>
            <li class="nav-text" onClick="Toggles.reset(); Toggles.displayDueFlashcards()">Flashcards</li>
          </div>
          <div>
            <li class="material-icons notifications" onClick="render('Nav.notifications')">circle_notifications</li>
            <li class="nav-text" onClick="Nav.render('notifications')">Notifications</li>
          </div>
          <div>
            <li class="material-icons signup" onClick="render('Nav.user')">account_circle</li>
            <li class="nav-text" onClick="Nav.render('user')">Username</li>
          </div>
          <div>
            <li class="material-icons login" onClick="Nav.logout(event)">logout</li>
            <li class="nav-text" onClick="Nav.logout(event)">Logout</li>
          </div>
        </ul>
      </nav>
      `
    } else {
      document.querySelector("#header-nav").innerHTML = `
        <nav>
        <a href="/"><h3>Quiz Watch</h3></a>
          <ul>
            <div>
              <li class="material-icons signup" onClick="Nav.render('signup')">account_circle</li>
              <li class="nav-text" onClick="Nav.render('signup')">Sign up</li>
            </div>
            <div>
              <li class="material-icons login" onClick="Nav.render('login')">login</li>
              <li class="nav-text" onClick="Nav.render('login')">Login</li>
            </div>
          </ul>
        </nav>
      `
    }
  }

  function logout(event) {
    event.preventDefault()
    state.logInStatus = false
    state.allFlashcards = []
    state.flashcardsdue = []
    axios.delete("api/sessions")
    // Nav.header()
    window.location.reload()
  }

  // Calls header function 
  header()

  function render(component) {
    if (component === "signup") {
      signup.classList.toggle("hide")
    } else if (component === "login") {
      login.classList.toggle("hide")
    } else if (component === "flashcards") {
      if (categoryHeader.classList.contains("hide")) {
        categoryHeader.classList.toggle("hide")
        questionDisplay.classList.toggle("hide")
      }
    }
  }

  function displaySignup() {
    signup.classList.toggle("hide")
  }

  function displayLogin() {
    login.classList.toggle("hide")
  }

  function flashcards() {
    if (questionDisplay.classList.contains("hide") && answerDisplay.classList.contains("hide")) {
      if (categoryHeader.classList.contains("hide")) {
        categoryHeader.classList.toggle("hide")
      } else if (!(createFlashcard.classList.contains("hide"))) {
        createFlashcard.classList.toggle("hide")
      } if (!(editFlashcard.classList.contains("hide"))) {
        editFlashcard.classList.toggle("hide")
      } else if (!(allFlashcards.classList.contains("hide"))) {
        allFlashcards.classList.toggle("hide")
      }
      questionDisplay.classList.toggle("hide")
    }
  }

  return {
    render: render,
    displaySignup: displaySignup,
    displayLogin: displayLogin,
    flashcards: flashcards,
    logout: logout,
    header: header
  }

})()

