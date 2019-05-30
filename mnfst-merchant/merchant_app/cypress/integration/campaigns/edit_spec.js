// ToDO: Add tests
// - static, video and segmentation creatives guides
// - creatives uploading status
// - create draft, save as draft
// - overlength texts for social networks
// - edit campaign after create

import {
  ASSETS_UPLOAD_URI, CAMPAIGNS_URI_CAMPAIGNS, CAMPAIGNS_URI_BRANDS
} from '../../constants';

const creativeBackImageSrc = 'https://mnfst-video-creatives-staging.s3-eu-central-1.amazonaws.com/uploads/'
  + 'merchant_user_asset/file/766/5_preview.png';
const creativeFrontImageSrc = 'https://mnfst-video-creatives-staging.s3-eu-central-1.amazonaws.com/uploads/'
  + 'merchant_user_asset/file/761/frame-creative.png';

describe('Create and edit campaign', function() {
  beforeEach(() => {
    cy.fixture('data/asset761.json').as('data.asset761');
    cy.fixture('data/asset763.json').as('data.asset763');
    cy.fixture('data/asset766.json').as('data.asset766');
    cy.fixture('data/brands.json').as('data.brands');
    cy.fixture('data/campaignsList/page1.json').as('data.campaignsList/page1');
    cy.fixture('data/newCampaign01.json').as('data.newCampaign01');
    cy.fixture('data/campaignsList/pageWithNewCampaign1.json').as('data.campaignsList/pageWithNewCampaign1');

    cy.server();
    cy.route({
      method: 'GET',
      response: '@data.campaignsList/page1',
      status: 200,
      url: CAMPAIGNS_URI_CAMPAIGNS,
    });
    cy.route({
      method: 'GET',
      response: '@data.brands',
      status: 200,
      url: CAMPAIGNS_URI_BRANDS,
    });
    cy.route({
      method: 'POST',
      response: '@data.newCampaign01',
      status: 201,
      url: CAMPAIGNS_URI_CAMPAIGNS,
    });

    cy.visit('/campaigns');
    cy.signIn();

    cy.get('.spec-app-header-navigation-campaigns').click();
    cy.get('.spec-app-content').contains('Campaigns');
  });

  it('Create additional campaign with new brand', function() {
    cy.get('.spec-campaigns-create-new-button').click();
    cy.get('.spec-campaign-linkto-campaigns').should('contain', 'Back to Campaigns').click();
    cy.get('.spec-app-content').contains('Campaigns');
    cy.get('.spec-campaigns-create-new-button').click();
    cy.get('.spec-app-content').contains('Create new campaign');

    cy.get('.spec-campaign-save-draft-button').should('contain', 'Create')
    cy.get('.spec-campaign-submit-button').should('contain', 'Create & submit')
    cy.get('.spec-campaign-save-draft-button').click();
    cy.get('.spec-validation-status-element')
      .should('have.length', 8)
      .should('contain', 'You need to select your brand or create new')
      .should('contain', 'Field is required')
      .should('contain', 'You need to specify campaign budget amount')
      .should('contain', 'You need to select at least one social network')
      .should('contain', 'You need to select creative');

    cy.get('.spec-campaign-form-brand-dropdown')
      .should('contain', 'Brand')
      .click();
    cy.get('.spec-campaign-form-brand-dropdown-item').eq(0).click();
    cy.get('.spec-validation-status-element').should('have.length', 0);
    cy.get('.spec-campaign-form-brand-logo-stub').should('have.length', 1);
    cy.get('.spec-campaign-form-brand-logo-image').should('have.length', 0);
    cy.get('input[name="brand.name"]')
      .should('have.attr', 'value', '')
      .type('Pepsi');
    cy.uploadFile('input[name="brand.image"]', 'files/logo03.png', 'image/png');
    cy.fixture('files/logo03.png', 'base64').then((base64String) => {
      cy.get('.spec-campaign-form-brand-logo-image')
        .should('have.attr', 'src')
        .and('include', base64String);
    });
    cy.get('.spec-campaign-form-brand-logo-stub').should('have.length', 0);
    cy.get('.spec-campaign-form-brand-logo-image').should('have.length', 1);
    cy.get('input[name="brand.color"]').clear().type('#caffee');
    cy.get('.spec-spec-campaign-form-brand-colorpicker-color').should('have.attr', 'value', '#caffee');
    cy.get('.spec-campaign-form-brand-logo').should('have.css', 'background-color', 'rgb(202, 255, 238)');

    cy.get('input[name="campaign.name"]')
      .should('have.attr', 'value', '')
      .type('Pepsi Generations at the US');
    
    const currentDate = Cypress.moment();
    cy.get('input[name="campaign.start_at"]')
      .should('have.attr', 'value', '')
      .click();
    cy.get('.spec-campaign-form-start_at-section')
      .should('contain', currentDate.format('MMMM'))
      .and('contain', currentDate.format('YYYY'));
    cy.get('.spec-campaign-form-start_at-section .react-datepicker__day').contains('10').click();
    cy.get('.spec-campaign-form-start_at-section .react-datepicker__time-list-item').contains('1:00 am').click();
    cy.get('input[name="campaign.start_at"]')
      .should('have.attr', 'value', `${currentDate.format('MM')}/10/${currentDate.format('YYYY')} 1:00 am`);
    
    const twoMonthLaterDate = Cypress.moment(currentDate).add(2, 'M');
    cy.get('input[name="campaign.end_at"]')
      .should('have.attr', 'value', '')
      .click();
    cy.get('.spec-campaign-form-end_at-section')
      .should('contain', currentDate.format('MMMM'))
      .and('contain', currentDate.format('YYYY'));
    cy.get('.spec-campaign-form-end_at-section .react-datepicker__navigation--next').click().click();
    cy.get('.spec-campaign-form-end_at-section')
      .should('contain', twoMonthLaterDate.format('MMMM'))
      .and('contain', twoMonthLaterDate.format('YYYY'));
    cy.get('.spec-campaign-form-end_at-section .react-datepicker__day').contains('20').click();
    cy.get('.spec-campaign-form-end_at-section .react-datepicker__time-list-item').contains('11:00 pm').click();
    cy.get('input[name="campaign.end_at"]')
      .should('have.attr', 'value',
        `${twoMonthLaterDate.format('MM')}/20/${twoMonthLaterDate.format('YYYY')} 11:00 pm`);

    cy.get('.spec-campaign-form-timezone-dropdown').click();
    cy.get('.spec-campaign-form-timezone-dropdown-item').contains('GMT+01').click();
    cy.get('.spec-campaign-form-timezone-dropdown').should('contain', '(GMT+01:00) Berlin');

    cy.get('.spec-campaign-form-countries-selected-option')
      .should('have.length', 1)
      .and('contain', 'United Kingdom');
    cy.get('.spec-campaign-form-countries-input').type('mon');
    cy.get('.spec-campaign-form-countries-dropdown-items').should('be.visible');
    cy.get('.spec-campaign-form-countries-dropdown-item').contains('Monaco').click();
    cy.get('.spec-campaign-form-countries-dropdown-items').should('not.visible');
    cy.get('.spec-campaign-form-countries-input').should('have.attr', 'value', '');
    cy.get('.spec-campaign-form-countries-selected-option')
      .should('have.length', 2)
      .and('contain', 'United Kingdom')
      .and('contain', 'Monaco');
    cy.get('.spec-campaign-form-countries-dropdown-control').click();
    cy.get('.spec-campaign-form-countries-dropdown-items').should('be.visible');
    cy.get('.spec-campaign-form-countries-dropdown-item').contains('Monaco').should('not.visible');
    cy.get('.spec-campaign-form-countries-dropdown-item').contains('Macedonia').click();
    cy.get('.spec-campaign-form-countries-selected-option')
      .should('have.length', 3)
      .and('contain', 'United Kingdom')
      .and('contain', 'Monaco')
      .and('contain', 'Macedonia');
    cy.get('.spec-campaign-form-countries-selected-option')
      .eq(0)
      .children('.spec-dropdown-suggestions-remove-button')
      .click();
    cy.get('.spec-campaign-form-countries-selected-option')
      .should('have.length', 2)
      .and('contain', 'Monaco')
      .and('contain', 'Macedonia');

    cy.get('.spec-campaign-form-sex-any-button')
      .should('have.attr', 'class')
      .and('contain', 'violetReadonlyTheme')
      .and('not.contain', 'whiteTheme');
    cy.get('.spec-campaign-form-sex-male-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('.spec-campaign-form-sex-female-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('.spec-campaign-form-sex-male-button').click();
    cy.get('.spec-campaign-form-sex-any-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('.spec-campaign-form-sex-male-button')
      .should('have.attr', 'class')
      .and('contain', 'violetReadonlyTheme')
      .and('not.contain', 'whiteTheme');
    cy.get('.spec-campaign-form-sex-female-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    
    cy.get('.spec-campaign-form-min_age-dropdown-control').should('contain', '16');
    cy.get('.spec-campaign-form-min_age-dropdown').click();
    cy.get('.spec-campaign-form-min_age-dropdown-item').contains('20').click();
    cy.get('.spec-campaign-form-min_age-dropdown-control').should('contain', '20');
    cy.get('.spec-campaign-form-max_age-dropdown').click();
    cy.get('.spec-campaign-form-max_age-dropdown-item').contains('48').click();
    cy.get('.spec-campaign-form-max_age-dropdown-control').should('contain', '48');
    cy.get('.spec-campaign-form-min_age-dropdown').click();
    cy.get('.spec-campaign-form-min_age-dropdown-item').contains('49').click();
    cy.get('.spec-campaign-form-min_age-dropdown-control').should('contain', '49');
    cy.get('.spec-campaign-form-max_age-dropdown-control').should('contain', '');
    cy.get('.spec-campaign-form-max_age-dropdown').click();
    cy.get('.spec-campaign-form-max_age-dropdown-item').contains('61').click();

    cy.get('input[name="campaign.paid_participations_count"]')
      .should('have.value', '')
      .type('5');
    
    cy.get('input[name="campaign.exclude_big_influences"]').should('not.checked');
    cy.get('.spec-campaign-form-micro_influencer-checkbox').click();
    cy.get('input[name="campaign.exclude_big_influences"]').should('be.checked');

    cy.get('.spec-campaign-form-non_profit-off-button')
      .should('have.attr', 'class')
      .and('contain', 'violetReadonlyTheme')
      .and('not.contain', 'whiteTheme');
    cy.get('.spec-campaign-form-non_profit-on-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('input[name="campaign.budget"]')
      .should('be.visible')
      .and('have.value', '');
    cy.get('.spec-campaign-form-platform-instagram-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('.spec-campaign-form-platform-twitter-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('textarea[name="campaign.social_networks_instagram"]')
      .should('be.disabled')
      .and('have.value', '');
    cy.get('textarea[name="campaign.social_networks_twitter"]')
      .should('be.disabled')
      .and('have.value', '');
    cy.get('.spec-campaign-form-non_profit-on-button')
      .click()
      .should('have.attr', 'class')
      .and('contain', 'violetReadonlyTheme')
      .and('not.contain', 'whiteTheme');
    cy.get('.spec-campaign-form-non_profit-off-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('input[name="campaign.budget"]').should('not.visible');
    cy.get('.spec-campaign-form-platform-instagram-button')
      .click()
      .should('have.attr', 'class')
      .and('contain', 'violetReadonlyTheme')
      .and('not.contain', 'whiteTheme');
    cy.get('.spec-campaign-form-platform-instagram-input').should('not.visible');
    cy.get('textarea[name="campaign.social_networks_instagram"]').should('not.disabled');
    cy.get('.spec-campaign-form-platform-twitter-button')
      .click()
      .should('have.attr', 'class')
      .and('contain', 'violetReadonlyTheme')
      .and('not.contain', 'whiteTheme');
    cy.get('textarea[name="campaign.social_networks_twitter"]')
      .should('not.disabled');
    cy.get('.spec-campaign-form-platform-twitter-input').should('not.visible');
    cy.get('textarea[name="campaign.social_networks_instagram"]').type('Over hill, over dale');
    cy.get('.spec-campaign-form-instagram')
      .should('contain', '2180 characters left')
      .and('contain', 'Maximum 2,200 characters');
    cy.get('textarea[name="campaign.social_networks_twitter"]').type('Thorough bush, thorough brier');
    cy.get('.spec-campaign-form-twitter')
      .should('contain', '231 characters left')
      .and('contain', 'Maximum 260 characters');
    cy.get('.spec-campaign-form-platform-twitter-button')
      .click()
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('textarea[name="campaign.social_networks_twitter"]')
      .should('be.disabled')
      .and('have.value', '');
    cy.get('.spec-campaign-form-platform-twitter-button')
      .click()
      .should('have.attr', 'class')
      .and('contain', 'violetReadonlyTheme')
      .and('not.contain', 'whiteTheme');
    cy.get('textarea[name="campaign.social_networks_twitter"]')
      .should('not.disabled')
      .and('have.value', '');
    // cy.fixture('texts/text01.txt').then((text) => {
    //   cy.get('textarea[name="campaign.social_networks_twitter"]').type(text, { delay: 0 });
    // });
    // ToDo: Add texts length tests

    cy.get('.spec-campaign-form-non_profit-off-button').click();
    cy.get('input[name="campaign.budget"]')
      .should('be.visible')
      .and('have.value', '')
      .type('100a').should('have.value', '100')
      .type('-').should('have.value', '100')
      .type(',').should('have.value', '100')
      .type('.').should('have.value', '100.')
      .type('15').should('have.value', '100.1');
    cy.get('.spec-campaign-form-platform-instagram-input')
      .should('be.visible')
      .and('have.value', '')
      .type('8@').should('have.value', '8')
      .type('-').should('have.value', '8')
      .type(',').should('have.value', '8')
      .type('.').should('have.value', '8.')
      .type('27').should('have.value', '8.2');
    cy.get('.spec-campaign-form-platform-twitter-input')
      .should('be.visible')
      .and('have.value', '')
      .type('3@').should('have.value', '3')
      .type('-').should('have.value', '3')
      .type(',').should('have.value', '3')
      .type('.').should('have.value', '3.')
      .type('9').should('have.value', '3.9');
    cy.get('.spec-campaign-form-platform-twitter-button')
      .click() // to hide
      .click(); // to display again
    cy.get('.spec-campaign-form-platform-twitter-input')
      .should('be.visible')
      .and('have.value', '');
    cy.get('.spec-campaign-save-draft-button').click();
    cy.get('.spec-validation-status-element').should('contain', 'You need to specify Twitter CPM amount');
    cy.get('.spec-campaign-form-platform-twitter-input').type('2.6');
    cy.get('.spec-validation-status-element').should('not.contain', 'You need to specify Twitter CPM amount');

    cy.get('textarea[name="campaign.post_text"]')
      .should('not.disabled')
      .and('have.value', '')
      .type('All work and no play makes Jack a dull boy');
    cy.get('.spec-campaign-form-post_text')
      .should('contain', '458 characters left')
      .and('contain', 'Maximum 500 characters');

    cy.get('.spec-campaign-form-creative-static-button')
      .should('have.attr', 'class')
      .and('contain', 'violetReadonlyTheme')
      .and('not.contain', 'whiteTheme');
    cy.get('.spec-campaign-form-creative-video-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('.spec-campaign-form-creative-segmentation-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('.spec-campaign-form-creative-static')
      .should('contain', 'Static overlay')
      .and('contain', '10 megabytes max');
    cy.get('.spec-campaign-form-creative-static-back').should('not.visible');
    cy.get('.spec-campaign-form-creative-static-face').should('be.visible');
    cy.get('.spec-campaign-form-creative-static-front').should('not.visible');
    
    cy.server();
    cy.route({
      method: 'POST',
      response: '@data.asset761',
      sttus: 200,
      url: ASSETS_UPLOAD_URI,
    });
    cy.uploadFile(
      '.spec-campaign-form-creative-static input[name="campaign.creative_template"]',
      'files/veryBigImage01.png',
      'image/png',
    );
    cy.get('.spec-validation-status-element').should('contain', 'Attached file is too large');
    cy.uploadFile(
      '.spec-campaign-form-creative-static input[name="campaign.creative_template"]',
      'files/creativeFront01.png',
      'image/png',
    );
    cy.get('.spec-validation-status-element').should('have.length', 0);
    cy.get('.spec-campaign-form-creative-static-face').should('be.visible');
    cy.get('.spec-campaign-form-creative-static-front')
      .should('have.attr', 'src')
      .and('contain', creativeFrontImageSrc);

    cy.route({
      method: 'POST',
      response: '@data.asset763',
      sttus: 200,
      url: ASSETS_UPLOAD_URI,
    });
    cy.get('.spec-campaign-form-creative-video-button')
      .click()
      .should('have.attr', 'class')
      .and('contain', 'violetReadonlyTheme')
      .and('not.contain', 'whiteTheme');
    cy.get('.spec-campaign-form-creative-static-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('.spec-campaign-form-creative-segmentation-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('.spec-campaign-form-creative-video')
      .should('contain', 'Video overlay')
      .and('contain', '70 megabytes max');
    cy.uploadFile(
      '.spec-campaign-form-creative-video input[name="campaign.creative_template"]',
      'files/videoCreative01.mov',
      'video/x-quicktime',
    );
    cy.get('.spec-campaign-form-creative-video').should('contain', 'Video successfully uploaded');
    cy.get('.spec-campaign-form-creative-static-button')
      .click()
      .should('have.attr', 'class')
      .and('contain', 'violetReadonlyTheme')
      .and('not.contain', 'whiteTheme');
    cy.get('.spec-campaign-form-creative-video-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('.spec-campaign-form-creative-segmentation-button')
      .should('have.attr', 'class')
      .and('contain', 'whiteTheme')
      .and('not.contain', 'violetReadonlyTheme');
    cy.get('.spec-campaign-form-creative-static-front')
      .should('have.attr', 'src')
      .and('contain', creativeFrontImageSrc);
    cy.get('.spec-campaign-form-creative-video-button').click();
    cy.get('.spec-campaign-form-creative-video').should('contain', 'Video successfully uploaded');

    cy.get('.spec-campaign-form-creative-segmentation-button').click();
    cy.get('.spec-campaign-form-creative-segmentation')
      .should('contain', 'Segmentation')
      .and('contain', '10 megabytes max for each image');
    cy.uploadFile(
      '.spec-campaign-form-creative-segmentation-back-button input[name="campaign.creative_template"]',
      'files/veryBigImage01.png',
      'image/png',
    );
    cy.get('.spec-validation-status-element').should('contain', 'Attached file is too large');
    cy.route({
      method: 'POST',
      response: '@data.asset766',
      sttus: 200,
      url: ASSETS_UPLOAD_URI,
    });
    cy.uploadFile(
      '.spec-campaign-form-creative-segmentation-back-button input[name="campaign.creative_template"]',
      'files/creativeBack01.png',
      'image/png',
    );
    cy.get('.spec-validation-status-element').should('have.length', 0);
    cy.get('.spec-campaign-form-creative-segmentation-back')
      .should('have.attr', 'src')
      .and('contain', creativeBackImageSrc);
    cy.uploadFile(
      '.spec-campaign-form-creative-segmentation-front-button input[name="campaign.creative_template"]',
      'files/veryBigImage01.png',
      'image/png',
    );
    cy.get('.spec-validation-status-element').should('contain', 'Attached file is too large');
    cy.route({
      method: 'POST',
      response: '@data.asset761',
      sttus: 200,
      url: ASSETS_UPLOAD_URI,
    });
    cy.uploadFile(
      '.spec-campaign-form-creative-segmentation-front-button input[name="campaign.creative_template"]',
      'files/creativeFront01.png',
      'image/png',
    );
    cy.get('.spec-validation-status-element').should('have.length', 0);
    cy.get('.spec-campaign-form-creative-segmentation-front')
      .should('have.attr', 'src')
      .and('contain', creativeFrontImageSrc);
   
    cy.get('input[name="campaign.face_required"]').should('be.checked');
    cy.get('.spec-campaign-form-face_required').click();
    cy.get('input[name="campaign.face_required"]').should('not.checked');
    cy.get('.spec-campaign-form-face_required').click();
    cy.get('input[name="campaign.face_required"]').should('be.checked');

    cy.route({
      method: 'GET',
      response: '@data.campaignsList/pageWithNewCampaign1',
      status: 200,
      url: CAMPAIGNS_URI_CAMPAIGNS,
    });
    cy.get('.spec-campaign-save-draft-button').click();
    cy.get('.spec-app-content').contains('Campaigns');
    cy.get('.spec-campaigns-list-item-brand-124').should('contain', 'Pepsi');
    cy.get('.spec-campaigns-list-item-campaign-284')
      .should('contain', 'Pepsi Generations')
      .and('contain', '10 Jan 2019')
      .and('contain', '20 Mar 2019')
      .and('contain', '$ 100.1')
      .and('contain', '0')
      .and('contain', 'Created');
    cy.get('.spec-campaign-284-platform').should('have.length', 2);
    cy.get('.spec-campaign-284-platform.spec-campaign-platform-instagram').should('have.length', 1);
    cy.get('.spec-campaign-284-platform.spec-campaign-platform-twitter').should('have.length', 1);
  });
});
