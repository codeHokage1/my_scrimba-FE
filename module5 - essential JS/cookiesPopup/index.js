const popupModal = document.getElementById("modal");
const closeBtn = document.getElementById("modal-close-btn");
const consentForm = document.getElementById("consent-form");
const modalText = document.getElementById("modal-text");
const declineBtn = document.getElementById("decline");

const popUp = () => {
	setTimeout(() => {
		popupModal.style.display = "block";
	}, 4000);
};

popUp();

closeBtn.addEventListener("click", () => {
	popupModal.style.display = "none";
});

consentForm.addEventListener("submit", (e) => {
   e.preventDefault();
   const formData = new FormData(consentForm);
   // console.log(formData.get("consent"));

	modalText.innerHTML = `
      <div class="modal-inner-loading">
         <img src="images/icons8-spinner.gif" class="loading">
         <p id="uploadText">
            Uploading your data to the dark web...
         </p>
      </div>
   `;
	setTimeout(() => {
		document.getElementById("uploadText").textContent = "Making the sale!";
	}, 2000);

	setTimeout(() => {
		document.getElementById("modal-inner").innerHTML = `
         <h2>Thank you <span class="sucker modal-display-name">${formData.get('name')}</span>, sucker! </h2>
         <p>We just sold the rights to your eternal soul.</p>
         <div class="idiot-gif">
            <img src="https://media.giphy.com/media/S6qYujXdhYGJHsItJJ/giphy.gif">
         </div>
      `;
   }, 4000);
   
   document.getElementById("modal-close-btn").disabled = false;
});

declineBtn.addEventListener("mouseover", () => {
   document.getElementById("modal-choice-btns").classList.toggle("reverse");
})