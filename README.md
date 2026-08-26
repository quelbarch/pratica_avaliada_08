# 🎮 Loja Games - Frontend

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Projeto Desenvolvido por [Raquel Barcheta](https://github.com/RaquelBarcheta)**  
> 🎓 **Finalidade Educacional**: Aplicação web *Full Stack / Frontend* focada em e-commerce de video games, consumo de APIs RESTful, gerenciamento de estado global com Context API e autenticação via JWT.

---

## 📌 Sobre o Projeto

O **Loja Games** é uma aplicação React de e-commerce com design futurista (*Nexus Theme*), desenvolvida para simular a navegação, cadastro, gerenciamento de categorias e produtos em uma loja virtual de jogos eletrônicos.

Este repositório contém a interface frontend completa, integrada a uma API REST hospedada no Render:  
`https://lojagames-3nay.onrender.com`

### ✨ Destaques & Funcionalidades
- 🔐 **Autenticação & Proteção de Rotas:**
  - Login e Cadastro de usuários com validações personalizadas (idade mínima de 18 anos, verificação de formato de URL de foto, confirmação de senha).
  - Rotas protegidas via `ProtectedRoute` impedindo acesso não autenticado a áreas internas.
  - Armazenamento e renovação/validação de Token JWT via Context API (`AuthContext`).
- 📂 **Gerenciamento de Categorias (CRUD):**
  - Listagem de categorias cadastradas na API.
  - Cadastro de novas categorias de jogos.
  - Edição e exclusão com tratamento de expiração de sessão (erro 403).
- 🛍️ **E-commerce & Interface:**
  - Interface moderna com tema escuro neon/cyberpunk (*Nexus*).
  - Componentes de layout para Catálogo de Produtos, Detalhes do Perfil do Usuário e Carrinho de Compras.
  - Notificações em tempo real estilizadas via `react-toastify`.

### 🔗 Endpoints Integrados
- `POST /usuarios/cadastrar` — Cadastro de usuário
- `POST /usuarios/logar` — Autenticação e geração de token JWT
- `GET /categorias` — Listagem de categorias (Requer Autenticação)
- `GET /categorias/{id}` — Detalhes da categoria (Requer Autenticação)
- `POST /categorias` — Criação de categoria (Requer Autenticação)
- `PUT /categorias` — Atualização de categoria (Requer Autenticação)
- `DELETE /categorias/{id}` — Remoção de categoria (Requer Autenticação)

---

## 🛠️ Tecnologias e Bibliotecas Utilizadas

| Tecnologia / Lib | Descrição / Uso |
| :--- | :--- |
| **React 18** | Biblioteca principal para construção da interface baseada em componentes |
| **TypeScript** | Adição de tipagem estática e interfaces (`Usuario`, `Categoria`, `UsuarioLogin`) |
| **React Router DOM v6** | Gerenciamento de rotas e navegação SPA (*Single Page Application*) |
| **Tailwind CSS v4** | Framework utilitário de CSS com variáveis e gradientes customizados |
| **Axios** | Cliente HTTP para consumo de endpoints REST |
| **Phosphor Icons** | Biblioteca de ícones modernos e flexíveis (`@phosphor-icons/react`) |
| **React Toastify** | Feedbacks visuais e alertas para o usuário |
| **Day.js** | Manipulação de datas para cálculo de idade no cadastro de usuários |
| **React Loader Spinner** | Indicadores visuais de carregamento (*spinners/loaders*) |
| **React Number Format** | Formatação de moeda/valores numéricos |

---

## 📁 Estrutura de Pastas

```text
src/
 ├── components/
 │    ├── categorias/
 │    │    ├── cardcategorias/
 │    │    ├── deletarcategorias/
 │    │    ├── formcategoria/
 │    │    └── listarcategorias/
 │    ├── footer/
 │    ├── navbar/
 │    ├── produtos/
 │    └── cardcart/
 ├── contexts/
 │    └── AuthContext.tsx       # Contexto global de autenticação
 ├── models/
 │    ├── Categoria.ts           # Interface do modelo Categoria
 │    ├── Usuario.ts             # Interface do modelo Usuário
 │    └── UsuarioLogin.ts        # Interface do Payload de Login
 ├── pages/
 │    ├── cadastro/              # Página de registro com validações
 │    ├── home/                  # Dashboard principal
 │    ├── login/                 # Autenticação de usuário
 │    └── perfil/                # Exibição do perfil cadastrado
 ├── routes/
 │    └── ProtectedRoute.tsx     # Middleware de rotas privadas
 ├── services/
 │    └── Service.ts             # Configuração do Axios e métodos HTTP
 ├── App.tsx                     # Componente Raiz e rotas da aplicação
 └── index.css                   # Configurações globais CSS e animações Nexus
