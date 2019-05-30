describe('Profile', function() {
  beforeEach(() => {
    cy.visit('/profile');
    cy.signIn();
  });

  it('Get all fields and update', function() {
    cy.updateProfile();

    cy.get('.spec-app-content').contains('Account');

    cy.get('.spec-app-content').contains('Main information');
    cy.get('.spec-app-content').contains('Full name');
    cy.get('[name="merchant_user.name"]').should('have.value', 'Robert Axelrod');
    cy.get('.spec-app-content').contains('Company name');
    cy.get('[name="merchant.name"]').should('have.value', 'Axe Capital');
    cy.get('.spec-app-content').contains('Country');
    cy.get('.spec-app-content').contains('United States');
    cy.get('.spec-app-content').contains('E-mail');
    cy.get('[name="merchant_user.email"]').should('have.value', 'boss@axe.com');
    // cy.get('[name="merchant_user.campaign_notifications"]').should('have.value', 'on');

    cy.get('.spec-app-content').contains('Change password');
    cy.get('.spec-app-content').contains('Password');
    cy.get('[name="merchant_user.password"]').should('have.value', '');
    cy.get('.spec-app-content').contains('Confirm password');
    cy.get('[name="merchant_user.password_confirmation"]').should('have.value', '');

    cy.get('.spec-app-content').contains('Company Info');
    cy.get('.spec-app-content').contains('Company Number');
    cy.get('[name="merchant.company_number"]').should('be.exist');
    cy.get('[name="merchant.company_number"]').should('have.value', '34342343423');
    cy.get('.spec-app-content').contains('VAT Number');
    cy.get('[name="merchant.vat"]').should('have.value', '242343432324');

    cy.get('.spec-app-content').contains('Address');
    cy.get('.spec-app-content').contains('Address line 1');
    cy.get('[name="merchant.address_line_1"]').should('have.value', '45 East 45th Street & Madison Avenue');
    cy.get('.spec-app-content').contains('Address line 2');
    cy.get('[name="merchant.address_line_2"]').should('have.value', 'New York 10017');
    cy.get('.spec-app-content').contains('City');
    cy.get('[name="merchant.city"]').should('have.value', 'New York');
    cy.get('.spec-app-content').contains('State');
    cy.get('[name="merchant.state"]').should('have.value', 'New York');
    cy.get('.spec-app-content').contains('Post code');
    cy.get('[name="merchant.zip_code"]').should('have.value', '10017');

    cy.get('.spec-app-content').contains('Contacts');
    cy.get('.spec-app-content').contains('Contact name');
    cy.get('[name="merchant.contact_name"]').should('have.value', 'Axe');
    cy.get('.spec-app-content').contains('Telephone number');
    cy.get('[name="merchant.phone_number"]').should('have.value', '+443432221234');

    cy.get('.spec-profile-form-submit-button').click();
    cy.get('.spec-app-content').contains('Saved!');
  });

  it('Change fields', function() {
    cy.fixture('data/userWithNewUserAndCompanyName.json').as('data.userWithNewUserAndCompanyName');
    cy.updateProfile({
      data: '@data.userWithNewUserAndCompanyName',
    });

    cy.get('[name="merchant_user.name"]').should('have.value', 'Robert Axelrod');
    cy.get('.spec-app-header-username').contains('Robert Axelrod');
    cy.get('[name="merchant.name"]').should('have.value', 'Axe Capital');
    cy.get('.spec-app-header-company').contains('Axe Capital');
    cy.get('[name="merchant_user.name"]').clear().type('Chuck Rhodes');
    cy.get('[name="merchant.name"]').clear().type('Department of Justice');
    cy.get('.spec-profile-form-submit-button').click();
    cy.get('.spec-app-content').contains('Saved!');
    cy.get('.spec-app-header-username').contains('Chuck Rhodes');
    cy.get('.spec-app-header-company').contains('Department of Justice');

    cy.get('[name="merchant_user.name"]').clear();
    cy.get('[name="merchant.name"]').clear();
    cy.get('.spec-profile-form-submit-button').click();
    cy.get('.spec-app-content').contains('You need to fill Full name');
    cy.get('.spec-app-content').contains('You need to fill the Company name');
  });

  it('Change password', function() {
    cy.updateProfile();
    
    cy.get('.spec-profile-form-submit-button').click();
    cy.get('.spec-app-content').contains('Saved!');
    
    cy.get('[name="merchant_user.password"]').type('1234');
    cy.get('.spec-profile-form-submit-button').click();
    cy.get('.spec-app-content').contains('Passwords doesn\'t match');
    
    cy.fixture('errors/passwordIsTooSmall.json').as('errors.passwordIsTooSmall');
    cy.updateProfile({
      data: '@errors.passwordIsTooSmall',
      status: 400,
    });
    cy.get('[name="merchant_user.password_confirmation"]').type('1234');
    cy.get('.spec-profile-form-submit-button').click();
    cy.get('.spec-app-content').contains('too small');

    cy.updateProfile();
    cy.get('[name="merchant_user.password"]').type('5678');
    cy.get('[name="merchant_user.password_confirmation"]').type('5678');
    cy.get('.spec-profile-form-submit-button').click();
    cy.get('.spec-app-content').contains('Saved!');
  });
});
