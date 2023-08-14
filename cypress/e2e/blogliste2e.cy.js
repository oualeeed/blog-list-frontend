describe('Geeks and blogs', () => {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:8080/api/testing/reset')
    cy.request('POST', 'http://localhost:8080/api/users', {
      name: 'Oualid El-feraoui',
      username: 'Oualeed',
      password: '1305',
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  it('login fails with wrong credentials', function() {
    cy.get('#username').type('hello')
    cy.get('#password').type('password')
    cy.contains('log in').click()

    cy.contains('Wrong username or password')
  })

  it('login succeed with valid username and password', function() {
    cy.get('#username').type('Oualeed')
    cy.get('#password').type('1305')
    cy.contains('log in').click()

    cy.contains('Oualid El-feraoui is logged in.')
  })

})