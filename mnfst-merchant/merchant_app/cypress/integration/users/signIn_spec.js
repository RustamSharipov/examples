import { USERS_URI_USER_LOGIN, USERS_URI_USER_LOGOUT } from '../../constants';

describe('Sign in', function() {
  beforeEach(() => {
    cy.visit('/profile');
  })

  it('Incomplete form', function() {
    cy.contains('Sign in to MNFST');
    cy.get('.spec-merchant_user-submit-button').should('be.disabled');

    cy.get('[name="merchant_user.email"]').type('mail@mail.com');
    cy.get('.spec-merchant_user-submit-button').should('be.disabled');

    cy.get('[name="merchant_user.email"]').clear();
    cy.get('[name="merchant_user.password"]').type('12345678');
    cy.get('.spec-merchant_user-submit-button').should('be.disabled');
  });

  it('Submit invalid form', function() {
    cy.fixture('errors/invalidLoginUser.json').as('error.invalidLoginUser');

    cy.server();
    cy.route({
      method: 'POST',
      response: '@error.invalidLoginUser',
      status: 401,
      url: USERS_URI_USER_LOGIN,
    });
    cy.route({
      method: 'DELETE',
      status: 204,
      url: USERS_URI_USER_LOGOUT,
    });

    cy.contains('Sign in to MNFST');

    cy.get('[name="merchant_user.email"]').type('mail@mail.com');
    cy.get('[name="merchant_user.password"]').type('12345678');
    cy.get('.spec-merchant_user-submit-button').should('be.enabled');

    cy.get('.spec-login-form').submit();
    cy.get('.spec-login-form').contains('Invalid email or password.');
  });

  it('Sign in', function() {
    cy.signIn();

    cy.get('.spec-app-header').contains('Axe Capital');
    cy.get('.spec-app-header').contains('Robert Axelrod');

    cy.get('.spec-app-header').contains('Sign Out');
  });

  it('Sign out', function() {
    cy.signIn();

    cy.get('.spec-app-header-signout-button').click();
    cy.get('.spec-app-header-signout-button').should('not.exist');
  });
});
