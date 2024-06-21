# Contributing Guidelines

Thank you for considering contributing to our project! We welcome contributions from everyone, whether you're fixing a bug, implementing a new feature, or suggesting improvements.

Before you start contributing, please take a moment to review the following guidelines.

## Code of Conduct

Please review our [Code of Conduct](CODE_OF_CONDUCT.md) to understand the standards of behavior expected in our community.

## Getting Started

1. Fork the repository.
2. Clone the forked repository to your local machine:

   ```bash
   git clone https://github.com/Anoopoo7/express-graphql-server-template.git
3. Initialize DB by scripts

    ```bash
    cd database
    sh dbstart.sh
4. Do not close the terminal. tak a new terminal and run below command to perform migraions.

    ```bash
    cd database
    sh migrate.sh
4. Then your DB will be ready to start. Now you can start the server
    ```bash
    npm run dev
5. Create a new branch for your contribution
    ```bash
    git checkout -b feature/your-feature-name
6. After development chek eslint check by
    ```bash
    npm run lint
7. Once everything seems fine, open a pull request (PR) against the main branch of the original repository.
    ```bash
    git push origin feature/your-feature-name
## Code Style
Follow the existing code style and conventions used in the project. Ensure that your code is clean, readable, and well-documented.

## Testing
If applicable, include tests for your changes. Make sure that all existing tests pass and write new tests to cover your changes.

## Documentation
Update the README.md or other relevant documentation if your changes affect the project's usage or configuration.

## Review Process
All pull requests will be reviewed by maintainers. We may provide feedback or request changes to your code. Please be responsive to comments and address any requested changes promptly.

## License
By contributing to this project, you agree to license your contributions under the terms of the LICENSE file.

## Contact
If you have any questions or need further assistance, feel free to reach out to us via [Email](mailto:anoopsunitha007@gmail.com) or create an issue in the repository.

We appreciate your contributions to our project!