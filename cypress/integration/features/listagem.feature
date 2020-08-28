Feature: Listagem

    Scenario: Listagem sem registros
        Given que o site não possui registros
        When eu acessar a Listagem
        Then sistema deve exibir a listagem vazia

    Scenario: Listagem com registros
        Given que o site possui apenas um registro
        When eu acessar a Listagem
        Then sistema deve exibir apenas um registro na listagem
