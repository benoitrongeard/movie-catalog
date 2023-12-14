# MovieCatalog

![Vercel](https://vercelbadge.vercel.app/api/benoits-projects-d03429db/movie-catalog) ![app](https://movie-catalog-flax.vercel.app/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.6

## Work with vercel

Install vercel :

```bash
npm i -g vercel
```

Configure vercel :

```bash
vercel login
```

Adding env variable inside vercel `TMDB_API_URL`, `PRODUCTION`, `TMDB_API_TOKEN`;

## Serverless function

Serverless function are located inside `api` folder. They are deployed on vercel and can be called with the following url : `https://movie-catalog.vercel.app/api/{route}}`. {route} is the name of the api behind TMDB api.
This function generate a proxy to TMDB api, and adding the TMDB token in headers to secure the usage of the token.

## Development server

Run `vercel dev` for a dev server. Navigate to `http://localhost:3000/` and `http://localhost:3000/api/{route}`. The application and vercel will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Preview build

Run `vercel deploy` and go to the url provided by vercel.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
