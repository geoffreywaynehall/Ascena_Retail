/*
Assignement:

HTML: Complete the HTML to have semantic and compliant markups. ==COMPLETE==

JAVASCRIPT: Dynamically add a user to the users list.
- Highlight the email input when a user enters an invalid email address and display following message: "please enter a valid email address" in red. ==COMPLETE==
- Use the add_user function to submit the user's data.
- If the ajax request returns an error, display the error message in red.
- Display the newly added user in the users list when the request was successful.
- Do not use any libraries e.g. bootstrap ==COMPLETE==

Nice to have:
- no jQuery or completely rewrite in jQuery  ==COMPLETE==
- add some CSS3 properties
- code cleanup/format ==COMPLETE==
- explain or propose improvements in comments ==COMPLETE==
- remove inline code/styles

*/

var submit = document.getElementById('submit');
var users = document.getElementById('users');

function validateForm(user, email) {
    var errors = []
    var emailInput = document.getElementById('email');
    var nameInput = document.getElementById('name');

    if (user === "") {
        nameInput.classList.add("invalid")
        errors.push('please enter a valid name')
    }
	else {
		nameInput.classList.remove("invalid")
	}
    if (!RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email) || email === '') {
        emailInput.classList.add("invalid")
        errors.push('please enter a valid email address')
    }
	else {
        emailInput.classList.remove("invalid")
    }

    return errors;
}

function applyErrors(errors) {
    var errorSection = document.getElementById('errors');
    errorSection.innerHTML = " "
    if (errors.length > 0) {
        errors.forEach(function (error) {
            errorSection.innerHTML += ('<p class="errorMessage">' + error + '</p>');
        })
    }
}

submit.addEventListener("click", function () {
	var userName = document.getElementById("name").value;
    var userEmail = document.getElementById("email").value;
	
	var errors = validateForm(userName, userEmail);
	
	applyErrors(errors);
	
	if(errors.length === 0) {
		addUser(userName, userEmail, function (response) {
		response = JSON.parse(response);
		console.log(response.success);
        if (response.success) {
			console.log("good");
            users.innerHTML += '<li class="user"><p class="userName"> User:' + response.user.username + '</p><p class="userEmail"> Email:' + response.user.email + '</p></li>';
        } else {
			console.log("bad");
            var errorSection = document.getElementById('errors');
            errorSection.innerHTML += ('<p class="errorMessage">' + response.error + '</p>');
        }
		})
	}
	
});

// Do not modify this function. Add user service wrapper.
function addUser(username, email, callback) {
    var response, success = (!!Math.round(Math.random()));

    if (!success) {
        response = JSON.stringify({
            success: success,
            error: "Oups, something went wrong!" // Should this be Oops instead of Oups?
        });
    } else {
        response = JSON.stringify({
            success: success,
            user: {
                username: username,
                email: email
            }
        });
    }

    $.ajax({ // As per the requirements of this project, this should be changed to a non-jQuery REST call.
        url: '/echo/json/',
        type: "post",
        data: {
            json: response
        },
        success: callback
    });
};