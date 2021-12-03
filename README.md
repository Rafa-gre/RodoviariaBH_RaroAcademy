# Raro Academy Projeto App Rodoviaria BH

Sistema de compra de passagens da rodoviária de Belo Horizonte.

## Pré-requisitos

Para rodar esta aplicação, você precisará:

- git
- nodejs. Sugiro que esteja na versão LTS
- sugiro o uso do `npm`, para controle de pacotes. Mas se preferir, o `yarn` também pode ser utilizado.
- sugiro um editor de texto que dê bom suporte ao desenvolvimento com typescript.

## Instalação

Os comandos abaixo descrevem a instalação básica do repositório. Se preferir, você pode adotar o clone via https, renomear a pasta raiz, ou o uso do `yarn`, conforme descrito acima.

```bash
git clone https://github.com/Rafa-gre/RodoviariaBH_RaroAcademy.git
cp .env.example .env
# neste ponto, sugere-se preencher seu novo arquivo .env com as configurações do seu projeto
npm install
```

Atenção ao quarto comando da lista de comandos acima. Nele, você está criando seu arquivo de variáveis de ambiente. Preencha todas as variáveis com os dados adequados. Para os campos de `secret`, sugiro:

- o campo `SECRET`, preencha com uma chave aleatória bem grande. Sugiro uma chave com 256 caracteres, gerada em sites como [este](https://passwordsgenerator.net/).
- o campo `AUTH_SECRET`, preencha com uma chave aleatória. Sugiro uma chave com 64 caracteres, gerada da mesma forma que a chave anterior.

> Muita atenção com este arquivo, pois ele não deverá ser versionado, pois ele possui informações sensíveis do projeto.

### build

Comando para criação do bundle de produção. Este pacote será produzido na pasta `/dist`, na raiz deste projeto.

```bash
npm run build
```

### start

Comando utilizado para iniciar o projeto resultante do `build`. Ou seja, este deverá executar a aplicação em modo produção. **Importante notar que ele somente executa o bundle produzido pelo build. A atualização deste pacote requer que o comando de build seja executado.**

```bash
npm start
```

### dev

Comando utilizado para iniciar o projeto em modo de desenvolvimento

```bash
npm run dev
```

### lint

Revisa seu código, procurando por possíveis "code smells". Caso encontre algum problema de qualidade, segundo as especificações do nosso lint, ele deverá reportar para você.

### lint:fix

Revisa seu código, procurando por possíveis "code smells". Caso encontre algum problema de qualidade, segundo as especificações do nosso lint, ele deverá reportar para você. Nesta opção de execução do lint, o script tentará corrigir todos os code smells que possam ser alterados de forma automática.

### test

Executa os testes de unidade do projeto. Existem três variações do comando, conforme descritas abaixo:

```bash
# Executa em modo single run, sem análise de cobertura
npm test

# executa em modo "live", acompanhando as mudanças do código. Muito útil em modo de desenvolvimento
npm run test:watch

# executa em modo "cobertura". Executa apenas uma vez, e gera um relatório de cobertura em testes de unidade do seu projeto
npm run test:coverage
```

## Pacotes

Os principais pacotes utilizados nesse projeto são:

- typescript
- axios
- dotenv
- jsonwebtoken
- typedi

A tecnologia de armazenamento de dados utilizado será em memoria.

## Estrutura do projeto

Este projeto foi estruturado para trabalhar com as camadas `routers`, `controllers`, `services`, `clients`. Cada uma destas estruturas conta com uma pasta, dentro de `src`.

# REST API

As chamadas REST API do projeto estão descritas logo abaixo.

- São 3 tipos de usuários no sistema:
  - Administrador
  - Funcionário Cia
  - Passageiro
- Os administradores do sistema podem utilizar todas as chamadas da API.
- Funcionários das Cia são os empregados cadastrados pelas cias que prestam serviço na rodoviária.
- Passageiros podem se cadastrar, buscar as viagens por Cia e reservar seu assento.

## Usuarios

- Usuários são administradores do sistema que utiliza todas as chamadas da API.

### Request

`POST /usuarios/signin`

    curl -i -H 'Accept: application/json' http://localhost:3000/usuarios/signin

Login de um usuário no sistema e recebe um token de acesso.

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

    {
      "email": "admin@admin",
      "hashSenha": "admin"
    }

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Date: Wed, 01 Dec 2021 13:39:21 GMT
    Connection: keep-alive

    {
      "token": ...,
    }

### Request

`GET /usuarios`

    curl -i -H 'Accept: application/json' http://localhost:3000/usuarios/

Recebe uma lista de Usuários cadastrados no sistema.

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

[
    {
        "id": 1,
        "nome": "Paulo Coleta",
        "email": "coleta@rarolabs.com.br",
        "perfil": "Admin",
        "companhia": "Admin"
    },
    {
        "id": 2,
        "nome": "Phil",
        "email": "phil@rarolabs.com.br",
        "perfil": "Funcionario",
        "companhia": "Cometa"
    },
    {
        "id": 3,
        "nome": "Paulo",
        "email": "paulo@rarolabs.com.br",
        "perfil": "Passageiro",
        "companhia": "Passageiro"
    }
]

### Request

`GET /usuarios/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/usuarios/:id

Recebe um Usuario cadastrado no sistema de acordo com seu id.

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

    [ 
       {
        "id": 1,
        "nome": "Paulo Coleta",
        "email": "coleta@rarolabs.com.br",
        "perfil": "Admin",
        "companhia": "Admin"
        }
    ]

### Request

`POST /usuarios`

    curl -i -H 'Accept: application/json' http://localhost:3000/usuarios/

Acidiona um novo Usuário Administrador no sistema.

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

{
    "id": 4,
    "nome": "Rafael",
    "email": "rafael@gregorini.com.br",
    "perfil": "Admin",
    "companhia": "Admin",
    "senha": 1234
}

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Date: Wed, 01 Dec 2021 13:39:21 GMT
    Connection: keep-alive

{
    "id": 4,
    "nome": "Rafael",
    "email": "rafael@gregorini.com.br",
    "perfil": "Admin",
    "companhia": "Admin",
    "senha": 1234
}

### Request

`POST /usuarios/criarFuncionario`

    curl -i -H 'Accept: application/json' http://localhost:3000/usuarios/criarFuncionario/

Acidiona um novo Usuário Funcionário no sistema.

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

{
    "id": 4,
    "nome": "Rafael",
    "email": "rafael@gregorini.com.br",
    "perfil": "Funcionario",
    "companhia": "Cometa",
    "senha": 1234
}

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Date: Wed, 01 Dec 2021 13:39:21 GMT
    Connection: keep-alive

{
    "id": 4,
    "nome": "Rafael",
    "email": "rafael@gregorini.com.br",
    "perfil": "Funcionario",
    "companhia": "Cometa",
    "senha": 1234
}

### Request

`POST /usuarios/criarPassageiro`

    curl -i -H 'Accept: application/json' http://localhost:3000/usuario/criarPassageiro/

Acidiona um novo Usuário Administrador no sistema.

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

{
    "id": 4,
    "nome": "Rafael",
    "email": "rafael@gregorini.com.br",
    "perfil": "Passageiro",
    "senha": 1234
}

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Date: Wed, 01 Dec 2021 13:39:21 GMT
    Connection: keep-alive

{
    "id": 4,
    "nome": "Rafael",
    "email": "rafael@gregorini.com.br",
    "perfil": "Passageiro",
    "companhia": "Passageiro",
    "senha": 1234
}

### Request

`PATCH /usuarios/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/usuarios/:id

Atualiza os dados de um Usuário no sistema.

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

{
    "id": 4,
    "nome": "Rafael",
    "email": "rafael@gregorini.com.br",
    "perfil": "Funcionario",
    "companhia": "Cometa",
}

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Date: Wed, 01 Dec 2021 13:39:21 GMT
    Connection: keep-alive


    {
    "id": 4,
    "nome": "Rafael",
    "email": "rafael@gregorini.com.br",
    "perfil": "Funcionario",
    "companhia": "Cometa",
}

### Request

`DELETE /usuarios/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/usuarios/:id

Deleta um usuário.

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

    {}

## Companhias

    Companhias cadastradas que prestam serviço na rodoviária de Belo Horizonte
    
     - So podem ser cadastradas por Administrador

`GET /companhias`

    curl -i -H 'Accept: application/json' http://localhost:3000/companhias/

Recebe uma lista de companhias cadastradas.

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

    [
    {
        "id": 1,
        "nome": "Itampemirim",
        "viagens": [
            {
                "id": 1,
                "origem": "Belo Horizonte",
                "destino": "São Paulo",
                "data": "2022-01-01T11:00:00.000Z",
                "numeroAssentos": 0,
                "ciaId": 1
            },
            {
                "id": 2,
                "origem": "Rio de Janeiro",
                "destino": "Belo Horizonte",
                "data": "2022-01-02T22:00:00.000Z",
                "numeroAssentos": 40,
                "ciaId": 1
            }
        ]
    },
    {
        "id": 2,
        "nome": "Viação Cometa",
        "viagens": [
            {
                "id": 3,
                "origem": "Belo Horizonte",
                "destino": "Rio de Janeiro",
                "data": "2022-01-04T17:00:00.000Z",
                "numeroAssentos": 40,
                "ciaId": 2
            },
            {
                "id": 4,
                "origem": "Belo Horizonte",
                "destino": "Brasilia",
                "data": "2022-01-05T09:00:00.000Z",
                "numeroAssentos": 40,
                "ciaId": 2
            }
        ]
    }
]

### Request

`GET /companhias/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/companhias/:id

Recebe um companhias que trabalham na empresa de acordo com seu id.

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

   {
    "id": 1,
    "nome": "Itampemirim",
    "viagens": [
        {
            "id": 1,
            "origem": "Belo Horizonte",
            "destino": "São Paulo",
            "data": "2022-01-01T11:00:00.000Z",
            "numeroAssentos": 0,
            "ciaId": 1
        },
        {
            "id": 2,
            "origem": "Rio de Janeiro",
            "destino": "Belo Horizonte",
            "data": "2022-01-02T22:00:00.000Z",
            "numeroAssentos": 40,
            "ciaId": 1
        }
    ]
}

### Request

`POST /companhias`

    curl -i -H 'Accept: application/json' http://localhost:3000/companhias/

Acidiona um novo Colaboradore na empresa.

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

   {
    "id": 1,
    "nome": "Itampemirim",
    "viagens": [
        {
            "id": 1,
            "origem": "Belo Horizonte",
            "destino": "São Paulo",
            "data": "2022-01-01T11:00:00.000Z",
            "numeroAssentos": 0,
            "ciaId": 1
        },
        {
            "id": 2,
            "origem": "Rio de Janeiro",
            "destino": "Belo Horizonte",
            "data": "2022-01-02T22:00:00.000Z",
            "numeroAssentos": 40,
            "ciaId": 1
        }
    ]
}

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Date: Wed, 01 Dec 2021 13:39:21 GMT
    Connection: keep-alive

   {
    "id": 1,
    "nome": "Itampemirim",
    "viagens": [
        {
            "id": 1,
            "origem": "Belo Horizonte",
            "destino": "São Paulo",
            "data": "2022-01-01T11:00:00.000Z",
            "numeroAssentos": 0,
            "ciaId": 1
        },
        {
            "id": 2,
            "origem": "Rio de Janeiro",
            "destino": "Belo Horizonte",
            "data": "2022-01-02T22:00:00.000Z",
            "numeroAssentos": 40,
            "ciaId": 1
        }
    ]
}

### Request

`PATCH /companhias/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/companhias/:id

Atualiza os dados de um Colaborador na empresa.

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

   {
    "id": 1,
    "nome": "Itampemirim",
    "viagens": [
        {
            "id": 1,
            "origem": "Belo Horizonte",
            "destino": "São Paulo",
            "data": "2022-01-01T11:00:00.000Z",
            "numeroAssentos": 0,
            "ciaId": 1
        },
        {
            "id": 2,
            "origem": "Rio de Janeiro",
            "destino": "Belo Horizonte",
            "data": "2022-01-02T22:00:00.000Z",
            "numeroAssentos": 40,
            "ciaId": 1
        }
    ]
}

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Date: Wed, 01 Dec 2021 13:39:21 GMT
    Connection: keep-alive

   {
    "id": 1,
    "nome": "Itampemirim",
    "viagens": [
        {
            "id": 1,
            "origem": "Belo Horizonte",
            "destino": "São Paulo",
            "data": "2022-01-01T11:00:00.000Z",
            "numeroAssentos": 0,
            "ciaId": 1
        },
        {
            "id": 2,
            "origem": "Rio de Janeiro",
            "destino": "Belo Horizonte",
            "data": "2022-01-02T22:00:00.000Z",
            "numeroAssentos": 40,
            "ciaId": 1
        }
    ]
}

### Request

`DEL /companhias/:id`

    curl -i -H 'Accept: application/json' http://localhost:3000/companhias/:id

Deleta um Colaborador na empresa mudando o status para false.

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

    {}

## Viagens

Viagens cadastradas por companhia
     - So podem ser cadastradas por Administrador
     - Só podem ser cadastradas por Funcionário da Companhia

`GET /companhias/:id/viagens`

    curl -i -H 'Accept: application/json' http://localhost:3000/companhias/1/viagens

Recebe uma lista de viagens cadastradas na companhia.

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

    [
    {
        "id": 1,
        "origem": "Belo Horizonte",
        "destino": "São Paulo",
        "data": "2022-01-01T11:00:00.000Z",
        "numeroAssentos": 0,
        "ciaId": 1
    },
    {
        "id": 2,
        "origem": "Rio de Janeiro",
        "destino": "Belo Horizonte",
        "data": "2022-01-02T22:00:00.000Z",
        "numeroAssentos": 40,
        "ciaId": 1
    }
]

### Request

`GET /companhias/:id/viagens/:viagemId`

    curl -i -H 'Accept: application/json' http://localhost:3000/companhias/:id/viagens/:viagemId

Busca uma viagem por companhia de acordo com o seu ID

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

   [
    {
        "id": 1,
        "origem": "Belo Horizonte",
        "destino": "São Paulo",
        "data": "2022-01-01T11:00:00.000Z",
        "numeroAssentos": 0,
        "ciaId": 1
    }
]

### Request

`POST /companhias/:id/viagens`

    curl -i -H 'Accept: application/json' http://localhost:3000/companhias/:id/viagens

Adiciona uma nova viagem na companhia

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

   [
    {
        "id": 1,
        "origem": "Belo Horizonte",
        "destino": "São Paulo",
        "data": "2022-01-01T11:00:00.000Z",
        "numeroAssentos": 0,
        "ciaId": 1
    }
]

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Date: Wed, 01 Dec 2021 13:39:21 GMT
    Connection: keep-alive

      [
    {
        "id": 1,
        "origem": "Belo Horizonte",
        "destino": "São Paulo",
        "data": "2022-01-01T11:00:00.000Z",
        "numeroAssentos": 0,
        "ciaId": 1
    }
]

### Request

`PATCH /companhias/:id/viagens/:viagemId`

    curl -i -H 'Accept: application/json' http://localhost:3000/companhias/:id/viagens/:viagemId

Atualiza os dados de uma viagem.

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

   [
    {
        "id": 1,
        "origem": "Belo Horizonte",
        "destino": "São Paulo",
        "data": "2022-01-01T17:00:00.000Z",
        "numeroAssentos": 0,
        "ciaId": 1
    }
]

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Date: Wed, 01 Dec 2021 13:39:21 GMT
    Connection: keep-alive

  [
    {
        "id": 1,
        "origem": "Belo Horizonte",
        "destino": "São Paulo",
        "data": "2022-01-01T17:00:00.000Z",
        "numeroAssentos": 0,
        "ciaId": 1
    }
]

### Request

`DELETE /companhias/:id/viagens/viagemId`

    curl -i -H 'Accept: application/json' http://localhost:3000/companhias/:id/viagens/viagemId

Deleta uma viagem.

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

    {}


### Request

`POST /companhias/:id/viagens/:viagemId/reservar`

    curl -i -H 'Accept: application/json' http://localhost:3000/companhias/:id/viagens/:viagemId/reservar

Reserva um assento na viagem.

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

   [
    {
        "id": 1,
        "origem": "Belo Horizonte",
        "destino": "São Paulo",
        "data": "2022-01-01T11:00:00.000Z",
        "numeroAssentos": 5,
        "ciaId": 1
    }
]

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Date: Wed, 01 Dec 2021 13:39:21 GMT
    Connection: keep-alive

   [
    {
        "id": 1,
        "origem": "Belo Horizonte",
        "destino": "São Paulo",
        "data": "2022-01-01T11:00:00.000Z",
        "numeroAssentos": 4,
        "ciaId": 1
    }
]

### Request

`POST /companhias/:id/viagens/bucaDatas`

    curl -i -H 'Accept: application/json' http://localhost:3000/companhias/:id/viagens/buscaDatas/

Recebe uma data inicial e uma data final e devolve as viagens dentro desse intervalo.

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

   [
    dataInicial: "20211130"
    dataFinal: "20220201"
]

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Date: Wed, 01 Dec 2021 13:39:21 GMT
    Connection: keep-alive

[
    {
        "id": 1,
        "origem": "Belo Horizonte",
        "destino": "São Paulo",
        "data": "2022-01-01T11:00:00.000Z",
        "numeroAssentos": 0,
        "ciaId": 1
    },
    {
        "id": 2,
        "origem": "Rio de Janeiro",
        "destino": "Belo Horizonte",
        "data": "2022-01-02T22:00:00.000Z",
        "numeroAssentos": 40,
        "ciaId": 1
    }
]

### Request

`GET /companhias/:id/viagens/buscaOD`

    curl -i -H 'Accept: application/json' http://localhost:3000/companhias/:id/viagens/buscaOD?origem=Belo Horizonte&?destino=Sao Paulo

Busca uma viagem por companhia de acordo com a sua origem e destino

### Response

    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 144
    ETag: W/"90-i8P2JpHz0LZSG36iTcEAOGnPvRA"
    Connection: keep-alive

   [
    {
        "id": 1,
        "origem": "Belo Horizonte",
        "destino": "São Paulo",
        "data": "2022-01-01T11:00:00.000Z",
        "numeroAssentos": 0,
        "ciaId": 1
    }
]

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
