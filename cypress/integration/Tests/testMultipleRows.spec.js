/// <reference types="Cypress" />

describe("Upload Multiple Rows", function () {
  it("Test Multiple Rows", function () {
    cy.server();
    cy.route({
      method: "POST",
      url: "/users/upload",
    }).as("apiCheck");
    cy.visit("http://localhost:4200/");
    cy.get("a").contains("Upload").click();
    const fixturePath = "test_col_multiple.csv";
    cy.get('[data-cy="submit"]').attachFile(fixturePath);
    cy.get("button").contains("Submit").click();
    cy.wait("@apiCheck",{responseTimeout: 10000});
    cy.get(".uploadMsgs")
      .contains("Please make sure there are only 4 columns per row", {
        timeout: 70000,
      })
      .should("be.visible");
    cy.get("button").contains("Close").click();
  });
});
