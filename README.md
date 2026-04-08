# CFO Financial Dashboard

A full-stack financial dashboard built for Chief Financial Officers and finance teams. Provides secure, role-based access to financial data, user management, and executive reporting in a modern web interface.

## What It Does

The CFO Financial Dashboard gives finance leaders and their teams a centralised platform to:

- **Secure authentication** — users register and log in with password-protected accounts
- **Role-based access control** — separate views and permissions for admins and standard users
- **Profile management** — authenticated users can view their account details and role
- **Admin oversight** — administrators can view all registered users and their access levels
- **Executive-ready UI** — clean, responsive interface built with Tailwind CSS

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js · TypeScript · App Router · Tailwind CSS |
| Backend | Express.js · TypeScript · Node.js |
| Auth | JWT (HTTP-only cookies) · bcrypt |
| Testing | Playwright (e2e) · Cucumber.js (BDD) · Vitest + Supertest (unit) |
| Local orchestration | .NET Aspire (service discovery & dashboard) |
| Deployment | Azure Container Apps via Azure Developer CLI (`azd`) |

## Getting Started

```bash
npm install
cd src/web && npm install && cd ../..
cd src/api && npm install && cd ../..

# Run locally (all services)
npm run dev:aspire

# Deploy to Azure
azd auth login && azd up
```

## Key Commands

| Command | What it does |
|---------|-------------|
| `npm run dev:aspire` | Run all services with Aspire |
| `npm run dev:all` | API + Web + Docs concurrently |
| `npm run test:all` | Unit + BDD + e2e tests |
| `npm run build:all` | Production build (API + Web) |
| `azd up` | Provision + deploy to Azure |

## Pages & Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page | Public |
| `/login` | Login form | Public |
| `/register` | Registration form | Public |
| `/profile` | User profile and logout | Authenticated |
| `/admin` | User management dashboard | Admin only |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. Please read our [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

To report vulnerabilities, see [SECURITY.md](SECURITY.md).

## License

[ISC](LICENSE)
