const appStoreMNFSTLink = 'https://itunes.apple.com/us/app/mnfst/id1244586082?ls=1&mt=8';
const googlePlayMNFSTLink = 'https://play.google.com/store/apps/details?id=com.mnfst.app';

describe('Merchant landing', function() {
  context('All resolutions', function() {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Unauth landing', function() {
      cy.get('.spec-app-landing-header-logo').should('have.length', 1);
      cy.get('.spec-app-landing-header')
        .should('contain', 'for Business')
        .and('contain', 'for Users');
      cy.get('.spec-app-landing-header-users-landing-link').click();
      cy.get('body').should('contain', 'Manifest yourself');
      cy.go('back');
      cy.get('.spec-app-landing-header').should('contain', 'for Business');

      cy.get('.spec-landing-teaser-title').should('include.text', 'The world\'s firstcrowd marketing tool');
      cy.get('.spec-landing-teaser-caption').should('contain.text', '9 billion profiles  on Instagram, Twitter and '
        + 'Facebook just became ad platforms.Manifest your brand to a bigger, more engaged audience');
      cy.get('.spec-landing-teaser-create-campaign-button').click();
      cy.get('.spec-app-content').should('contain', 'Create your MNFST account');
      cy.get('.spec-app-header-logo').click();

      cy.get('.spec-selfie-campaign-create-campaign-button').click();
      cy.get('.spec-app-content').should('contain', 'Create your MNFST account');
      cy.get('.spec-app-header-logo').click();

      cy.get('.spec-landing-promo-step-item').should('have.length', 6);
      cy.get('.spec-landing-promo-step-item-title').should('have.length', 6);
      cy.get('.spec-landing-promo-step-item-subtitle').should('have.length', 6);
      cy.get('.spec-landing-promo-step-item-caption').should('have.length', 5);

      cy.get('.spec-landing-get-on-board-section')
        .scrollIntoView()
        .should('be.visible')
        .and('contain', 'Get on board!');
      cy.get('.spec-landing-get-on-board-sample-get-presentation a')
        .should('have.attr', 'href', 'https://static.mnfst.com/merchant/MNFST-For_business.pdf');
      cy.get('.spec-landing-get-on-board-sample-schedule-demo a')
        .should('have.attr', 'href', 'mailto:business@mnfst.com');

      const currentYear = Cypress.moment().format('YYYY')
      cy.get('.spec-app-landing-footer-logo').should('have.length', 1);
      cy.get('.spec-app-landing-footer')
        .should('contain', 'Get MNFST on')
        .and('contain', `© ${currentYear}, MNFST LTD, 32 Kritis Street, Papachristoforou Building, 4th Floor, `
          + '3087 Limassol, Cyprus. Company Reg Number: HE 382568.');
      cy.get('.spec-app-landing-footer .spec-applink-appstore')
        .should('be.visible')
        .and('have.attr', 'href', appStoreMNFSTLink);
      cy.get('.spec-app-landing-footer .spec-applink-googleplay')
        .should('be.visible')
        .and('have.attr', 'href', googlePlayMNFSTLink);
      
      cy.get('.spec-app-landing-footer-item-terms-link')
        .should('contain', 'Terms & Conditions')
        .and('have.attr', 'href', 'https://mnfst.com/license');
      cy.get('.spec-app-landing-footer-item-privacy-link')
        .should('contain', 'Privacy Policy')
        .and('have.attr', 'href', 'https://mnfst.com/privacy');
      cy.get('.spec-app-landing-footer-mnfst-email')
        .should('contain', 'business@mnfst.com')
        .and('have.attr', 'href', 'mailto:business@mnfst.com');
    });
  });

  context('Desktop resolution', function() {
    beforeEach(() => {
      cy.viewport('macbook-13');
      cy.visit('/');
    });

    it('Unauth landing', function() {
      cy.get('.spec-app-landing-header')
        .should('contain', 'How it works')
        .and('contain', 'Case studies');
      cy.get('.spec-landing-navigation-item').should('be.visible');

      cy.get('.spec-landing-teaser-scrolling-directions-caption')
        .should('be.visible')
        .and('contain', 'Scroll down to learn more');
      
      cy.get('.spec-landing-selfie-campaigns-creatives-types').should('be.visible');

      cy.get('.spec-landing-how-it-works-section')
        .scrollIntoView()
        .should('be.visible')
        .and('contain', 'How it works');
      cy.get('.spec-landing-promo-step-item-icon').should('be.visible');
      cy.get('.spec-landing-promo-step-item-content').should('be.visible');

      cy.get('.spec-landing-navigation-sign-in').click();
      cy.get('.spec-app-content').should('contain', 'Create your MNFST account');
      cy.get('.spec-app-header-logo').click();

      cy.get('.spec-landing-navigation-careers').click();
      cy.get('body').should('contain', 'Careers');
      cy.go('back');
      cy.get('.spec-app-landing-header').should('contain', 'for Business');
    });
  });
  
  context('Mobile resolution', function() {
    beforeEach(() => {
      cy.viewport('iphone-5');
      cy.visit('/');
    });

    it('Unauth landing', function() {
      cy.get('.spec-app-landing-header')
        .should('contain', 'How it works')
        .and('contain', 'Case studies');
      cy.get('.spec-landing-navigation-item').should('not.visible');

      cy.get('.spec-landing-teaser-scrolling-directions-caption').should('not.visible');

      cy.get('.spec-landing-selfie-campaigns-creatives-types').should('not.visible');

      cy.get('.spec-landing-how-it-works-section')
        .scrollIntoView()
        .should('be.visible')
        .and('contain', 'How it works');
      cy.get('.spec-landing-promo-step-item-icon').should('not.visible');
      cy.get('.spec-landing-promo-step-item-content').should('not.visible');

      cy.get('.spec-landing-navigation-control').click();
      cy.get('.spec-landing-navigation-sign-in').click();
      cy.get('.spec-app-content').should('contain', 'Create your MNFST account');
      cy.get('.spec-app-header-logo').click();

      cy.get('.spec-landing-navigation-control').click();
      cy.get('.spec-landing-navigation-careers').click();
      cy.get('body').should('contain', 'Careers');
      cy.go('back');
      cy.get('.spec-app-landing-header').should('contain', 'for Business');
    });
  });
});
