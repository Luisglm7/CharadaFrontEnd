# Charada do Dia

Este é um projeto de front-end que consome uma API para exibir charadas de forma interativa. O usuário pode tentar responder às charadas e verificar se sua resposta está correta.

## Tecnologias Utilizadas

- ![image](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
- ![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
- ![image](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- ![image](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)


## Funcionalidades

- Exibição de uma charada aleatória ao carregar a página.
- Campo de entrada para o usuário digitar sua resposta.
- Verificação da resposta com feedback visual (correto ou incorreto).
- Botão para carregar uma nova charada.

## Como Usar

1. Clone este repositório:
   ```bash
   git clone <url-do-repositorio>
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd CharadaFrontEnd
   ```
3. Abra o arquivo `index.html` em um navegador.

## Estrutura do Projeto

- `index.html`: Estrutura principal da aplicação.
- `style.css`: Estilos personalizados para o projeto.
- `script.js`: Lógica de interação e consumo da API.

## API

O projeto consome a API hospedada em `https://charada-back-end.vercel.app` para obter as charadas. A rota utilizada é:

- **GET** `/charadas`: Retorna uma charada aleatória no formato:
  ```json
  {
    "id": "1",
    "pergunta": "O que é, o que é...",
    "resposta": "Resposta da charada"
  }
  ```

## Melhorias Futuras

- Adicionar suporte a múltiplos idiomas.
- Implementar um sistema de pontuação para os usuários.
- Criar uma versão responsiva para dispositivos móveis.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.

## Link vercel front end

`https://charada-front-end.vercel.app/`

