// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Blog app', function() {

  const user = {
    username: 'admin',
    name: 'Administrator',
    password: 'admin'
  }

  beforeEach(function () {
    // Erases all the existing data
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    // Creates an user
    cy.createUser(user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is opened', function() {
    // App title
    cy.contains('blogs')
    // Login form title
    cy.contains('Login')
  })

  describe('Login', function() {

    it('Succeeds with correct credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)

      cy.get('button[type=submit]').click()

      cy.contains(`User ${user.name} logged in`)
    })


    it('Fails with wrong credentials', function() {
      cy.get('#username').type('not-admin')
      cy.get('#password').type('not-admin')

      cy.get('button[type=submit]').click()

      cy.get('.notification').should('contain', 'Wrong credentials')
      cy.get('.notification').should('have.css', 'background-color', 'rgb(255, 160, 122)') // Lightsalmon = RGB(255, 160, 122)
    })

  })

  describe('When logged in', function() {

    const blog = {
      title: 'Testing blog',
      author: 'Luciano',
      url: 'http://localhost.com'
    }

    beforeEach(function() {
      // Bypasss login
      cy.login(user)
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      // Fill the form
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)

      // Submit
      cy.get('button[type=submit]').click()

      // Expecto te see the blog created
      cy.get('.blog').should('contain', blog.title)
      // Expect to see the success notification
      cy.get('.notification').should('have.css', 'background-color', 'rgb(144, 238, 144)')
    })

    describe('When a blog already exists', function() {

      beforeEach(function() {
        // bypass blog creation
        cy.createBlog(blog)
      })

      it('Increasing like counter', function() {
        // We make visible the like button
        cy.get('.toggle-blog').click()

        // Expect to have 0 likes (as we haven't provided any likes when creating it)
        cy.get('.like-counter').should('contain', '0')
        cy.get('.like-button').click()
        // Expect to have 1 like
        cy.get('.like-counter').should('contain', '1')
      })

      describe.only('Deleting a blog', function() {

        it('The owner deletes their blog', function() {
          // We make visible the remove button
          cy.get('.toggle-blog').click()

          cy.get('.remove-button').click()

          // We expecto to don't have any blog
          cy.get('.blog').should('not.exist')
        })

        it('Any other user than the owner tries to delete the blog', function() {
          const anotherUser = {
            username: 'anotherAdmin',
            name: 'Another Administrator',
            password: 'admin'
          }

          // We create another user and create a token for it
          cy.createUser(anotherUser)
          cy.login(anotherUser)

          // We try to delete the blog
          cy.get('.toggle-blog').click()
          cy.get('.remove-button').click()

          cy.get('.notification').should('contain', '403') // Forbidden
          cy.get('.notification').should('have.css', 'background-color', 'rgb(255, 160, 122)') // Lightsalmon = RGB(255, 160, 122)
        })
      })
    })
  })

})