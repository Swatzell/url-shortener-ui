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

  it('should create the new shortened URL when the form is submitted', () => {
    cy.get('input[name="title"]').type('Example');
    cy.get('input[name="urlToShorten"]').type('https://www.example.com');
    cy.get('form').submit();
    cy.wait('@saveUrl');
    cy.get('.url').should('have.length', 2);
    cy.get('.url').last().contains('Example');
    cy.get('.url').last().contains('http://localhost:3001/useshorturl/2');
  });

  it('should show an error message if the form is incomplete', () => {
    cy.get('input[name="title"]').type('Example');
    cy.get('form').submit();
    cy.get('.error').should('contain', 'Please fill in both fields.');
  });


  it('should show an error message if the server fails to fetch URLs', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('getUrlsError');

    cy.visit('http://localhost:3000');
    cy.get('.error').should('contain', 'Failed to fetch URLs.');
  });

  it('should delete a URL and remove it from the DOM', () => {
    cy.intercept('DELETE', 'http://localhost:3001/api/v1/urls/1', {
      statusCode: 204
    }).as('deleteUrl');

    cy.get('.url').should('have.length', 1);
    cy.get('.url').first().contains('Delete').click();
    cy.wait('@deleteUrl');
    cy.get('.url').should('have.length', 0);
  });
});

 
