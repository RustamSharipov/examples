import { USERS_URI_USER_LOGIN } from '../../constants';

describe('Billing', function() {
  beforeEach(() => {
    cy.visit('/billing');
    cy.signIn();
  })

  it('Billing index', function() {
    cy.get('.spec-app-content').should('contain', 'Billing');

    cy.get('.spec-billing-payment-method').should('have.length', 3);
    cy.get('.spec-billing-payment-promocode-method')
      .should('contain', 'Promo code')
      .and('contain', '$ 127 left');
    cy.get('.spec-billing-payment-creditcard-method')
      .should('contain', 'Mastercard ****-****-****-6532')
      .and('contain', 'Expires on 12/12/2019');
    cy.get('.spec-billing-payment-paypal-method')
      .should('contain', 'PayPal')
      .and('contain', 'rsharipov@mnfst.com');

    cy.get('.spec-billing-total-balance').should('contain', '$ 437.43');
    cy.get('.spec-billing-next-payment-date').should('contain', 'Next payment 5 Nov');
    cy.get('.spec-billing-target-amount').should('contain', 'Or when you reach $ 500');

    cy.get('.spec-billing-history-datepicker').should('have.length', 1);
    cy.get('.spec-billing-history-item').should('have.length', 8);
    cy.get('.spec-billing-history-item').eq(0)
      .should('contain', '6 Dec 2018')
      .and('contain', 'ADR_London_blog5235236')
      .and('contain', 'Credit card')
      .and('contain', '$ 129')
      .and('contain', 'Paid');
    cy.get('.spec-billing-history-item').eq(3)
      .should('contain', '13 Nov 2018')
      .and('contain', 'ADR_London_blog5235239')
      .and('contain', 'Credit card')
      .and('contain', '$ 81.91')
      .and('contain', 'Failed');
    cy.get('.spec-billing-history-item').eq(6)
      .should('contain', '12 Dec 2017')
      .and('contain', 'ADR_London_blog5235236')
      .and('contain', 'Credit card')
      .and('contain', '$ 119.1')
      .and('contain', 'Pending');
  });
});
