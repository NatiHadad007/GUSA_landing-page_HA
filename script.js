let btnText = "Continue";
let currentStep = 0;

let stepOne = `
<div class="popupInputs">
<label name="fullname" class="labelTtile">Full name:</label>
<input class="inputText userInfo" type="text" placeholder="Enter full name" required>
<label class="labelTtile">Email Address:</label>
<input name="email" class="inputText userInfo" type="text" placeholder="Enter email address" required>
</div>
`;

let stepTwo = `
<div class="popupPlatforms">
<div class="platformWrapper">
<select class="selectPlatforms" name="platforms">
<option selected disabled hidden>Platform</option>
  <option value="youtube">Youtube</option>
  <option value="instagram">Instagram</option>
  <option value="tiktok">TikTok</option>
</select>
<input class="inputText" type="text" placeholder="Link">
</div>
</div>
<div class="addingPlatform">
<label name="platform" class="labelTtile">Add more platform</label>
<img src="./icons/plus_icon.svg" alt="plus icon"/>
</div>
`;

let stepThree = `
<div class="popupThanks">
  <img src="./icons/check_icon.svg" class="checkIcon" alt="check icon"/>
  <h2 class="finalHeader">Thank you for joining!</h2>
  <p class="finalText">We will get back to you promptly.</p>
</div>
`;

let inputAdedd = `
<div class="platformWrapper">
<img src="./icons/trash_icon.svg" class="deletePlatform" alt="trash icon"/>
<select class="selectPlatforms" name="platforms">
<option selected disabled hidden>Platform</option>
  <option value="youtube">Youtube</option>
  <option value="instagram">Instagram</option>
  <option value="tiktok">TikTok</option>
</select>
<input class="inputText" type="text" placeholder="Link">
</div>
`;

// popup steps array
let steps = [stepOne, stepTwo, stepThree];

// pop up Body
function getPopupTemplate() {
  return `
<div class="popUp-wrapper">
  <div class="popup">
    <div class="popupNav">
      <p class="popupTitle">Join the Program</p>
      <img src="./icons/exit_icon.svg" class="exitPop" alt="exit popup"/>
    </div>

    <div class="progressBar">
      <div class="progressStepColor"></div>
    </div>

    <div class="popupContent">
      <div class="popupFields">
        ${steps[currentStep]}
      </div>
      </div>
      <div class="button-wrapper">
        <button class="popupBtn">${btnText}</button>
      </div>
  </div>
</div>
`;
}

// Close popup function
function closingPopup() {
  let popupWrapper = popupContainer.querySelector(".popUp-wrapper");
  if (popupWrapper) {
    popupWrapper.remove();
    currentStep = 0;
  }
}

// Fire the popup by clicking on the 'Apple Now' button
let btn = document.querySelector(".signButton");
let popupContainer = document.querySelector(".popUp-container");
btn.addEventListener("click", (e) => {
  popupContainer.innerHTML = getPopupTemplate();
});

popupContainer.addEventListener("click", (e) => {
  // Close the Popup by clicking on the exit icon
  if (e.target.classList.contains("exitPop")) {
    closingPopup();
  }
  // If last step close popup by clicking on the close button
  else if (e.target.classList.contains("popupBtn")) {
    if (currentStep === steps.length - 1) {
      closingPopup();
      return;
    }

    // Checks if all the inputs are filled
    let popupInputs = popupContainer.querySelectorAll(".popupFields input");
    let popupSelect = document.querySelectorAll(".selectPlatforms");

    let inputsFilled = [...popupInputs].every(
      (input) => input.value.trim() !== ""
    );

    let platformsSelected = [...popupSelect].every(
      (select) => select.value !== "Platform"
    );

    let allFilled = inputsFilled && platformsSelected;

    if (allFilled) {
      // Paste the next step
      currentStep++;
      popupContainer.querySelector(".popupFields").innerHTML =
        steps[currentStep];

      // Increase the progress bar by each step
      const progressBarFill =
        popupContainer.querySelector(".progressStepColor");
      const totalSteps = steps.length;
      const progressPercent = ((currentStep + 1) / totalSteps) * 100;
      progressBarFill.style.width = progressPercent + "%";
    }

    // return false if the inputs aren't filled
    allFilled = false;

    // Checks if user has clicked on adding platform and paste it
  } else if (e.target.closest(".addingPlatform")) {
    let popupPlatformsCard = popupContainer.querySelector(".popupPlatforms");
    popupPlatformsCard.insertAdjacentHTML("beforeend", inputAdedd);
  }
  // Checks if user has clicked on delete platform and delete it
  else if (e.target.classList.contains("deletePlatform")) {
    e.target.closest(".platformWrapper").remove();
  }

  // change the last card button text to close
  if (currentStep === steps.length - 1) {
    document.querySelector(".popupBtn").innerText = "Close";
  }
});
