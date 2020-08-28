/// <reference types="cypress" />

const Chance = require("chance");
let chance = new Chance();

context("Cadastro", () => {
  it("Cadastro de usuário no site", () => {
    cy.visit("Register.html");

    // rotas
    // POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    // GET 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    cy.server();
    cy.route(
      "POST",
      "**/api/1/databases/userdetails/collections/newtable?**"
    ).as("postNewTable");

    cy.route(
      "POST",
      "**/api/1/databases/userdetails/collections/usertable?**"
    ).as("postUserTable");

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

    cy.get("#submitbtn").click();

    cy.wait("@postNewTable").then((res) => {
      expect(res.status).equal(200);
    });
    cy.wait("@postUserTable").then((res) => {
      expect(res.status).equal(200);
    });

    cy.url().should("contain", "WebTable");
  });
});

// elementos

// input[ng-model$=irstName]
// input[ng-model^=Last]
// input[ng-model*=Adre]
// input[ng-model*=Phon]

// input[value="FeMale"]
// input[type="checkbox"]

// select#Skills
// select#countries
// select#country
// select#yearbox
// select[ng-model="monthbox"]
// select#daybox

// input#firstpassword
// input#secondpassword

// input#imagesrc

// #submitbtn
