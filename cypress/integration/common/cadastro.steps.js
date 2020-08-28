/// <reference types="cypress" />

const Chance = require("chance");
let chance = new Chance();

Given(/^eu acesso o site$/, () => {
  cy.visit("Register.html");

  cy.server();

  cy.route("POST", "**/api/1/databases/userdetails/collections/newtable?**").as(
    "postNewTable"
  );

  cy.route(
    "POST",
    "**/api/1/databases/userdetails/collections/usertable?**"
  ).as("postUserTable");
});

When(/^e informo os dados de cadastro$/, () => {
  // inputs
  cy.get("input[ng-model$=irstName]").type(chance.first());
  cy.get("input[ng-model^=Last]").type(chance.last());
  cy.get("input[ng-model*=Adre]").type(chance.email());
  cy.get("input[ng-model*=Phon]").type(chance.phone({ formatted: false }));

  // radio or checkbox
  cy.get('input[value="FeMale"]').check();
  cy.get('input[type="checkbox"]').check("Cricket");
  cy.get('input[type="checkbox"]').check("Hockey");

  // selects
  cy.get("select#Skills").select("Android");
  cy.get("select#countries").select("Argentina");
  cy.get("select#country").select("Australia", { force: true });
  cy.get("select#yearbox").select("1995");
  cy.get('select[ng-model="monthbox"]').select("April");
  cy.get("select#daybox").select("30");

  cy.get("input#firstpassword").type("ABC123$.ABc");
  cy.get("input#secondpassword").type("ABC123$.ABc");

  cy.get("input#imagesrc").attachFile("image-teste.png");
});

When(/^eu clico para salvar o cadastro$/, () => {
  cy.get("#submitbtn").click();
});

Then(/^sistema apresenta usuário cadastrado com sucesso$/, () => {
  cy.wait("@postNewTable").then((res) => {
    expect(res.status).equal(200);
  });
  cy.wait("@postUserTable").then((res) => {
    expect(res.status).equal(200);
  });

  cy.url().should("contain", "WebTable");
});
