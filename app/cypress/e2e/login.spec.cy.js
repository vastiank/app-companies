/* eslint-disable no-undef */
describe("Should open application in browser and Login successfull", () => {
  it("should open app in localhost:3000", () => {
    cy.visit("http://localhost:3000");

    cy.get("input").first().type("admin@company.com");
    cy.get("input").last().type("12345678");
    cy.contains("INICIAR").click();
  });
});
