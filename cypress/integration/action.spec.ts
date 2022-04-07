/// <reference types="cypress" />


describe('Action', () => {
  beforeEach(() => {
    cy.visit('/')
  })


  it('fetch repos', () => {
    cy.get('[data-cy="search-input"]')
      .type('Hello World')

    cy.get('[data-cy="search-input"]').should('have.value', 'Hello World')

    cy.get('[data-cy="submit"]')
      .contains('Search')
      .click()

    cy.get('[data-cy="item-list"]')
      .find('[data-cy="item"]')
      .should('have.length', 30)


    cy.get('[data-cy="item-list"]')
      .find('[data-cy="item"]')
      .each((item) => {
        cy.wrap(item).contains('hello', { matchCase: false })
      })
    
    cy.get('[data-cy="search-input"]')
      .clear()

    cy.get('[data-cy="search-input"]')
      .should('not.have.value')
  })


  it.only('Scroll into bottom should fetch more data and url change', () => {
    cy.intercept('https://api.github.com/search/repositories?q=react&page=2&perPage=10').as('getMoreReactRepos')

    cy.get('[data-cy="search-input"]').should('not.have.value')

    cy.get('[data-cy="item-list"]')
      .find('[data-cy="item"]')
      .should('have.length', 30)

    cy.get('[data-cy="item-list"]')
      .find('[data-cy="item"]')
      .each((item) => {
        cy.wrap(item).contains('react', { matchCase: false })
      })

    cy.get('[data-cy="intersection-entry"]').scrollIntoView()

    cy.wait('@getMoreReactRepos', {timeout: 20000})

    cy.get('[data-cy="item-list"]')
      .find('[data-cy="item"]')
      .should('have.length', 30 * 2)

    cy.url().should('eq', 'http://localhost:3000/search?q=react&page=2')
  })
})