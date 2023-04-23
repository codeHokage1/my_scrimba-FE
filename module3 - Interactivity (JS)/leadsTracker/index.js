const urlInput = document.getElementById('url-input');
const saveInputBtn = document.getElementById('save-input');
const saveTabBtn = document.getElementById('save-tab');
const deleteBtn = document.getElementById('delete');

const inputInfo = document.getElementById('info');

let savedItems = document.getElementById('saved-items');

let urls = JSON.parse(localStorage.getItem('urls')) || [];

const renderSavedItems = () => {
   savedItems.innerHTML = '';
   for(let i = 0; i < urls.length; i++) {
      const li = `<li><a href=${urls[i]} target="_blank">${urls[i]}</a></li>`;
      savedItems.innerHTML += li;
   }
}
renderSavedItems();

const saveToLocalStorage = () => {
   localStorage.setItem('urls', JSON.stringify(urls));
}

const displayError = (message) => {
   inputInfo.textContent = message;
   setTimeout(() => {
      inputInfo.textContent = ""
   }, 3000)
}

const saveInput = () => {
   const url = urlInput.value;
   if (!url) {
      displayError("You have to input a URL!");
      return;
   }
   urls.push(url);
   console.log(urls);
   urlInput.value = '';
   renderSavedItems();
   saveToLocalStorage();
}

const deleteUrls = () => {
   localStorage.clear();
   urls = [];
   renderSavedItems();
}



saveInputBtn.addEventListener('click', saveInput);
saveTabBtn.addEventListener('click', () => {
   chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      urls.push(tabs[0].url);
      renderSavedItems();
      saveToLocalStorage();
   });
});
deleteBtn.addEventListener('click', deleteUrls);

