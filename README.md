# chunk-norris

The chunk norris app is a fullstack app. the backend part uses Python Flask and the frontend part uses Vue3.

## FRONTEND

Requirements: node 14

The Overview.vue is the main component. it's where we fetch the category and joke data.
All the api calls are centralized in this view. From there, the data is dispatch accross the differents components / sub components.

The sub components are not tied to any api logic, which make them easily reusable or integrable in a component library.

Useful commands:

```
yarn install // install the packages
yarn serve // run the dev server
yarn test // run the tests
```

## BACKEND

The core logic happens in the services.py. From there, I fetch the data from the chuck norris generator and format it the way I need it for the frontend client.

Here I make sure to always get a payload of 10 jokes in the response.

Requirements: python3, poetry

First you need to install the packages using poetry

```
poetry install
```

Then launch the development server

```
./manage.sh run
```

Make sure the app runs on http://127.0.0.1:5000/

## API SPECS

Basically two calls are possible

| Method | Path                                    | README                                              |
| ------ | --------------------------------------- | --------------------------------------------------- |
| GET    | /random?categories=cat1&categories=cat2 | get 10 random jokes with category filter (optional) |
| GET    | /categories                             | get available categories                            |
