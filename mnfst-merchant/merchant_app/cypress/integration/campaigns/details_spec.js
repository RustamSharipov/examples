import {
  CAMPAIGNS_URI_BRANDS, CAMPAIGNS_URI_CAMPAIGNS, CAMPAIGNS_URI_EDIT_CAMPAIGN, CAMPAIGNS_URI_VIEW_CAMPAIGN
} from '../../constants';

describe('Campaign details', function() {
  beforeEach(() => {
    cy.fixture('data/brands.json').as('data.brands');
    cy.fixture('data/campaignsList/page1.json').as('data.campaignsList/page1');
    cy.fixture('data/campaign154.json').as('data.campaign154');

    cy.server();
    cy.route({
      method: 'GET',
      response: '@data.campaignsList/page1',
      status: 200,
      url: CAMPAIGNS_URI_CAMPAIGNS,
    });
    cy.route({
      method: 'GET',
      response: '@data.campaign154',
      status: 200,
      url: CAMPAIGNS_URI_VIEW_CAMPAIGN.replace('CAMPAIGN_ID', '154'),
    });
    cy.route({
      method: 'GET',
      response: '@data.campaign154',
      status: 200,
      url: CAMPAIGNS_URI_EDIT_CAMPAIGN.replace('CAMPAIGN_ID', '154'),
    });
    cy.route({
      method: 'GET',
      response: '@data.brands',
      status: 200,
      url: CAMPAIGNS_URI_BRANDS,
    });

    cy.visit('/campaigns');
    cy.signIn();

    cy.get('.spec-app-header-navigation-campaigns').click();
    cy.get('.spec-app-content').contains('Campaigns');
  });

  it('Statistic', function() {
    cy.get('.spec-campaigns-list-item-campaign-name-154').click();
    cy.get('.spec-campaign-linkto-campaigns').should('contain', 'Back to Campaigns').click();
    cy.get('.spec-app-content').contains('Campaigns');
    cy.get('.spec-campaigns-list-item-campaign-name-154').click();

    cy.get('.spec-app-content').should('contain', 'Aspire');
    cy.get('.spec-app-content').should('contain', 'Make my day');

    // ToDo: Deal with timezone
    // cy.get('.spec-app-content').should('contain', '14 Nov 2018, 5:17 pm – 29 Nov 2018, 12:45 am');
    cy.get('.spec-app-content').should('contain', '14 Nov 2018');
    cy.get('.spec-app-content').should('contain', '29 Nov 2018');
    cy.get('.spec-campaign-platform-facebook').should('not.visible');
    cy.get('.spec-campaign-platform-instagram').should('be.visible');
    cy.get('.spec-app-content').should('contain', 'Created');
    cy.get('.spec-app-content').should('contain', 'Dubai (GMT+04:00)');
    cy.get('.spec-campaign-statistic-budget-spent').should('contain', '$ 0');
    cy.get('.spec-campaign-statistic-campaign-budget').should('contain', '$ 12');
    cy.get('.spec-campaign-statistic-total-supporters').should('contain', '0');

    cy.get('.spec-app-content').should('contain', 'Impressions');
    cy.get('.spec-campaign-impressions-datetime-picker').should('contain', Cypress.moment().format('D MMM YY'));
    cy.get('.spec-app-content').should('contain', 'Engagements');
    cy.get('.spec-campaign-engagements-datetime-picker').should('contain', Cypress.moment().format('D MMM YY'));
    cy.get('.spec-app-content').should('contain', 'Supporters');
    cy.get('.spec-campaign-supporters-datetime-picker').should('contain', Cypress.moment().format('D MMM YY'));

    cy.get('.spec-app-content').should('contain', 'Albania, Barbados, Republic of the Congo, Ecuador, Montserrat');
    cy.get('.spec-app-content').should('contain', 'Any');
    cy.get('.spec-app-content').should('contain', 'On');

    cy.get('input[name="campaign.budget"]').should('have.value', '12');
    cy.get('input[name="facebook"]').should('not.visible');
    cy.get('input[name="instagram"]').should('have.value', '9');
    cy.get('input[name="twitter"]').should('have.attr', 'disabled');
    cy.get('input[name="campaign.paid_participations_count"]').should('have.value', '2');
    cy.get('input[name="campaign.exclude_big_influences"]').should('not.have.attr', 'checked');
    
    cy.get('.spec-campaign-edit').click();
    cy.get('.spec-app-content').should('contain', 'Edit campaign');
    cy.get('[name="campaign.name"]').should('have.value', 'Make my day');
  });
});
