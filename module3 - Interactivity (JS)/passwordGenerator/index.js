const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");

const advanceOption = document.getElementById("advanced-option");
const options = document.getElementById("options");
const passwordLength = document.getElementById("password-length");
const error = document.getElementById("error");

const generateBtn = document.getElementById("generate-password");

const clipBoard1 = document.getElementById("clipboard1");
const clipBoard2 = document.getElementById("clipboard2");
const copyInfo1 = document.getElementById("copy-info1");
const copyInfo2 = document.getElementById("copy-info2");

const addNumbers = document.getElementById("add-numbers");
const addSymbols = document.getElementById("add-symbols");

const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "~`!@#$%^&*()_-+={[}]|:;,<.>/?";

let numbersWithPassword, symbolsWithPassword;
addNumbers.addEventListener("change", () => {
	numbersWithPassword = addNumbers.checked;
});
addSymbols.addEventListener("change", () => {
	symbolsWithPassword = addSymbols.checked;
});

const generatePassword = (length = 15) => {
	let pool;
	if (
		(numbersWithPassword && symbolsWithPassword) ||
		(!numbersWithPassword && !symbolsWithPassword)
	) {
		pool = alphabets + numbers + symbols;
	} else if (numbersWithPassword) {
		pool = alphabets + numbers;
	} else if (symbolsWithPassword) {
		pool = alphabets + symbols;
	}

	let password = "";
	for (let i = 0; i < length; i++) {
		password += pool[Math.floor(Math.random() * pool.length)];
	}
	return password;
};

const renderPassword = () => {
	if (!passwordLength.value) {
		password1.textContent = generatePassword();
		password2.textContent = generatePassword();
	} else if (passwordLength.value && passwordLength.value < 8) {
		error.textContent = "Password length must be greater than 8";
		setTimeout(() => {
			error.textContent = "";
		}, 3000);
	} else {
		password1.textContent = generatePassword(passwordLength.value);
		password2.textContent = generatePassword(passwordLength.value);
	}
};

generateBtn.addEventListener("click", renderPassword);

advanceOption.addEventListener("click", () => {
	options.classList.toggle("options");
});

clipBoard1.addEventListener("click", () => {
	if (!password1.innerText) {
		copyInfo1.classList.add("copy-info-error");
		copyInfo1.textContent = "Generate a password first!";
		setTimeout(() => {
			copyInfo1.textContent = "";
			copyInfo1.classList.remove("copy-info-error");
		}, 5000);
		return;
	}
	const textarea = document.createElement("textarea");
	textarea.value = password1.textContent;

	// Add the textarea element to the page
	document.body.appendChild(textarea);

	// Copy the text from the textarea to the clipboard
	textarea.select();
	document.execCommand("copy");

	// Remove the textarea element from the page
	document.body.removeChild(textarea);
	copyInfo1.textContent = "Password copied to clipboard!";
	setTimeout(() => {
		copyInfo1.textContent = "";
	}, 5000);
});

clipBoard2.addEventListener("click", () => {
	if (!password2.innerText) {
		copyInfo2.classList.add("copy-info-error");
		copyInfo2.textContent = "Generate a password first!";
		setTimeout(() => {
			copyInfo2.textContent = "";
			copyInfo2.classList.remove("copy-info-error");
		}, 5000);
		return;
	}
	const textarea = document.createElement("textarea");
	textarea.value = password2.textContent;

	// Add the textarea element to the page
	document.body.appendChild(textarea);

	// Copy the text from the textarea to the clipboard
	textarea.select();
	document.execCommand("copy");

	// Remove the textarea element from the page
	document.body.removeChild(textarea);
	copyInfo2.textContent = "Password copied to clipboard!";
	setTimeout(() => {
		copyInfo2.textContent = "";
	}, 5000);
});
