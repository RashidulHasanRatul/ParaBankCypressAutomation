describe('Parabank Account Service Automation', () => {
  
  it('Logs in, captures account details, and saves to CSV', () => {
    const startTime = new Date();

  
    cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    
   
    cy.get('input[name="username"]').type('john'); 
    cy.get('input[name="password"]').type('demo');  
    cy.get('input.button').click();
    
    
    cy.contains('Accounts Overview').should('be.visible');


    cy.get('tbody > :nth-child(1) > :nth-child(1) > a').then(($accountNumber) => {
      const accountNumber = $accountNumber.text();

      cy.get('tbody > :nth-child(1) > :nth-child(2)').then(($balance) => {
        const balance = $balance.text();

       
        const endTime = new Date();
        const executionTime = (endTime - startTime) / 1000;  

       
        cy.log(`Account Number: ${accountNumber}`);
        cy.log(`Balance: ${balance}`);
        cy.log(`Execution Time: ${executionTime}s`);

        
        const csvLine = `${accountNumber},${balance},${executionTime}s\n`;
        const filePath = 'cypress/fixtures/account_details.csv';
        cy.writeFile(filePath, csvLine, { flag: 'a+' });
      });
    });
  });
});
