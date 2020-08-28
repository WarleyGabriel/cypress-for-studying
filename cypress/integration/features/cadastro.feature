Feature: Cadastro

    Scenario: Cadastro de novo usuário
        Given eu acesso o site
        When e informo os dados de cadastro
            And eu clico para salvar o cadastro
        Then sistema apresenta usuário cadastrado com sucesso
