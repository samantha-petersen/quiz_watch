const landingPage = document.querySelector("#landing-page")

const LandingPage = (() => {
  function renderLandingPage() {
    document.querySelector("#landing-page").innerHTML = `
      <section id="main-strip" class="main-strip">
        <div class="main-copy">
          <h1>Make learning easier</h1>
          <p>Master any topics you want and become the best version of yourself</p>
          <a class="button" onClick="LandingPage.getStarted(event)">Get Started</a>
        </div>
        <div class="main-img">
          <img src="./assets/character 16 crop.svg" alt="two people studying">
        </div>
      </section>
      <section class="second-strip">
        <h2>Why use QuizWatch?</h2>
        <ul>
          <div>
            <li class="material-icons check_circle">check_circle</li>
            <li>Custom Flashcards</li>
          </div>
          <div>
            <li class="material-icons check_circle">check_circle</li>
            <li>Spaced Reptition</li>
          </div>
          <div>
            <li class="material-icons check_circle">check_circle</li>
            <li>Intuitive Design</li>
          </div>
        </ul>
      </section>
      <section class="third-strip">
        <div>
          <img src="./assets/character 18.svg" alt="guy studying">
        </div>
        <div>
          <h2>Features of QuizWatch</h2>
          <p>Improve the rate at which you can learn through QuizWatch by creating your own flashcards that will be spaced out depending on how difficult you find them. </p>
          <p> Spaced repetition is a powerful technique that is based on the 'Forgetting Curve' theorized by a psychologist in the late 1880's named Herman Ebbinghaus.</p>
          <p> In simple terms, the greater the drop in retrival strength, the greater the increase in learning when the memory is accessed again. This is how QuizWatch works to help you remember anything you want </p>
        </div>
      </section>
    `
  }

  renderLandingPage()

  function getStarted(event) {
    if (!(state.logInStatus)) {
      event.preventDefault()
      login.classList.toggle("hide")
    } else {
      Toggles.reset()
      Toggles.displayDueFlashcards()
    }
  }
  return {
    getStarted: getStarted
  }
})()