import { headersPageElements } from "../../cypress/support/POM/headersPageElements"
import { singInPageElements } from "../../cypress/support/POM/singInPageElements"

Cypress.Commands.add('LoginWithoutCredentialsOrWithOneMissingCredential', (url, missingField = '', credential) => {

    cy.visit(url)
    cy.get(headersPageElements.signIn).click() 

    if (missingField === 'email') {
        cy.get(singInPageElements.email).clear()  
    } else if (credential !== ''){
        cy.get(singInPageElements.email).type(credential)
    }

    if (missingField === 'password') {
        cy.get(singInPageElements.password).clear()  
    } else if (credential !== '') {
        cy.get(singInPageElements.password).type(credential)
    }

    if (missingField === 'both') {
        cy.get(singInPageElements.email).clear()  
        cy.get(singInPageElements.password).clear()  
    }
})

Cypress.Commands.add('LoginWithIncorrectCredentialsOrCorrectLogin', (...arg) => {

    cy.visit(arg[0]) 
    cy.get(headersPageElements.signIn).click() 
    cy.get(singInPageElements.email).type(arg[1]) 
    cy.get(singInPageElements.password).type(arg[2]) 
    cy.get(singInPageElements.signInButton).click() 
})