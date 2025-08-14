# OpenCodex API
The **Open Codex API** powers the Open Codex collaborative project management platform, connecting open-source projects with developers who want to contribute based on skills, roles, and project needs.

## Purpose and Scope
This API provides RESTful endpoints for user management, project listings, join requests, project interactions, and more.  
All endpoints return **JSON** responses and follow standard HTTP status codes.

For specific documentation [click here](https://github.com/open-codex/docs-api).

---

## Tech Stack
- **Backend:** Express.js
- **ORM**: Prisma
- **Database:** PostgreSQL
- **Auth:** JWT (JSON Web Token)
- **Deployment:** OCI (Backend), Neon (Database), Cloudflare (CDN, Storage)

---

## Features
- User registration & authentication
- Project creation & listing
- Vacancies and skill requirements
- Join requests (with approval/rejection flow)
- Project likes & favorites
- Role-based access (Admin, Moderator, Member)
- Reputation system

---

## Installation

#### Clone repository
```bash
git clone https://github.com/open-codex/opencodex-api.git
cd opencodex-api
```

#### Install dependencies
```bash
npm install
```

#### Setup environment
```bash
cp .env.example .env
```

#### Run in development
```bash
npm run dev
```

## Contributing
We welcome contributions from the community.
Please read:

- [CONTRIBUTING.md](https://github.com/Open-Codex/opencodex-api/blob/main/CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](https://github.com/Open-Codex/opencodex-api/blob/main/CODE_OF_CONDUCT.md)

## LICENSE

This project is licensed under the Apache License 2.0.