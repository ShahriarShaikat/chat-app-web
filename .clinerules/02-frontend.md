# Frontend Guidelines

- Stack: React, Vite, TypeScript, Tailwind CSS, React Router, and TanStack Query.
- Inspect existing components, hooks, API clients, and type definitions before implementation.
- Reuse existing UI components and styling conventions.
- Keep server state in TanStack Query and local UI state in React state where appropriate.
- Use the existing Axios/API client and response envelope. Do not introduce a second API client.
- Follow existing authentication and access-token refresh logic.
- Define query keys consistently and ensure query functions return valid data.
- For infinite queries, inspect the API pagination contract and implement getNextPageParam correctly.
- Handle loading, empty, error, and success states.
- Avoid unnecessary dependencies and broad refactors.
- Verify TypeScript and lint checks after modifying code.
