-- Query for adding new customer with colon : 
-- character being used to denote the variables that will have data from the backend programming language 
insert into customer(customerFirstName, customerLastName)
    values(:firstNameInput, :lastNameInput);

-- Query for adding new item with colon : 
-- character being used to denote the variables that will have data from the backend programming language 
insert into item(itemTitle, itemDesc)
    values(:itemTitleInput, itemDescInpur);

-- Query for adding new order with colon : 
-- character being used to denote the variables that will have data from the backend programming language
insert into `order`(orderDate, customerId)
    values(:orderDateInput, customerIdInput);

-- Query for adding new orderItem with colon : 
-- character being used to denote the variables that will have data from the backend programming language
insert into orderItem(quantity, itemId, orderId)
    values(:quantityInput, :itemIdInput, :orderIdInput);
