const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");

const generateBtn = document.getElementById("generate-password");

const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "~`!@#$%^&*()_-+={[}]|:;,<.>/?";

const generatePassword = () => {
	let pool = alphabets + numbers + symbols;
	let password = "";
   for (let i = 0; i < 15; i++) {
      password += pool[Math.floor(Math.random() * pool.length)];
   }
   return password;
};

const renderPassword = () => {
   password1.textContent = generatePassword();
   password2.textContent = generatePassword();
}

generateBtn.addEventListener("click", renderPassword);