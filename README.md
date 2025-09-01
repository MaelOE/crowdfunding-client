# Venture Club - Client

## [See the App!](https://vcventureclub.netlify.app/)

## Description

React (Vite + React Router) application to explore startups: browse, search, view details (with image carousel), support, and create/edit/delete entries.

#### [Client Repo here](https://github.com/MaelOE/crowdfunding-client)

#### [Server Repo here](https://github.com/MaelOE/crowdfunding-server)

## Technologies, Libraries & APIs used

- Vite + React
- React Router (\`react-router-dom\`)
- Axios (HTTP requests)
- Tailwind CSS (UI)
- JSON Server (API)
- Environment variables: \`VITE_SERVER_URL\`

## Backlog Functionalities

- Filter by sector + sorting (amount raised, A→Z, likes)
- Pagination / lazy-loading of startups
- Form validation + error/success messages (toasts)
- Image handling (preview + URL validation)
- Authentication (login/logout) and roles (protected edit/delete)
- Favorites / “follow” a startup
- Tests (unit and e2e)

# Client Structure

\`\`\`
src/
├─ components/
│ ├─ Navbar.jsx
│ └─ CarouselLite.jsx
├─ pages/
│ ├─ AllStartupsPage.jsx
│ ├─ StartupDetailsPage.jsx
│ ├─ AddStartupPage.jsx
│ └─ EditStartupPage.jsx
├─ App.jsx
├─ main.jsx
├─ index.css
└─ App.css
\`\`\`

## User Stories

- **browse list** – As a user, I can see the list of startups.
- **search** – I can search by name, sector or keyword.
- **view details** – I can view details of a startup, see the image carousel and information (sector, contact, amount raised).
- **like** – I can “support” a startup (increment likes).
- **create** – I can add a new startup through a form.
- **edit** – I can edit an existing startup.
- **delete** – I can delete a startup.
- **navigation** – I can navigate back and forth using the Navbar.
- **loading state** – I see a “Loading…” state during requests.

## Client Routes

### React Router Routes (React App)

| Path                          | Page               | Components           | Behavior                                                                |
| ----------------------------- | ------------------ | -------------------- | ----------------------------------------------------------------------- |
| \`/\`                         | AllStartupsPage    | Navbar               | Shows all startups, client-side search                                  |
| \`/startups/:startupId\`      | StartupDetailsPage | Navbar, CarouselLite | Displays startup details, image carousel, like button, delete, back nav |
| \`/startups/add\`             | AddStartupPage     | Navbar               | Form to create new startup, redirects to \`/\` after success            |
| \`/startups/edit/:startupId\` | EditStartupPage    | Navbar               | Edit via \`PATCH\`, redirect back to details page                       |

## Other Components

- Navbar
- CarouselLite

## Environment

Create a \`.env.local\` file in the client root:

\`\`\`
VITE_SERVER_URL=http://localhost:5005
\`\`\`

> _Replace the URL with your JSON server address._

## API usage (from client)

- \`GET /startups?\_expand=sector\` – list all startups with sector info
- \`GET /startups/:id?\_expand=sector\` – get details of one startup
- \`POST /startups\` – create new startup
- \`PATCH /startups/:id\` – update startup (form or likes)
- \`DELETE /startups/:id\` – delete startup
- \`GET /sectors\` – list all sectors

## How to run

\`\`\`bash

# Install dependencies

npm install

# Start dev server (Vite)

npm run dev
\`\`\`

Make sure the **JSON server** is running and \`VITE_SERVER_URL\` points to it.

## Links

### Collaborator

[Developer 1 name](https://github.com/MaelOE)

### Project

[Repository Link Client](https://github.com/MaelOE/crowdfunding-client)  
[Repository Link Server](https://github.com/MaelOE/crowdfunding-server)  
[Deploy Link](https://vcventureclub.netlify.app/)
