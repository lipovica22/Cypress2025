/// <reference types="cypress"/>

describe('CRUD', () => {

    let apiLoginData, apiNewArticleData, apiEditArticleData, apiAssertData;

    before(() => {
        cy.fixture('apiCrudData/apiAssertJsonData').then((data) => { apiAssertData = data.assertCrud })
        cy.fixture('apiCrudData/apiLoginCredentialsJsonData').then((data) => { apiLoginData = data; });
        cy.fixture('apiCrudData/apiNewArticleJsonData').then((data) => { apiNewArticleData = data; });
        cy.fixture('apiCrudData/apiEditArticleJsonData').then((data) => { apiEditArticleData = data; });
    });


    it('Crud api', () => {

        cy.request('POST', 'https://conduit-api.bondaracademy.com/api/users/login', apiLoginData).then(response => {
            console.log(response)
            expect(response.status).to.equal(apiAssertData.postLoginStatus)

            const token = response.body.user.token;

            cy.postObject('https://conduit-api.bondaracademy.com/api/articles/', apiNewArticleData, token).then(response => {
                console.log(response)
                expect(response.status).to.equal(apiAssertData.postStatus)

                const slug = response.body.article.slug;
                console.log(slug)

                cy.getObject(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, token).then(object => {
                    console.log(object)
                    expect(object.status).to.equal(apiAssertData.getStatus)

                    cy.putObject(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, apiEditArticleData, token).then(object => {
                        console.log(object)
                        expect(object.status).to.equal(apiAssertData.putStatus)

                        const editSlug = object.body.article.slug;

                        cy.deleteObject(`https://conduit-api.bondaracademy.com/api/articles/${editSlug}`, token).then(object => {
                            console.log(object)
                            expect(object.status).to.equal(204)

                            cy.getObject('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', token).then(response => {
                                console.log(response)
                                expect(response.body.articles[0].title).not.to.equal(apiAssertData.title)
                            });
                        });
                    });
                });
            });
        });
    });
});
