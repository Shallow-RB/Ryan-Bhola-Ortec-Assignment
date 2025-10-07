/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to add a person with name and phone
       * @example cy.addPerson('John Doe', '0612345678')
       */
      addPerson(name: string, phone: string): Chainable<void>;

      /**
       * Custom command to clear all people from localStorage
       * @example cy.clearAllPeople()
       */
      clearAllPeople(): Chainable<void>;

      /**
       * Custom command to wait for toast notification
       * @example cy.waitForToast('success')
       */
      waitForToast(type: "success" | "error"): Chainable<void>;

      /**
       * Custom command to trigger form validation by typing and blurring
       * @example cy.triggerValidation('first-name-input', 'A')
       */
      triggerValidation(field: string, value: string): Chainable<void>;

      /**
       * Custom command to wait for validation message to appear
       * @example cy.waitForValidationMessage('First name must be at least 2 characters')
       */
      waitForValidationMessage(message: string): Chainable<void>;
    }
  }
}

// Custom command to select by data-cy attribute
Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

// Custom command to add a person
Cypress.Commands.add("addPerson", (name: string, phone: string) => {
  cy.get('[data-cy="first-name-input"]').clear().type(name).blur();
  cy.get('[data-cy="phone-number-input"]').clear().type(phone).blur();
  cy.get('[data-cy="submit-button"]').click();
});

// Custom command to clear all people
Cypress.Commands.add("clearAllPeople", () => {
  cy.window().then((win) => {
    win.localStorage.removeItem("people");
  });
});

// Custom command to wait for toast notification
Cypress.Commands.add("waitForToast", (type: "success" | "error") => {
  const selector =
    type === "success"
      ? '[data-sonner-toast][data-type="success"]'
      : '[data-sonner-toast][data-type="error"]';
  cy.get(selector, { timeout: 10000 }).should("be.visible");
});

// Custom command to trigger form validation
Cypress.Commands.add("triggerValidation", (field: string, value: string) => {
  // Ensure the field is ready
  cy.get(`[data-cy="${field}"]`).should("be.visible");
  cy.get(`[data-cy="${field}"]`).clear().type(value);
  // Trigger blur to activate validation
  cy.get(`[data-cy="${field}"]`).blur();
  // Wait for validation to process and form state to update
  cy.wait(300);
  // Force a re-render by triggering a focus event and blur again
  cy.get(`[data-cy="${field}"]`).focus().blur();
});

// Custom command to wait for validation message
Cypress.Commands.add("waitForValidationMessage", (message: string) => {
  cy.contains(message, { timeout: 5000 }).should("be.visible");
});
