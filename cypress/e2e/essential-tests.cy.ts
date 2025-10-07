describe("Essential User Management Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearAllPeople();
  });

  describe("Happy Flow", () => {
    it("should add a contact successfully", () => {
      // Mock the joke API
      cy.intercept("GET", "https://api.chucknorris.io/jokes/random", {
        statusCode: 200,
        body: { value: "Chuck Norris can divide by zero." },
      }).as("fetchJoke");

      // Fill out the form
      cy.get('[data-cy="first-name-input"]').type("John Doe").blur();
      cy.get('[data-cy="phone-number-input"]').type("0612345678").blur();

      // Submit should be enabled
      cy.get('[data-cy="submit-button"]').should("not.be.disabled");

      // Submit the form
      cy.get('[data-cy="submit-button"]').click();
      cy.wait("@fetchJoke");

      // Verify success
      cy.waitForToast("success");
      cy.contains("John Doe added").should("be.visible");

      // Verify contact appears in list
      cy.contains("John Doe").should("be.visible");
      cy.contains("0612345678").should("be.visible");
      cy.contains("Chuck Norris can divide by zero.").should("be.visible");

      // Form should be reset
      cy.get('[data-cy="first-name-input"]').should("have.value", "");
      cy.get('[data-cy="phone-number-input"]').should("have.value", "");
    });

    it("should delete a contact successfully", () => {
      // Add a contact first
      cy.addPerson("Jane Smith", "0612345679");

      // Verify contact exists
      cy.contains("Jane Smith").should("be.visible");

      // Delete the contact
      cy.get('[data-cy="delete-button-jane-smith"]').click();
      cy.get('[data-cy="confirm-delete-button"]').click();

      // Verify success
      cy.waitForToast("success");
      cy.contains("Jane Smith removed").should("be.visible");

      // Verify contact is removed
      cy.contains("Jane Smith").should("not.exist");
    });

    it("should search and filter contacts", () => {
      // Add multiple contacts
      cy.addPerson("John Doe", "0612345678");
      cy.addPerson("Jane Smith", "0612345679");

      // Search by name
      cy.get('[data-cy="search-input"]').type("John");
      cy.contains("John Doe").should("be.visible");
      cy.contains("Jane Smith").should("not.exist");

      // Clear search
      cy.get('[data-cy="search-input"]').clear();
      cy.contains("John Doe").should("be.visible");
      cy.contains("Jane Smith").should("be.visible");
    });
  });

  describe("Unhappy Flow", () => {
    it("should show validation errors for invalid form data", () => {
      // Test name validation
      cy.triggerValidation("first-name-input", "A");
      cy.get('[data-cy="phone-number-input"]').type("0612345678").blur();

      cy.waitForValidationMessage("First name must be at least 2 characters");
      cy.get('[data-cy="submit-button"]').should("be.disabled");

      // Test phone validation
      cy.triggerValidation("first-name-input", "John Doe");
      cy.triggerValidation("phone-number-input", "123");

      cy.waitForValidationMessage("Enter a valid phone number");
      cy.get('[data-cy="submit-button"]').should("be.disabled");
    });

    it("should handle API errors gracefully", () => {
      // Mock API failure
      cy.intercept("GET", "https://api.chucknorris.io/jokes/random", {
        statusCode: 500,
        body: { error: "Server error" },
      }).as("fetchJokeError");

      // Fill valid form
      cy.get('[data-cy="first-name-input"]').type("John Doe").blur();
      cy.get('[data-cy="phone-number-input"]').type("0612345678").blur();

      // Submit form
      cy.get('[data-cy="submit-button"]').click();
      cy.wait("@fetchJokeError");

      // Verify error handling
      cy.waitForToast("error");
      cy.contains("Failed to fetch joke").should("be.visible");

      // Contact should not be added
      cy.contains("John Doe").should("not.exist");
    });

    it("should show empty state when no contacts exist", () => {
      cy.contains("No people found").should("be.visible");
      cy.contains("Try adjusting your search or add someone new").should(
        "be.visible"
      );
    });

    it("should show no results for invalid search", () => {
      // Add a contact first
      cy.addPerson("John Doe", "0612345678");

      // Search for non-existent contact
      cy.get('[data-cy="search-input"]').type("NonExistent");

      cy.contains("John Doe").should("not.exist");
      cy.contains("No people found").should("be.visible");
    });
  });
});
