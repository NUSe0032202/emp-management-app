/// <reference types="Cypress" />

describe("Upload Negative Salary", function () {
  it("Test Negative Salary", function () {
    cy.server();
    cy.route({
      method: "POST",
      url: "/users/upload",
    }).as("apiCheck");
    cy.visit("http://localhost:4200/");
    cy.get("a").contains("Upload").click();
    const fixturePath = "test_sal_neg.csv";
    cy.get('[data-cy="submit"]').attachFile(fixturePath);
    cy.get("button").contains("Submit").click();
    cy.wait("@apiCheck",{responseTimeout: 10000});
    cy.get(".uploadMsgs")
      .contains("An entered salary has been detected to be negative", {
        timeout: 70000,
      })
      .should("be.visible");
    cy.get("button").contains("Close").click();
  });
});
