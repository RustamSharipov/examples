import { USERS_URI_USER_REGISTRATION } from '../../constants';

describe('Sign up', function() {
  beforeEach(() => {
    cy.visit('/register');
    cy.get('.spec-app-content').contains('Create your MNFST account');
    cy.get('.spec-registration-form-submit-button').should('be.disabled');
  })

  it('Submit registration form', function() {
    cy.fixture('data/user.json').as('data.user');
    cy.fixture('errors/invalidRegistrationUser.json').as('error.invalidRegistrationUser');

    cy.server();
    cy.route({
      method: 'POST',
      response: '@error.invalidRegistrationUser',
      status: 400,
      url: USERS_URI_USER_REGISTRATION,
    });
    cy.get('[name="merchant.name"]').type('MNFST');
    cy.get('[name="merchant_user.name"]').type('John Doe');
    cy.get('[name="merchant_user.email"]').type('email@mnfst.com');
    cy.get('[name="merchant_user.password"]').type('1234');
    cy.get('[name="merchant_user.password_confirmation"]').type('123');
    cy.get('.spec-registration-form-terms-accepted').click();
    cy.get('.spec-registration-form-submit-button').should('be.enabled');
    cy.get('.spec-registration-form').submit();
    cy.get('.spec-registration-form').contains('Passwords doesn\'t match');
    
    cy.get('[name="merchant_user.password_confirmation"]').type('4');
    cy.get('.spec-registration-form').submit();
    cy.get('.spec-registration-form').contains('has already been taken');
    cy.get('.spec-registration-form').contains('has already been taken');
    cy.get('.spec-registration-form').contains('is too short (minimum is 8 characters)');

    cy.server();
    cy.route({
      method: 'POST',
      response: '@data.user',
      status: 201,
      url: USERS_URI_USER_REGISTRATION,
    });
    cy.get('[name="merchant.name"]').clear().type('Horns & Hoofs');
    cy.get('[name="merchant_user.email"]').clear().type('foo@bar.com');
    cy.get('[name="merchant_user.password"]').type('5678');
    cy.get('[name="merchant_user.password_confirmation"]').type('5678');
    cy.get('.spec-registration-form').submit();
    cy.get('.spec-registration-form').should('not.be.visible');
    cy.get('.spec-confirm-email-dialog').should('be.visible');
    cy.get('.spec-confirm-email-dialog').contains('Confirm your email');
  });
});
