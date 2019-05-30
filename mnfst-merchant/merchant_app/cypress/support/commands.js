import { BASE_URI_STATISTIC, USERS_URI_USER_LOGIN, USERS_URI_USER_PROFILE } from '../constants';
import jwt from '../fixtures/headers/jwt';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('signIn', () => {
  cy.fixture('data/statistic.json').as('data.statistic');
  cy.fixture('data/user.json').as('data.user');

  cy.server();
  cy
    .route({
      method: 'POST',
      response: '@data.user',
      status: 200,
      url: USERS_URI_USER_LOGIN,
    });
  cy.route({
    method: 'GET',
    response: '@data.statistic',
    status: '200',
    url: BASE_URI_STATISTIC,
  });

  // cy.visit('/login');
  cy.contains('Sign in to MNFST');

  cy.get('[name="merchant_user.email"]').type('boss@axe.com');
  cy.get('[name="merchant_user.password"]').type('11111111');
  cy.get('.spec-merchant_user-submit-button').should('be.enabled');

  cy.get('.spec-login-form').submit();
});

Cypress.Commands.add('updateProfile', (params={}) => {
  const { data, method, status } = params;
  cy.fixture('data/user.json').as('data.user');

  cy.server();
  cy.route({
    method: method || 'PATCH',
    response: data || '@data.user',
    status: status || 200,
    url: USERS_URI_USER_PROFILE,
  });
});

/**
 * Uploads a file to an input
 * @memberOf Cypress.Chainable#
 * @name upload_file
 * @function
 * @param {String} selector - element to target
 * @param {String} fileUrl - The file url to upload
 * @param {String} type - content type of the uploaded file
 */
Cypress.Commands.add('uploadFile', (selector, fileUrl, type='') => {
  return cy.get(selector).then(subject => {
    return cy
      .fixture(fileUrl, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then((blob) => {
        return cy.window().then((win) => {
          const node = subject[0];
          const nameSegments = fileUrl.split('/');
          const name = nameSegments[nameSegments.length - 1];
          const testFile = new win.File([blob], name, { type });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(testFile);
          node.files = dataTransfer.files;
          return subject;
        })
    })
  })
})
