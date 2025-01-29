/// <reference types="cypress"/>

import { singInPageElements } from "../../../cypress/support/POM/singInPageElements"

describe('Login', () => {

    let loginData

    before(() => {
        cy.fixture('UIData/ui').then((data) => { loginData = data.dataForLogin; });
    });

    const url = Cypress.env("url")
    const credentials = Cypress.env("credentials")
    

    it('Without credentials', () => {
        cy.LoginWithoutCredentialsOrWithOneMissingCredential(url, loginData.withoutCredentialEmailAndPassword, '')
        cy.get(singInPageElements.signInButton).should(loginData.attribute) 
    });

    it('Without email', () => {
        cy.LoginWithoutCredentialsOrWithOneMissingCredential(url, loginData.withoutCredentialEmail, credentials.password)
        cy.get(singInPageElements.signInButton).should(loginData.attribute) 
    });

    it('Without password', () => {
        cy.LoginWithoutCredentialsOrWithOneMissingCredential(url, loginData.withoutCredentialPassword, credentials.email)
        cy.get(singInPageElements.signInButton).should(loginData.attribute) 
    });

    it('With incorrect email', () => {
        cy.LoginWithIncorrectCredentialsOrCorrectLogin(url, loginData.wrongEmail, credentials.password)
        cy.get(singInPageElements.errorMessage).should('have.text', loginData.errorMessage) 
            .and('have.css', 'color', loginData.color)
    });

    it('With incorrect password', () => {
        cy.LoginWithIncorrectCredentialsOrCorrectLogin(url, credentials.email, loginData.wrongPassword)
        cy.get(singInPageElements.errorMessage).should('have.text', loginData.errorMessage)
            .and('have.css', 'color', loginData.color)
    });

    it('With correct credentials', () => {
        cy.LoginWithIncorrectCredentialsOrCorrectLogin(url, credentials.email, credentials.password)
        cy.url().should('eq', url) 
    });
});
