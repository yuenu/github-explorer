/// <reference types="cypress" />


describe('Initial', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Text is correctly', () => {
    cy.get('[data-cy="heading"]').should('have.text', 'Github Explorer')

    cy.get('[data-cy="title"]').should('have.text', 'Search Repos')

    cy.get('[data-cy="search-input"]').should('have.empty')

    cy.get('[data-cy="submit"]').should('have.text', 'Search')
  })

  it('Initial load should fetch react repos', () => {
    cy.get('[data-cy="search-input"]').should('not.have.value')

    cy.get('[data-cy="item-list"]')
      .find('[data-cy="item"]')
      .should('have.length', 30)

    cy.get('[data-cy="item-list"]')
      .find('[data-cy="item"]')
      .each((item) => {
        cy.wrap(item).contains('react', { matchCase: false })
      })
  })
})