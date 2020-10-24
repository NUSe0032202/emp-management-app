/// <reference types="Cypress" />

describe("Upload Errors", function () {
  it("Test Empty Upload", function () {
    cy.server();
    cy.route({
      method: "POST",
      url: "/users/upload",
    }).as("apiCheck");
    cy.visit("http://localhost:4200/");
    cy.get("a").contains("Upload").click();
    const fixturePath = "test_empty.csv";
    cy.get('[data-cy="submit"]').attachFile(fixturePath, { allowEmpty: true });
    cy.get("button").contains("Submit").click();
    cy.wait("@apiCheck",{responseTimeout: 10000});
    cy.get(".uploadMsgs")
      .contains("File is empty", { timeout: 70000 })
      .should("be.visible");
    cy.get("button").contains("Close").click();
  });
});
