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


function submit_check() { //function checks if search is valid and if so calls function to create new person
	var firstName = document.getElementById('firstname').value.trim();
    var lastName = document.getElementById('lastname').value.trim();

    if (!firstName || !lastName) { //checks if user input is valid
        alert("You must fill in all of the fields!");
    } else {    
        var newPersonHTML = createPerson(firstName, lastName); //calls create person function
        console.log("here", newPersonHTML)
        var personContainer = document.querySelector('.peopleContainer');

        personContainer.insertAdjacentHTML('beforeend', newPersonHTML)
    }
}

function applyPeopleFilter() { //filters people based on user input and renders people who meet search criteria
    var filter = document.getElementById('searchFilter').value.trim();
    console.log("Filter: " + filter)
    if (!filter) { //checks if input is valid
        alert("You must fill in the searchbar!");
    } else {
        window.location.href = '/people?search=' + filter; //makes call to render a page based on search 
    }
}

function applyOrderFilter() { //filters orders based on user input of orderId
    var filter = document.getElementById('searchFilter').value.trim();
    console.log("Filter: " + filter)
    if (!filter) { //checks if user input if valid
        alert("You must fill in the searchbar!");
    } else {
        window.location.href = '/orders?search=' + filter; //makes a call to render a page based on search
    }
}

function applyItemFilter() { //filters items based on user Input
    var filter = document.getElementById('searchFilter').value.trim();
    console.log("Filter: " + filter)
    if (!filter) {
        alert("You must fill in the searchbar!");
    } else {
        window.location.href = '/items?search=' + filter;
    }
}

function delete_person(custID) { //deletes customer from database
    $.ajax({ //ajax call
        url: '/people/' + custID,
        type: 'DELETE',
        success: function (result) {
            window.location.reload(true); //updates page
        }
    })
}

function delete_order(orderId) { //deletes order
    $.ajax({
        url: '/orders/' + orderId,
        type: 'DELETE',
        success: function (result) {
            if(result.responseText != undefined){
                console.log(result.responseText)
            }
            else {
                window.location.reload(true) //updates page
            } 
        }
    })
}

function delete_item(itemId) { //deletes item
    $.ajax({
        url: '/items/' + itemId,
        type: 'DELETE',
        success: function (result) { 
            if (result.responseText != undefined) {
                console.log(result.responseText)
            }
            else {
                window.location.reload(true) //updates page
            }
        }
    })
}

function delete_orderItem(orderId, itemId) {
    $.ajax({
        url: '/detailsOrder/' + orderId + "/" + itemId,
        type: 'DELETE',
        success: function (result) {
            if (result.responseText != undefined) {
                console.log(result.responseText)
            }
            else {
                window.location.reload(true)
            }
        }
    })
}
