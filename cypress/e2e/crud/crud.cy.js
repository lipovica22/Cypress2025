import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { singInPageElements } from "../../../cypress/support/POM/singInPageElements";
import { headersPageElements } from "../../../cypress/support/POM/headersPageElements";
import { createOrEditPageElements } from "../../../cypress/support/POM/createOrEditPageElements";
import { articlesPageElements } from "../../../cypress/support/POM/articlesPageElements";


const credentials = Cypress.env("credentials");
const url = Cypress.env("url");
const urlSingIn = Cypress.env("urlSingIn");

let cucumberData

    before(() => {
        cy.fixture('cucumberData/cucumber').then((data) => { cucumberData = data.cucumberData; });
    });
    

Given('Visit page', () => {
    cy.visit(urlSingIn)
})


When('Imput email', () => {
    cy.get(singInPageElements.email).clear()
    cy.get(singInPageElements.email).type(credentials.email)
})

When('Imput password', () => {
    cy.get(singInPageElements.password).clear()
    cy.get(singInPageElements.password).type(credentials.password)
})

When('Click on  Sign in button', () => {
    cy.get(singInPageElements.signInButton).click()
})

Then('Assert URL', () => {
    cy.url().should('eq', url)
})

When('Click on button New Article', () => {
    cy.get(headersPageElements.newArticle).click()
})

When('Set value to Arricle Title', () => {
    cy.get(createOrEditPageElements.articleTitle).type(cucumberData.createArticleTitle)
})

When('Set value to What is this article about', () => {
    cy.get(createOrEditPageElements.whatIsThisArticleAbout).type(cucumberData.createWhatIsThisArticleAbout)
})

When('Set value to Write your Article', () => {
    cy.get(createOrEditPageElements.writeYourArticle).type(cucumberData.createWriteYourArticle)
})

When('Set value to Enter tags', () => {
    cy.get(createOrEditPageElements.enterTags).type(cucumberData.createEnterTags)
})

When('Click on button Publish Article', () => {
    cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles/*').as('waitCreate')
    cy.get(createOrEditPageElements.publishArticle).click();
    cy.wait('@waitCreate')
})

When('Click on button Home', () => {
    cy.get(headersPageElements.home).click();
})

Then('Assert first article on the page after create article', () => {
    cy.get(articlesPageElements.articleName).eq(0).should('be.visible');
    cy.get(articlesPageElements.articleName).eq(0).should('have.text', cucumberData.createArticleTitle)
})

When('Click on first article on the page', () => {
    cy.get(articlesPageElements.articleName).eq(0).click()
})

When('Click on button Edit Article', () => {
    cy.get(createOrEditPageElements.editButton).click()
})

When('Edit value to Arricle Title', () => {
    cy.get(createOrEditPageElements.articleTitle)
        .should('be.visible')
        .wait(500)
        .clear()
        .type(cucumberData.editArticleTitle);
})

When('Click on button Publish Article', () => {
    cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles/*').as('waitCreate')
    cy.get(createOrEditPageElements.publishArticle).click();
    cy.wait('@waitCreate')
})

When('click on link conduit', () => {
    cy.get(headersPageElements.conduit).click();
})

Then('Assert first article on the page after Edit article', () => {
    cy.get(articlesPageElements.articleName).eq(0).should('be.visible');
    cy.get(articlesPageElements.articleName).eq(0).should('have.text', cucumberData.editArticleTitle)
})

When('Click on first article on the page', () => {
    cy.get(articlesPageElements.articleName).eq(0).click()
})


