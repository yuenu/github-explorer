/// <reference types="cypress" />


describe('First', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('get Element', () => {
    cy.get('[data-cy="input"]')
      .type('Hello World')

    cy.get('[type="submit"]')
      .click()
  })
})