/* eslint-disable no-undef */
describe("Should open application in browser and Login successfull", () => {
  it("should open app in localhost:3000", () => {
    cy.visit("http://localhost:3000");

    cy.get("input").first().type("admin@company.com");
    cy.get("input").last().type("12345678");
    cy.contains("INICIAR").click();

    cy.contains("CREAR EMPRESA").click();

    cy.get("#nit").type("999");
    cy.get("#name").type("Company Test Cypress");
    cy.get("#address").type("Address Test Cypress");
    cy.get("#phone").type("+1 7777");

    cy.contains("CREAR").click();
  });
});
