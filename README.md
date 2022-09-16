
# Example App for Agamim E2E Testing Workshop

This app is a simple todo app. Once logged in,
users can add new todos, mark todos as complete or ongoing and delete todos.

Once dependencies are installed, the app can be launched in production mode using the `serve` script, or in dev mode using the `dev` script.
For writing tests, it's recommended to launch the app in *production mode*.

## Logging in

To access the app, the user needs to log in.
The appropriate credentials are:

- Username: `agamim-user`
- Password: `shir-ganon`

To log in programmatically, the user needs to set a valid token in localstorage, with the `token` key.
This token can be acquired from the credentials using the `login()` method in [auth.ts](/src/auth.ts).

Before writing tests, launch the app and take a moment to get a feel for it.

## Tests to write

This workshop consists of setting up a Cypress environment for testing this app, then writing tests for it.
The tests you'll be writing are:

- [ ] (1) **Log in**
- [ ] (2) **Main view smoke test** - check that the header is present and contains the right text
- [ ] (3) **Check that the Empty view is present**
- [ ] (4) **Add three todos** - and check that they're all viewed
- [ ] (5) **Mark a todo as completed** - and check that it's in the completed list
- [ ] (7) **Mark a todo as ongoing** - and check that it's back in the ongoing list
- [ ] (8) **Delete a todo** - and check that it's no longer there
- [ ] (9) **Clear all todos** - and check that the empty view is shown
- [ ] (10) **Log Out** - and check that you're redirected back to the login page

## Testing the tests

In addition to the default `main` branch, this repo contains two branches - `broken-auth` and `broken-tests`. If written properly, authentication should not work on the first branch (either programmatic or through the UI), breaking all tests, and all tests *except* for the login one should be fail on the second.

Use these branches to test your tests:

After all tests are implemented successfully, switch over to those branches (if you're in `serve` mode, don't forget to restart the app!), and make sure the tests fail there.

