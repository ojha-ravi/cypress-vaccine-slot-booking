describe("My First Test", () => {
  it("Open Cowin App!", () => {
    cy.viewport(1000, 1000);
    cy.visit("https://selfregistration.cowin.gov.in/");
    cy.get("input#mat-input-0").type("<your_mobile_number>");
    cy.get(".next-btn").click();
    cy.get("input#mat-input-1").focus();
    cy.pause();

    cy.get(".next-btn").click();

    cy.intercept("*beneficiaries*").as("beneficiaries");
    cy.wait(["@beneficiaries"]);

    cy.get(".btnlist > .bordernone").first().click();

    // TO Test
    // cy.visit("https://selfregistration.cowin.gov.in/appointment");
    cy.get(".custom-checkbox").click();

    cy.get(".mat-form-field-infix").first().click();
    cy.get("#mat-option-16").click();

    cy.wait(100);

    // cy.intercept("*districts*").as("districts");
    // cy.wait(["@districts"]);

    cy.get(".mat-form-field-infix").last().click();
    cy.get("#mat-option-40").click();

    cy.get(".pin-search-btn").click();

    // cy.intercept("*calendarByDistrict*").as("calendarByDistrict");
    // cy.wait(["@calendarByDistrict"]);

    cy.get(".agefilterblock .form-check").first().click();

    const slot = cy.get(".slots-box").not(".no-seat").not(".no-available");
    if (slot) {
      slot.first().click();
    } else {
      console.log("Not Available");
    }
  });
});
