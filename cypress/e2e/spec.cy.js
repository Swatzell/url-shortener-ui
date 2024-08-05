describe('URL Shortener', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      fixture: 'urls.json'
    }).as('getUrls');

    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        id: 2,
        long_url: 'https://www.example.com',
        short_url: 'http://localhost:3001/useshorturl/2',
        title: 'Example'
      }
    }).as('saveUrl');

    cy.visit('http://localhost:3000');
  });

  it('should display the title, form, and existing URLs', () => {
    cy.get('header').contains('URL Shortener');
    cy.get('form');
    cy.get('.url').should('have.length', 1);
  });

  it('should take the input field values when the form is filled out', () => {
    cy.get('input[name="title"]').type('Example').should('have.value', 'Example');
    cy.get('input[name="urlToShorten"]').type('https://www.example.com').should('have.value', 'https://www.example.com');
  });

 
});