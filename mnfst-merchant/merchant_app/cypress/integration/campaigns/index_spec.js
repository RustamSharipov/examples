// ToDO: Add tests
// - campaign status

import { CAMPAIGNS_URI_CAMPAIGNS, CAMPAIGNS_URI_BRAND_UPDATE } from '../../constants';

const brandLogo1ImageSrc = 'http://res.cloudinary.com/mnfst/image/upload/v1528276608/wp82g2ea7tzjhfemyosd.png';
const brandLogo2ImageSrc = 'https://s3.eu-central-1.amazonaws.com/mnfst-video-creatives-staging/brands/14/image.png';

describe('Campaigns list', function() {
  beforeEach(() => {
    cy.fixture('data/campaignsList/page1.json').as('data.campaignsList/page1');
    cy.fixture('data/campaignsList/page6.json').as('data.campaignsList/page6');
    cy.fixture('data/campaignsList/page9.json').as('data.campaignsList/page9');
    cy.fixture('data/campaignsList/page10.json').as('data.campaignsList/page10');

    cy.server();
    cy.route({
      method: 'GET',
      response: '@data.campaignsList/page1',
      status: 200,
      url: CAMPAIGNS_URI_CAMPAIGNS,
    });
    cy.route({
      method: 'GET',
      response: '@data.campaignsList/page6',
      status: 200,
      url: `${CAMPAIGNS_URI_CAMPAIGNS}?page[number]=6`,
    });
    cy.route({
      method: 'GET',
      response: '@data.campaignsList/page9',
      status: 200,
      url: `${CAMPAIGNS_URI_CAMPAIGNS}?page[number]=9`,
    });
    cy.route({
      method: 'GET',
      response: '@data.campaignsList/page10',
      status: 200,
      url: `${CAMPAIGNS_URI_CAMPAIGNS}?page[number]=10`,
    });
    cy.route({
      method: 'PUT',
      response: {
        id: 2,
        color: '#ff0000',
        image: brandLogo2ImageSrc,
        name: 'Ruby User Group',
      },
      status: 200,
      url: CAMPAIGNS_URI_BRAND_UPDATE.replace('BRAND_ID', 2),
    });

    cy.visit('/campaigns');
    cy.signIn();

    cy.get('.spec-app-header-navigation-campaigns').click();
    cy.get('.spec-app-content').contains('Campaigns');
  });

  it('Navigation', function() {
    cy.get('.spec-campaigns-list-item-brand-1').should('contain', 'Adidas');
    cy.get('.spec-campaigns-list-item-campaign-137').should('contain', 'Yourself Manifest');
    cy.get('.spec-campaigns-list-item-campaign-137').should('contain', '7 Jun 2018');
    cy.get('.spec-campaigns-list-item-campaign-137').should('contain', '8 Sep 2019');
    cy.get('.spec-campaigns-list-item-campaign-137').should('contain', '$ 0');
    cy.get('.spec-campaigns-list-item-campaign-137').should('contain', 'Submitted');
    cy.get('.spec-campaigns-list-item-campaign-137').should('contain', 'Copy');

    cy.get('.spec-campaigns-list-item-brand-17').should('contain', 'MNFST');
    cy.get('.spec-campaigns-list-item-campaign-153').should('contain', 'Oi wei!');
    cy.get('.spec-campaigns-list-item-campaign-153').should('contain', '14 Nov 2018');
    cy.get('.spec-campaigns-list-item-campaign-153').should('contain', '29 Nov 2018');
    cy.get('.spec-campaigns-list-item-campaign-153').should('contain', '$ 125');
    cy.get('.spec-campaigns-list-item-campaign-153').should('contain', 'Created');
    cy.get('.spec-campaigns-list-item-campaign-153').should('contain', 'Edit');
    cy.get('.spec-campaign-153-platform').should('have.length', 1);
    cy.get('.spec-campaign-153-platform.spec-campaign-platform-facebook').should('not.visible');
    cy.get('.spec-campaign-153-platform.spec-campaign-platform-twitter').should('be.visible');
    cy.get('.spec-campaign-153-platform.spec-campaign-platform-instagram').should('not.visible');
    cy.get('.spec-campaigns-navigation').should('be.visible');
    cy.get('.spec-campaigns-navigation-item').should('have.length', 10);
    cy.get('.spec-campaigns-navigation-prev').should('not.visible');
    cy.get('.spec-campaigns-navigation-next').should('be.visible');

    cy.get('.spec-campaigns-navigation-item').eq(5).click();
    cy.get('.spec-campaigns-list-item-brand-12').should('contain', 'Birthday');
    cy.get('.spec-campaigns-list-item-campaign-40').should('contain', 'B-Day Girl!');
    cy.get('.spec-campaigns-list-item-campaign-40').should('contain', '5 Jul 2018');
    cy.get('.spec-campaigns-list-item-campaign-40').should('contain', '8 Sep 2019');
    cy.get('.spec-campaigns-list-item-campaign-40').should('contain', '$ 0');
    cy.get('.spec-campaigns-list-item-campaign-40').should('contain', '10');
    cy.get('.spec-campaigns-list-item-campaign-40').should('contain', 'Finished');
    cy.get('.spec-campaigns-list-item-campaign-40').should('contain', 'Copy');
    cy.get('.spec-campaigns-navigation-prev').should('be.visible');
    cy.get('.spec-campaigns-navigation-next').should('be.visible');

    cy.get('.spec-campaigns-navigation-item').eq(9).click();
    cy.get('.spec-campaigns-list-item-brand-2').should('contain', '123123');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', '1113123');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', '8 Jun 2018');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', '22 Jun 2018');
    cy.get('.spec-campaign-1-platform.spec-campaign-platform-facebook').should('not.visible');
    cy.get('.spec-campaign-1-platform.spec-campaign-platform-twitter').should('be.visible');
    cy.get('.spec-campaign-1-platform.spec-campaign-platform-instagram').should('be.visible');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', '$ 11.11');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', '0');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', 'Deleted');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', 'Copy');
    cy.get('.spec-campaigns-navigation-prev').should('be.visible');
    cy.get('.spec-campaigns-navigation-next').should('not.visible');

    cy.get('.spec-campaigns-navigation-prev').click();
    cy.get('.spec-campaigns-list-item-brand-6').should('contain', 'Senegal');
    cy.get('.spec-campaigns-list-item-campaign-14').should('contain', '2 no shade');
    cy.get('.spec-campaigns-list-item-campaign-14').should('contain', '12 Jun 2018');
    cy.get('.spec-campaigns-list-item-campaign-14').should('contain', '30 Jun 2018');
    cy.get('.spec-campaign-14-platform.spec-campaign-platform-facebook').should('not.visible');
    cy.get('.spec-campaign-14-platform.spec-campaign-platform-twitter').should('be.visible');
    cy.get('.spec-campaign-14-platform.spec-campaign-platform-instagram').should('be.visible');
    cy.get('.spec-campaigns-list-item-campaign-14').should('contain', '$ 0');
    cy.get('.spec-campaigns-list-item-campaign-14').should('contain', '0');
    cy.get('.spec-campaigns-list-item-campaign-14').should('contain', 'Deleted');
    cy.get('.spec-campaigns-list-item-campaign-14').should('contain', 'Copy');
    cy.get('.spec-campaigns-navigation-prev').should('be.visible');
    cy.get('.spec-campaigns-navigation-next').should('be.visible');

    cy.get('.spec-campaigns-navigation-next').click();
    cy.get('.spec-campaigns-list-item-brand-2').should('contain', '123123');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', '1113123');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', '8 Jun 2018');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', '22 Jun 2018');
    cy.get('.spec-campaign-1-platform.spec-campaign-platform-facebook').should('not.visible');
    cy.get('.spec-campaign-1-platform.spec-campaign-platform-twitter').should('be.visible');
    cy.get('.spec-campaign-1-platform.spec-campaign-platform-instagram').should('be.visible');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', '$ 11.11');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', '0');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', 'Deleted');
    cy.get('.spec-campaigns-list-item-campaign-1').should('contain', 'Copy');
    cy.get('.spec-campaigns-navigation-prev').should('be.visible');
    cy.get('.spec-campaigns-navigation-next').should('not.visible');
  });

  it('Edit brand', function() {
    cy.get('.spec-campaigns-list-item-brand-2-edit-button').should('contain', 'Edit brand');
    cy.get('.spec-campaigns-list-item-brand-2-edit-button').click();
    cy.get('.spec-brand-update-dialog').should('be.visible');
    cy.get('.spec-brand-update-dialog-header').should('contain', '123123');
    cy.get('.spec-brand-update-dialog-header-logo').should('have.attr', 'src', brandLogo1ImageSrc);
    cy.get('.spec-brand-update-dialog [name="brand.name"]').should('have.value', '123123');
    cy.get('.spec-brand-update-dialog [name="brand.color"]').should('have.value', '#ffffff');
    cy.get('.spec-brand-update-form-logo').should('have.attr', 'style', 'background-color: rgb(255, 255, 255);');
    cy.get('.spec-brand-update-form-logo-image').should('have.attr', 'src', brandLogo1ImageSrc);
    cy.get('.spec-brand-update-dialog-header-close').click();
    cy.get('.spec-brand-update-dialog').should('not.visible');

    cy.get('.spec-campaigns-list-item-brand-2-edit-button').click();
    cy.get('.spec-brand-update-dialog').should('be.visible');
    cy.get('.spec-brand-update-dialog [name="brand.name"]').clear();
    cy.get('.spec-brand-update-dialog [name="brand.color"]').clear();
    cy.get('.spec-brand-update-form-submit-button').click();
    cy.get('.spec-brand-update-dialog').should('contain', 'You need to specify name');
    cy.get('.spec-brand-update-dialog').should('contain', 'You need to pick color');

    cy.uploadFile('input[name="brand.image"]', 'files/logo01.png', 'image/png');
    cy.get('.spec-brand-update-dialog [name="brand.name"]').type('Ruby User Group');
    cy.get('.spec-brand-update-dialog-header').should('contain', 'Ruby User Group');
    cy.get('.spec-brand-update-dialog [name="brand.color"]').type('#ff0000');
    cy.get('.spec-brand-update-form-logo').should('have.attr', 'style', 'background-color: rgb(255, 0, 0);');

    // Check uploaded image base64 string is attached to following nodes
    cy.fixture('files/logo01.png', 'base64').then((base64String) => {
      cy.get('.spec-brand-update-form-logo-image')
        .should('have.attr', 'src')
        .and('include', base64String);
      cy.get('.spec-brand-update-dialog-header-logo')
        .should('have.attr', 'src')
        .and('include', base64String);
    });

    cy.get('.spec-brand-update-form-submit-button').click();
    cy.get('.spec-brand-update-dialog').should('not.visible');
    cy.get('.spec-campaigns-list-item-brand-2').should('contain', 'Ruby User Group');
    cy.get('.spec-campaigns-list-item-brand-2-logo-image').should('have.attr', 'src', brandLogo2ImageSrc);
  });
});
