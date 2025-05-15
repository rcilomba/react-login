describe("Registrera användare", () => {
  it("ska registrera en ny användare", () => {
    cy.visit("http://localhost:5173");

    // Fyll i formuläret
    cy.get('input[name="username"]').type("testuser123");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("Test1234");

    // Klicka på registrera
    cy.get('button[type="submit"]').contains("Registrera").click();

    // Bekräfta att registreringen lyckades
    cy.contains("Welcome!").should("exist");
  });
});
