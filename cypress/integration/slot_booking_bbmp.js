const phoneNumber = Cypress.env("phone_number");
const state = Cypress.env("state");
const district = Cypress.env("district");

describe("My First Test", () => {
  it("Open Cowin App!", () => {
    cy.viewport(1000, 1000);
    cy.visit("https://selfregistration.cowin.gov.in/");
    cy.get("input#mat-input-0").type(phoneNumber);
    cy.get(".next-btn").click();
    cy.get("input#mat-input-1").click();
    cy.pause();
  });
  /*
   * 1. User needs to click on Verify button
   * 2. User needs to select beneficiaries by clicking on schedule
   * 3. Click Cypress Resume
   * 4. Below method will rerun until it will find a slot
   * 5. Need to add some delay
   */

  it("Search by District", () => {
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

  it(
    ".select() - select an option in a <select> element",
    {
      retries: 120, //add this to config file as well
    },
    () => {
      cy.viewport(1000, 1000);
      cy.get(".district-search").click();
      cy.wait(100);
      cy.get(".agefilterblock .form-check").first().click();
      cy.wait(100);
      cy.get(".slots-box").not(".no-seat").not(".no-available").first().click();
      // .should(($div) => {
      //   const n = parseFloat($div.text());
      //   expect(n).to.be.gte(0);
      //   if (n >= 1) {
      //     console.log("SLOTS AVAILABLE");
      //     $div.click();
      //     // alert("Vaccine Slot Available");
      //   }
      // });
    },
  );

  it("Reload Test Suite", () => {
    cy.get(".slots-box")
      .not(".no-seat")
      .not(".no-available")
      .should(($div) => {
        const n = parseFloat($div.text());
        if (!(n >= 1)) {
          window.location.reload();
        } else {
          console.log("SLOTS AVAILABLE, SHOULD NOT RELOAD!!");
        }
      });
  });
});
