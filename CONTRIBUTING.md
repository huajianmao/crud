# Contributing to ``

As the creators and maintainers of this project, we want to ensure that `crud` lives and continues to grow and evolve. We would like to encourage everyone to help and support this library by contributing.

## Code contributions

Here is a quick guide to doing code contributions to the library.

1. Fork and clone the repo to your local machine `git clone https://github.com/YOUR_GITHUB_USERNAME/crud.git`

2. Create a new branch from `master` with a meaningful name for a new feature or an issue you want to work on: `git checkout -b your-meaningful-branch-name`

3. Install packages by running:

   > yarn

4. If you've added a code that should be tested, ensure the test suite still passes.

   > yarn test && yarn tsd

5. Try to write some unit tests to cover as much of your code as possible.

6. Ensure your code lints without errors.

   > yarn lint

7. Ensure the automation suite passes.

8. Ensure build passes.

   > yarn build

9. Push your branch: `git push -u origin your-meaningful-branch-name`

10. Submit a pull request to the upstream react-hook-form repository.

11. Choose a descriptive title and describe your changes briefly.

## Coding style

Please follow the coding style of the project. Crud uses eslint and prettier. If possible, enable their respective plugins in your editor to get real-time feedback. The linting can be run manually with the following command: `yarn lint:fix` and `yarn prettier:fix`

## License

By contributing your code to the crud GitHub repository, you agree to license your contribution under the MIT license.

### Contributors

Thank you to all the people who have already contributed to Crud!

<img src="https://opencollective.com/crud/contributors.svg?width=950" />
