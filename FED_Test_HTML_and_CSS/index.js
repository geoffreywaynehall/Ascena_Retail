// Starting values
var amountNeeded = 167;
var goal = 668;

// HTML object references
var infoBox = document.getElementById("infoBox");
var pointer = document.getElementById("pointer");
var progressBar = document.getElementById("progressBar");
var submitButton = document.getElementById("submitButton");
var donationInput = document.getElementById("donationInput");
var modalLink = document.getElementById("modalLink");
var closeButton = document.getElementById("closeButton");
var modal = document.getElementById('fundModal');

//
function update() {
	if(amountNeeded < 0) {
		infoBox.innerHTML = "<p><strong>-$" + -amountNeeded + "</strong> still needed for this project</p>";
	}
	else {
		infoBox.innerHTML = "<p><strong>$" + amountNeeded + "</strong> still needed for this project</p>";
	}
		
	progressBar.style.borderRight = "solid " + getProgressBarLength() + "px #EAEAEA";
}

function getProgressBarLength() {
	var percent = amountNeeded/goal;
	if(percent < 0) {
		percent = 0;
	}
	
	var pointerPos = (482-((percent*484)/2));
	
	if (pointerPos > 475) {
		pointerPos = 475;
	}
	
	pointer.style.left = pointerPos + "px";
	
	return percent * 484;
}

submitButton.addEventListener("click", function () {
	var validation = /[1-9][0-9]{0,3}/
	if(validation.test(donationInput.value)) {
		amountNeeded -= donationInput.value;
		update();
	}
});

modalLink.addEventListener("click", function () {
	modal.style.display = "block";
});

closeButton.addEventListener("click", function () {
	modal.style.display = "none";
});

update();