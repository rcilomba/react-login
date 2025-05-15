describe("Registrera användare", () => {
  it("ska registrera en ny användare", () => {
    cy.visit("http://localhost:5173");

    cy.get("#register-username").type("testuser123");
    cy.get("#register-email").type("test@example.com");
    cy.get("#register-password").type("Test1234");

    cy.get("#register-btn").click();

    cy.contains("Welcome!").should("exist");
  });
});
