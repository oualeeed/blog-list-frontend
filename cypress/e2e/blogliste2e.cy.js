describe('Geeks and blogs', () => {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:8080/api/testing/reset')
    cy.request('POST', 'http://localhost:8080/api/users', {
      name: 'Oualid El-feraoui',
      username: 'Oualeed',
      password: '1305',
    })
    cy.request('POST', 'http://localhost:8080/api/users', {
      name: 'Asmae Laaroussi',
      username: 'Asmae',
      password: '1305',
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('login', function() {
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username: 'Oualeed',
        password: '1305',
      })
    })

    it('A blog can be created', function() {
      cy.contains('create a note').click()
      cy.get('#title').type('cypress title')
      cy.get('#author').type('cypress')
      cy.get('#URL').type('cypress URL')

      cy.get('#createButton').click()
      cy.contains('cypress title by cypress')
    })

    describe('And a blog exsist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'another blog from cypress',
          author: 'cypresso',
          url : 'urlurlurlurlurl'
        })
      })

      it('can like a post', function() {
        cy
          .contains('another blog from cypress')
          .contains('view')
          .click()
        cy
          .contains('another blog from cypress')
          .get('#like-button')
          .click()

        cy.contains('likes 1')
      })

      it('a blog can be deleted',  function() {
        cy
          .contains('another blog from cypress')
          .contains('view')
          .click()

        cy
          .contains('another blog from cypress')
          .get('#remove-button')
          .click()

        cy
          .root()
          .should('not.include.text', 'another blog from cypress')
      })

      describe('Antoher user logged in', function() {
        beforeEach(function() {
          cy.logout()
          cy.login({
            username: 'Asmae',
            password: '1305'
          })
        })

        it('can\'t see the remove button on other\'s blogs', function() {
          cy
            .contains('another blog from cypress')
            .contains('view')
            .click()

          cy
            .contains('likes')
            .get('#remove-button')
            .should('not.exist')
        })
      })
    })

    describe('And many blogs exsist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'the third most liked blog',
          author: 'auth3',
          url: 'url',
        })
        cy.createBlog({
          title: 'the most liked blog',
          author: 'auth1',
          url: 'url',
        })
        cy.createBlog({
          title: 'the second most liked blog',
          author: 'auth2',
          url: 'url',
        })


        cy.giveLikes('the most liked blog')
        cy.giveLikes('the most liked blog')
        cy.giveLikes('the most liked blog')

        cy.giveLikes('the second most liked blog')
        cy.giveLikes('the second most liked blog')
      })

      it.only('they are ordered according to likes', function() {
        cy.get('.blog').eq(0).should('contain', 'the most liked blog')
        cy.get('.blog').eq(1).should('contain', 'the second most liked blog')
        cy.get('.blog').eq(2).should('contain', 'the third most liked blog')
      })
    })
  })

})