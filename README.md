# WABP
Boilerplate for Express 4 Web Apps. Includes a very basic auth,
Mongo connection, and some examples of models, controllers, views,
layout based on bootstrap, and more stuff that I'll write here when
not in a fucking rush.

### Use
1. Clone the repository
2. Create the secrets.js from the example
3. Remove the .git folder, and init a new repository for the new project
4. Change the package.json repository info
5. Install dependencies:

  `npm install`

6. Run gulp tasks:

  `gulp`

7. Check out that it works on the browser
8. Prepare the server to deploy with a git push:

  `bash ops/install_git_deployment.sh <SSH HOST> <PROJECT NAME> <SERVICE PORT>`

9. Change everything else

### TODO
* Make a proper working example with the pizzas and the requests
* Add support for tests
* Socketio example
* React example
* Do the TODOs in the code
