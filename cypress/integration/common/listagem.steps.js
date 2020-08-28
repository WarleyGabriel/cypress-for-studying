/// <reference types="cypress" />

const Chance = require("chance");
let chance = new Chance();

Given(/^que o site não possui registros$/, () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "**/api/1/databases/userdetails/collections/newtable?**",
    status: 200,
    response: "fx:webtable-get-vazio",
  }).as("getNewTable");
});

When(/^eu acessar a Listagem$/, () => {
  cy.visit("WebTable.html");
});

Then(/^sistema deve exibir a listagem vazia$/, () => {
  cy.get("div[role=row]").should("have.length", 1);
});

Given(/^que o site possui apenas um registro$/, () => {
  cy.server();
  cy.route({
    method: "GET",
    url: "**/api/1/databases/userdetails/collections/newtable?**",
    status: 200,
    response: "fx:webtable-get-unico",
  }).as("getNewTable");
});

Then(/^sistema deve exibir apenas um registro na listagem$/, () => {
  cy.get("div[role=row] div[role=gridcell]")
    .eq(4)
    .find("div")
    .as("gridCellPhone");

  cy.get("@gridCellPhone").should(
    "contain.text",
    "div[role=row] div[role=gridcell]"
  );
});
