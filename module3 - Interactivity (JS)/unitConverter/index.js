const entry = document.getElementById("entry");

const convertBtn = document.getElementById("convert-btn");

const length = document.getElementById("length-conversion");
const volume = document.getElementById("volume-conversion");
const mass = document.getElementById("mass-conversion");

const convertLength = (val) => {
	const feet = val * 3.281;
	const meter = val / 3.281;
	return [feet.toFixed(3), meter.toFixed(3)];
};
const convertVolume = (val) => {
	const gallons = val * 0.264;
	const liters = val / 0.264;
	return [gallons.toFixed(3), liters.toFixed(3)];
};
const convertMass = (val) => {
	const pounds = val * 2.204;
	const kilogram = val / 2.204;
	return [pounds.toFixed(3), kilogram.toFixed(3)];
};

convertBtn.addEventListener("click", () => {
	const entryVal = Number(entry.value);
	length.textContent = `
      ${entryVal} meters = ${
		convertLength(entryVal)[0]
	} feet | ${entryVal} feet = ${convertLength(entryVal)[1]} meters
   `;
	volume.textContent = `
      ${entryVal} liters = ${
		convertVolume(entryVal)[0]
	} gallons | ${entryVal} gallons = ${convertVolume(entryVal)[1]} liters
   `;
	mass.textContent = `
   ${entryVal} kilos = ${
		convertMass(entryVal)[0]
	} pounds | ${entryVal} pounds = ${convertMass(entryVal)[1]} kilos
   `;
});
