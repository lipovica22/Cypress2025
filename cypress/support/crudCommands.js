
Cypress.Commands.add('putObject', (requestURL, data, token) => {
    cy.request({
        method: 'PUT',
        url: requestURL,
        headers: { 'Authorization': 'Token ' + token },
        body: data
    });
});

Cypress.Commands.add('postObject', (requestURL, data, token) => {
    cy.request({
        method: 'POST',
        url: requestURL,
        headers: { 'Authorization': 'Token ' + token },
        body: data
    });
});

Cypress.Commands.add('getObject', (requestURL, token) => {
    cy.request({
        method: 'GET',
        url: requestURL,
        headers: { 'Authorization': 'Token ' + token }
    });
});

Cypress.Commands.add('deleteObject', (requestURL, token) => {
    cy.request({
        method: 'DELETE',
        url: requestURL,
        headers: { 'Authorization': 'Token ' + token }
    });
});




