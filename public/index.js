function createPerson(firstName, lastName){

    var context = {
        firstname: firstName,
        lastname: lastName,
    }
    var peopleSection = Handlebars.templates.person(context)
    console.log("Test:", peopleSection);

    return peopleSection;
}

document.getElementById('submit').addEventListener('click', submit_check)

function submit_check() {
	var firstName = document.getElementById('firstname').value.trim();
    var lastName = document.getElementById('lastname').value.trim();

    if (!firstName || !lastName) {
        alert("You must fill in all of the fields!");
    } else {    
        var newPersonHTML = createPerson(firstName, lastName);
        console.log("here", newPersonHTML)
        var personContainer = document.querySelector('.peopleContainer');

        personContainer.insertAdjacentHTML('beforeend', newPersonHTML)
    }
}

