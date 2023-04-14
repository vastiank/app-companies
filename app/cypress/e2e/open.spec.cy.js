/* eslint-disable no-undef */
describe("Should open application in browser", () => {
  it("should open app in localhost:3000", () => {
    cy.visit("http://localhost:3000");
  });
});
