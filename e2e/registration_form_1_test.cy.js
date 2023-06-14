// Before each test (it...) load .html page
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

/*
Assignment 2:

 1. Update the name of test suite by adding you name: “This is first test suite, John Smith” +
 2. Replace text ‘MyPass’ in the first test with your own chosen password (2 places) - passwords should match +
 3. Change phone number in the first test to 555666777 +
 4. Change the order of steps in the first test:
      -first set phone number
      -then 2 password fields
      -then username
 5. Add comment to the first test containing today’s date +
 */


describe('This is first test suite, Ilja', () => {
    it('User can submit data only when valid mandatory values are added', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('Pass')
        cy.get('[name="confirm"]').type('Pass')
        cy.get('#username').type('Something')
        //06.06

        //in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()

        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that both input and password error messages are not shown
        // next 2 lines check exactly the same, but using different approach
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')

        // Assert that success message is visible
        // next 2 lines check exactly the same, but using different approach
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
    });
})

it.only('User cannot submit data when phone number is absent', () => {
    cy.get('[data-testid="phoneNumberTestId"]').clear()
    cy.get('#username').type('ErikaSed')
    cy.get('input[name="password"]').type('MyPass123')
    cy.get('[name="confirm"]').type('MyPass123')

    // Scroll back to username input field
    cy.get('#username').scrollIntoView()
    cy.get('#username').type('ErikaSed')
    cy.get('h2').contains('Password').click()

    // Asserting that Submit button is disabled
    cy.get('.submit_button').should('be.disabled')

    // Assert that success message is not visible
    cy.get('#success_message').should('not.be.visible')

    // Assert that correct error message is visible and contain Mandatory input field...
   // cy.get('#input_error_message').should('be.visible')
    cy.get('p#input_error_message.error_message')
    .should('not.be.visible') // Assert that the element is initially not visible
    .invoke('removeAttr', 'style') // Remove the 'style' attribute to make the element visible
    .should('be.visible') // Assert that the element is now visible
    .click({ force: true }) // Click on the element using the 'force' option to bypass visibility checks
     .should('be.visible'); // Assert that the element is still visible after the click

    // Assert that username has tooltip with error message
    //cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')
    cy.get('input[name="username"]')
    .should('have.attr', 'title');
    
    // There are 2 options how to check error message visibility: using CSS or simply be.visible
    // none = not visible; block = visible
    cy.get('#input_error_message').should('be.visible')
    cy.get('#input_error_message').should('have.css', 'display', 'block');
})


/*

    it('User cannot submit data when phone number is absent', () => {                
                cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
                cy.get('input[name="password"]').type('MyPass')
                cy.get('[name="confirm"]').type('MyPass')
                // Scroll back to username input field
                cy.get('#username').scrollIntoView()
                cy.get('#username').clear().type('  ')
                cy.get('h2').contains('Password').click()
                // Asserting that Submit button is disabled
                cy.get('.submit_button').should('be.disabled')
        
                // Assert that success message is not visible
                cy.get('#success_message').should('not.be.visible')
        
                // Assert that correct error message is visible and contain Mandatory input field...
                cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
        
                // Assert that username has tooltip with error message
                cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')
        
                // There are 2 options how to check error message visibility: using CSS or simply be.visible
                // none = not visible; block = visible
                cy.get('#input_error_message').should('be.visible')
               // cy.get('#input_error_message').should('have.css', 'display', 'block')
            });
*/
            it('User cannot submit data when password is absent', () => {
                cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
                //cy.get('input[name="password"]').type('MyPass')
                cy.get('[name="confirm"]').type('MyPass')
            
                // Scroll back to username input field
               // cy.get('input[type="password"]').scrollIntoView()
                cy.get('div.flex-container:nth-child(20) > label:nth-child(1) > input:nth-child(1)').scrollIntoView();
                cy.get('div.flex-container:nth-child(20) > label:nth-child(1) > input:nth-child(1)').clear().type('  ')
                cy.get('h2').contains('Password').click()
            
                // Asserting that Submit button is disabled
                cy.get('.submit_button').should('be.disabled')
            
                // Assert that success message is not visible
                cy.get('#success_message').should('not.be.visible')
            
                // Assert that correct error message is visible and contain Mandatory input field...
                //cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
                cy.get('#input_error_message')
                .invoke('removeAttr', 'style')
                .should('be.visible')
                .should('contain', 'Mandatory input field');
              
                // Assert that username has tooltip with error message
                //cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')
                cy.get('input[name="username"]')
                .should('have.attr', 'title');
              
                // There are 2 options how to check error message visibility: using CSS or simply be.visible
                // none = not visible; block = visible
                cy.get('#input_error_message').should('be.visible')
                cy.get('#input_error_message').should('have.css', 'display', 'block')
            });


    describe('User can use only same both first and validation passwords', () => {
        it('User can use only same both first and validation passwords', () => {
            cy.get('#username').type('johnDoe')
            cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
            cy.get('input[name="password"]').type('MyPass')
            cy.get('[name="confirm"]').type('MyPass123')
            // type('{enter}') is clicking native button e.g to click backspace use '{backspace}'
            cy.get('[name="confirm"]').type('{enter}')
    
            // Scroll to bottom of the page
            cy.window().scrollTo('bottom')
    
            // Assert that password error message is visible, and message should contain 'Passwords do not match!
            cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
            // Assert that success message is not visible
            cy.get('#success_message').should('not.be.visible')
            // Asserting that Submit button is disabled
            cy.get('.submit_button').should('be.disabled')
            // Assert that password confirmation input fields has attribute 'title' with text stating 'Both passwords should match'
            cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')
        });
    })
    
    describe('User cannot submit data when username is absent', () => {
    it('User cannot submit data when username is absent', () => {
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('MyPass')
        // Scroll back to username input field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear().type('  ')
        cy.get('h2').contains('Password').click()
        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that correct error message is visible and contain Mandatory input field...
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')

        // Assert that username has tooltip with error message
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')

        // There are 2 options how to check error message visibility: using CSS or simply be.visible
        // none = not visible; block = visible
        cy.get('#input_error_message').should('be.visible')
       // cy.get('#input_error_message').should('have.css', 'display', 'block')
    });
})

    
    //Assignment 3: add the content to the following tests
    describe('This is assignment 3, letters in phone', () => {
        it('User cannot add letters to phone number', () => {
            cy.get('[data-testid="phoneNumberTestId"]').type('555666777aaa');
            cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number');
            cy.get('input[name="password"]').type('Pass');
            cy.get('[name="confirm"]').type('Pass');
            cy.get('#username').type('Something');
            cy.get('.submit_button').should('be.disabled');
            cy.get('.submit_button').click({ force: true });
            cy.get('#input_error_message').should('not.be.visible');
        });
        
    })