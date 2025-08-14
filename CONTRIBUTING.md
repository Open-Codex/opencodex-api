# Contributing to OpenCodex API

We welcome contributions from developers of all skill levels.  
Please follow these steps to ensure a smooth process:

## How to Contribute
1. **Fork the repository**  
   Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**
   ```bash
   git clone https://github.com/<your-username>/opencodex-api.git
   cd opencodex-api
   ```

3. **Create a branch**
    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make changes**
    ```markdown
    Follow the coding style and conventions used in the project.
    ```

5. **Commit changes**

    Use Conventional Commit style for clear commit history:
    ```markdown
    type(scope): short description
    ```
    Scope should reflect the module or feature being modified.

    Common types and examples:
    ```markdown
    - feat(auth): add JWT login endpoint
    - fix(join-requests): validate duplicate requests
    - refactor(projects): simplify query logic
    - docs(api): update README and endpoint examples
    - chore(deps): update Prisma to latest version
    - test(auth): add unit tests for login route
    ```

6. **Push to your fork**
    ```bash
    git push origin feature/your-feature-name
    ```
7. **Create a Pull Request**
    ```markdown
    Open a PR to the main branch of the original repository.
    Use the same Conventional Commit style in the PR title.
    Provide a clear description of your changes and motivation.
    ```

## Reporting Issues

```markdown
Use the GitHub Issues tab.
Provide detailed steps to reproduce the bug.
```

## Suggesting Features

```markdown
Open an issue and label it enhancement.
Describe why the feature is needed and possible use cases.
```