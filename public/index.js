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

function applyFilter() {
    var filter = document.getElementById('searchFilter').value.trim();
    console.log("Filter: " + filter)
    if (!filter) {
        alert("You must fill in the searchbar!");
    } else {
        window.location.href = '/people?search=' + filter;
    }
}

function delete_person(custID) {
    $.ajax({
        url: '/people/' + custID,
        type: 'DELETE',
        success: function (result) {
            window.location.reload(true);
        }
    })
}

function delete_order(orderId) {
    $.ajax({
        url: '/orders/' + orderId,
        type: 'DELETE',
        success: function (result) {
            if(result.responseText != undefined){
                console.log(result.responseText)
            }
            else {
                window.location.reload(true)
            } 
        }
    })
}
