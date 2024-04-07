# IT Landscape

An overview of the IT projects of the Swiss Guide and Scout Movement.

## Technology

This project is made with [Tina CMS](https://tina.io/) and with [astro](https://astro.build/), with [tailwind](https://tailwindcss.com/).

## Local Development

Install the project's dependencies:

```
yarn install
```

Run the project locally:

```
yarn dev
```

Open [http://localhost:4321/it-landscape/](http://localhost:4321/it-landscape/) with your browser to see the result.


Admin URL: [http://localhost:4001/it-landscape/admin/index.html#/collections/service/~](http://localhost:4001/it-landscape/admin/index.html#/collections/service/~)

if it starts reloading the page over and over again, open the menu and select a service, then it should stop.

### Building the Starter Locally (Using the hosted content API)

Replace the `.env.example`, with `.env`

```
NEXT_PUBLIC_TINA_CLIENT_ID=<get this from the project you create at app.tina.io>
TINA_TOKEN=<get this from the project you create at app.tina.io>
NEXT_PUBLIC_TINA_BRANCH=<Specify the branch with Tina configured>
```

Build the project:

```bash
yarn run tinacms build
```

#### Tina CMS App

To configure the Tina CMS and for troubleshooting with the build (sometimes it needs a reindex of the branch that is configured) go to the [Tina App](https://app.tina.io/projects/1f372132-ef1c-4d76-914d-8f9e92d12b21/overview). Here you can also find or generate new tokens for local development. We are on a free plan so only two users are allowed. At the moment it's Olipo and Folletta that have  a user.