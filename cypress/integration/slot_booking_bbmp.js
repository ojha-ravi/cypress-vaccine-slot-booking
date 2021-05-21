const { notifyMe } = require("../plugins/notification");

const phoneNumber = Cypress.env("phone_number");
const state = Cypress.env("state");
const district = Cypress.env("district");

describe("Find slot and move to last page", () => {
  let otp = null;
  it("Open Cowin App!", () => {
    cy.viewport(1536, 1020);
    cy.visit("https://selfregistration.cowin.gov.in/");
    cy.get("input#mat-input-0").type(phoneNumber);
    cy.get(".next-btn").click();
  });

  it("Fetch OTP", { retries: 1000 }, () => {
    cy.wait(1000);
    cy.request("http://localhost:8888/otp").as("otp");
    cy.get("@otp").should((response) => {
      console.log(response.body);
      otp = response.body.otp;
      expect(otp).not.to.be.null;
    });
    cy.wait(1000);
  });

  it("Enter OTP and continue", () => {
    cy.get("input#mat-input-1").click();
    cy.get("input#mat-input-1").type(parseInt(otp));
    cy.get(".next-btn").click();
  });

  it("Click Beneficiary", () => {
    cy.wait(300);
    cy.get(".calcls").last().click();
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

  it(".select() - select an option in a <select> element", { retries: 100 }, () => {
    cy.viewport(1536, 1020);
    cy.get(".district-search").click();
    cy.wait(100);
    cy.get(".agefilterblock .form-check").first().click();
    cy.get(".slots-box").not(".no-available").not(".no-seat").first().click();
    cy.get(".time-slot").last().click();
    // .then(($ele) => {
    //   const availableSlots = parseFloat($ele.text());
    //   expect(availableSlots).to.be.gte(0);
    //   if (availableSlots > 0) {
    //     console.log("SLOTS AVAILABLE");
    //     $ele.click();
    //   }
    // });
  });

  after(() => {
    cy.get(".register-btn")
      .its("length")
      .then((res) => {
        if (res > 0) {
          console.log("SLOTS AVAILABLE, SHOULD NOT RELOAD!!. Please Book Now!!");
          alert("Abe aaya aaya aaya !!!");
          cy.get(".captcha-style input").click();
          notifyMe();
        } else {
          console.log("No SLots found in last ~15mins");
          window.location.reload();
        }
      });
  });
});
