# Backend Guidelines

- Stack: NestJS, Prisma, PostgreSQL, and JWT authentication.
- Follow the existing module, controller, service, DTO, and dependency-injection patterns.
- Validate incoming data with the existing validation pipeline.
- Keep database access consistent with the current Prisma setup and generated client.
- Inspect the schema and migration history before proposing database changes.
- Never edit generated Prisma client files manually.
- Preserve response-envelope conventions and existing HTTP status behavior.
- Enforce authorization on the server; never rely only on frontend route protection.
- Check ownership and conversation membership before accessing protected messages or conversations.
- Avoid leaking internal errors, credentials, or sensitive user data.
- Run relevant tests and verify the appropriate Prisma and TypeScript commands before reporting completion.
