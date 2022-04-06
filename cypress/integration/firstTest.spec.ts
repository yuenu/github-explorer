/// <reference types="cypress" />

const PER_PAGE = 30

describe('First', () => {
  beforeEach(() => {
    cy.intercept('')
    cy.visit('http://localhost:3000/')
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
      .should('have.length', PER_PAGE)

    cy.get('[data-cy="item-list"]')
      .find('[data-cy="item"]')
      .each((item) => {
        cy.wrap(item).contains('react', { matchCase: false })
      })
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
      .should('have.length', PER_PAGE)


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
      .should('have.length', PER_PAGE)

    cy.get('[data-cy="item-list"]')
      .find('[data-cy="item"]')
      .each((item) => {
        cy.wrap(item).contains('react', { matchCase: false })
      })

    cy.get('[data-cy="intersection-entry"]').scrollIntoView()

    cy.wait('@getMoreReactRepos', {timeout: 20000})

    cy.get('[data-cy="item-list"]')
      .find('[data-cy="item"]')
      .should('have.length', PER_PAGE * 2)

    cy.url().should('eq', 'http://localhost:3000/search?q=react&page=2')
  })
})