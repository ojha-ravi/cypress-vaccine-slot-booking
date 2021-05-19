const phoneNumber = Cypress.env("phone_number");
const state = Cypress.env("state");
const district = Cypress.env("district");

describe("My First Test", () => {
  it("Open Cowin App!", () => {
    cy.viewport(1536, 960);
    cy.visit("https://selfregistration.cowin.gov.in/");
    cy.get("input#mat-input-0").type(phoneNumber);
    cy.get(".next-btn").click();
    cy.get("input#mat-input-1").click();
    cy.pause();
  });

  it("Search by District", () => {
    // cy.visit("https://selfregistration.cowin.gov.in/appointment");
    cy.get(".custom-checkbox").click("right");
  });

  it("Select State & District", () => {
    cy.get('[formcontrolname="state_id"]').click();
    cy.wait(100);
    cy.get('[role="listbox"]').contains(state).click();
    cy.wait(200);
    cy.get('[formcontrolname="district_id"]').click();
    cy.wait(100);
    cy.get('[role="listbox"]').contains(district).click();
    cy.wait(200);
  });

  it(".select() - select an option in a <select> element", { retries: 2 }, () => {
    cy.viewport(1536, 960);
    cy.get(".district-search").click();
    cy.wait(100);
    cy.get(".agefilterblock .form-check").first().click();
    cy.get(".slots-box")
      .not(".no-seat")
      .not(".no-available")
      .then(($ele) => {
        const availableSlots = parseFloat($ele.text());
        expect(availableSlots).to.be.gte(0);
        if (availableSlots > 1) {
          console.log("SLOTS AVAILABLE");
          $ele.click();
        }
      });
  });

  after(() => {
    cy.get(".slots-box")
      .its("length")
      .then((res) => {
        if (res > 0) {
          window.location.reload();
        } else {
          console.log("SLOTS AVAILABLE, SHOULD NOT RELOAD!!. Please Book Now!!");
        }
      });
  });
});
