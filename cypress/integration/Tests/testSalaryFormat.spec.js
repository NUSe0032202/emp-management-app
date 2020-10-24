/// <reference types="Cypress" />

describe("Upload Wrong Salary Format", function () {
  it("Test Salary Format", function () {
    cy.server();
    cy.route({
      method: "POST",
      url: "/users/upload",
    }).as("apiCheck");
    cy.visit("http://localhost:4200/");
    cy.get("a").contains("Upload").click();
    const fixturePath = "test_sal_not_float.csv";
    cy.get('[data-cy="submit"]').attachFile(fixturePath);
    cy.get("button").contains("Submit").click();
    cy.wait("@apiCheck",{responseTimeout: 10000});
    cy.get(".uploadMsgs")
      .contains("Unable to parse salary, make sure it is formatted correctly", {
        timeout: 70000,
      })
      .should("be.visible");
    cy.get("button").contains("Close").click();
  });
});
