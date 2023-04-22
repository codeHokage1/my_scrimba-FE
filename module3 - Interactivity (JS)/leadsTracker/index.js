const urlInput = document.getElementById('url-input');
const saveInputBtn = document.getElementById('save-input');

let savedItems = document.getElementById('saved-items');

const urls = JSON.parse(localStorage.getItem('urls')) || [];

const renderSavedItems = () => {
   savedItems.innerHTML = '';
   for(let i = 0; i < urls.length; i++) {
      const li = document.createElement('li');
      li.textContent = urls[i];
      savedItems.appendChild(li);
   }
}
renderSavedItems()

const saveInput = () => {
   const url = urlInput.value;
   urls.push(url);
   console.log(urls);
   urlInput.value = '';
   renderSavedItems();
   saveToLocalStorage();
}

const saveToLocalStorage = () => {
   localStorage.setItem('urls', JSON.stringify(urls));
}

saveInputBtn.addEventListener('click', saveInput);