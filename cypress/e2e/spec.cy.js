describe('URL Shortener', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      fixture: 'urls.json'
    }).as('getUrls');

    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        id: 2,
        long_url: 'https://www.google.com',
        short_url: 'http://localhost:3001/useshorturl/2',
        title: 'Google'
      }
    }).as('saveUrl');

    cy.visit('http://localhost:3000');
  });

  