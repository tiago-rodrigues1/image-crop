const photoFileBtn = document.getElementById("photo-file");
let image = document.getElementById("photo-preview");

document.getElementById("select-image").onclick = () => {
	photoFileBtn.click();
};

window.addEventListener("DOMContentLoaded", () => {
	photoFileBtn.addEventListener("change", () => {
		let file = photoFileBtn.files.item(0);

		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event) => {
			image.src = event.target.result;
		};
	});
});

const selection = document.getElementById("selection-tool");
let startX, startY, relativeStartX, relativeStartY;
let endX, endY, relativeEndX, relativeEndY;
let startSelection = false;

const events = {
	mouseover() {
		this.style.cursor = "crosshair";
	},
	mousedown() {
		const { clientX, clientY, offsetX, offsetY } = window.event;
		startX = clientX;
		startY = clientY;
		relativeStartX = offsetX;
		relativeStartY = clientY;

		startSelection = true;
	},
	mousemove() {
		const { clientX, clientY } = window.event;
		endX = clientX;
		endY = clientY;

		if (startSelection) {
			selection.style.display = "initial";
			selection.style.top = `${startY}px`;
			selection.style.left = `${startX}px`;

			selection.style.width = `${endX - startX}px`;
			selection.style.height = `${endY - startY}px`;
		}
	},
	mouseup() {
		startSelection = false;

		relativeEndX = window.event.layerX;
		relativeEndY = window.event.layerY;
	},
};

Object.keys(events).forEach((eventName) => {
	image.addEventListener(eventName, events[eventName]);
});
