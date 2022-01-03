/* eslint-env mocha */
describe('primitives', () => {
  it('boolean', () => {
    cy.visit('test/boolean/test.html')
    cy.contains('true')
  })

  it('number', () => {
    cy.visit('test/number/test.html')
    cy.contains('3')
  })

  it('string', () => {
    cy.visit('test/string/test.html')
    cy.contains('Hi')
  })
})

describe('objects', () => {
  it('array', () => {
    cy.visit('test/array/test.html')
    cy.contains('1,2,3')
  })

  it('object', () => {
    cy.visit('test/object/test.html')
    cy.contains('true,false')
  })
})

it('function', () => {
  cy.visit('test/function/test.html')
  cy.contains('11')
})
