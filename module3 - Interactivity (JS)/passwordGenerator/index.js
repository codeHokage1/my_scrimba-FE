const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");

const advanceOption = document.getElementById("advanced-option");
const options = document.getElementById("options");
const passwordLength = document.getElementById("password-length");

const generateBtn = document.getElementById("generate-password");

const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "~`!@#$%^&*()_-+={[}]|:;,<.>/?";

const generatePassword = (length = 15) => {
	let pool = alphabets + numbers + symbols;
	let password = "";
	for (let i = 0; i < length; i++) {
		password += pool[Math.floor(Math.random() * pool.length)];
	}
	return password;
};

const renderPassword = () => {
	password1.textContent = passwordLength.value
		? generatePassword(passwordLength.value)
		: generatePassword();
	password2.textContent = passwordLength.value
		? generatePassword(passwordLength.value)
		: generatePassword();
};

generateBtn.addEventListener("click", renderPassword);

advanceOption.addEventListener("click", () => {
	options.classList.toggle("options");
});
