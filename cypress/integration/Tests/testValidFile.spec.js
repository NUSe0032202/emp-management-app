/// <reference types="Cypress" />

describe("Upload", function () {
  it("Test Valid Upload", function () {
    //Upload correct test data
    cy.server();
    cy.route({
      method: "POST",
      url: "/users/upload",
    }).as("apiCheck");
    cy.visit("http://localhost:4200/");
    cy.get("a").contains("Upload").click();
    const fixturePath = "test_correct.csv";
    cy.get('[data-cy="submit"]').attachFile(fixturePath);
    cy.get("button").contains("Submit").click();
    cy.wait("@apiCheck",{responseTimeout: 10000});
    cy.get(".uploadMsgs")
      .contains("Successful File Upload !", { timeout: 90000 })
      .should("be.visible");
    cy.get("button").contains("Close").click();
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0001")
      .and("contain", "hpotter")
      .and("contain", "Harry Potter")
      .and("contain", "1234");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0002")
      .and("contain", "rwesley")
      .and("contain", "Ron Weasley")
      .and("contain", "19234.5");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0003")
      .and("contain", "ssnape")
      .and("contain", "Severus Snape")
      .and("contain", "4000");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0004")
      .and("contain", "rhagrid")
      .and("contain", "Rubeus Hagrid")
      .and("contain", "3999.9990234375");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0005")
      .and("contain", "voldemort")
      .and("contain", "Lord Voldemort")
      .and("contain", "523.4000244140625");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0006")
      .and("contain", "gwesley")
      .and("contain", "Ginny Weasley")
      .and("contain", "4000.00390625");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0007")
      .and("contain", "hgranger")
      .and("contain", "Hermione Granger")
      .and("contain", "0");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0008")
      .and("contain", "adumbledore")
      .and("contain", "Albus Dumbledore")
      .and("contain", "34.22999954223633");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0009")
      .and("contain", "dmalfoy")
      .and("contain", "Draco Malfoy")
      .and("contain", "34234.5");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0010")
      .and("contain", "basilisk")
      .and("contain", "Basilisk")
      .and("contain", "23.43000030517578");
  });
  it("Test Overlapping Records", function () {
    cy.server();
    cy.route({
      method: "POST",
      url: "/users/upload",
    }).as("apiCheck");
    cy.get("a").contains("Upload").click();
    const fixturePath = "test_overlap.csv";
    cy.get('[data-cy="submit"]').attachFile(fixturePath);
    cy.get("button").contains("Submit").click();
    cy.wait("@apiCheck",{responseTimeout: 10000});
    cy.get(".uploadMsgs")
      .contains("Duplicate ID/Login detected", { timeout: 90000 })
      .should("be.visible");
    cy.get("button").contains("Close").click();
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0001")
      .and("contain", "hpotter1")
      .and("contain", "Harry Potter1")
      .and("contain", "1234");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0002")
      .and("contain", "rwesley2")
      .and("contain", "Ron Weasley2")
      .and("contain", "19234.5");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0003")
      .and("contain", "ssnape3")
      .and("contain", "Severus Snape3")
      .and("contain", "4000");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0004")
      .and("contain", "rhagrid4")
      .and("contain", "Rubeus Hagrid4")
      .and("contain", "3999.9990234375");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0005")
      .and("contain", "voldemort5")
      .and("contain", "Lord Voldemort5")
      .and("contain", "523.4000244140625");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0006")
      .and("contain", "gwesley6")
      .and("contain", "Ginny Weasley6")
      .and("contain", "4000.00390625");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0007")
      .and("contain", "hgranger7")
      .and("contain", "Hermione Granger7")
      .and("contain", "0");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0008")
      .and("contain", "adumbledore8")
      .and("contain", "Albus Dumbledore8")
      .and("contain", "34.22999954223633");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0009")
      .and("contain", "dmalfoy9")
      .and("contain", "Draco Malfoy")
      .and("contain", "34234.5");
    cy.get("app-employee-list")
      .children()
      .should("contain", "e0010")
      .and("contain", "basilisk10")
      .and("contain", "Basilisk10")
      .and("contain", "23.43000030517578");
  });
});
