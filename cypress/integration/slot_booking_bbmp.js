describe("My First Test", () => {
  it("Open Cowin App!", () => {
    cy.viewport(1000, 1000);
    cy.visit("https://selfregistration.cowin.gov.in/");
    cy.get("input#mat-input-0").type("9968726089");
    cy.get(".next-btn").click();
    cy.get("input#mat-input-1").focus();
    cy.pause();    
  });
  /*
  * 1. User needs to click on Verify button 
  * 2. User needs to select beneficiaries by clicking on schedule 
  * 3. Click Cypress Resume
  * 4. Below method will rerun untill it will find a slot 
  * 5. Need to add some delay 
  */
  it('.select() - select an option in a <select> element', 
  {
    "retries": 200000
  },() => {    
    // https://on.cypress.io/select   
    
    cy.get('.custom-checkbox').click('right')
    cy.get('[formcontrolname="state_id"]').click()
    cy.wait(100)
    cy.get('[role="listbox"]').contains('Karnataka').click()
    cy.wait(500)
    cy.get('[formcontrolname="district_id"]').click()
    cy.wait(100)
    cy.get('[role="listbox"]').contains('BBMP').click()   
    cy.wait(500)
    cy.get('.district-search').click()
    cy.wait(1000)
    cy.get(".agefilterblock .form-check").first().click({force: true});
    cy.wait(500)  
    cy.get(".slots-box").not(".no-seat").not(".no-available")
    .should(($div) => {
      const n = parseFloat($div.text())
      expect(n).to.be.gte(0)
      if (n >= 1) {
          // you can throw your own errors
          alert('Vaccine Slot Available')
        }
    })
    
  })  
});
