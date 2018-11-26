## Pre School [Svelte version 3 rfc-1]

A preschool application built with `svelte` as a learning tool.

### Build

To setup this project you will need Svelte 3 which is currently in development:

```sh
git clone https://github.com/sveltejs/svelte
cd svelte
git checkout rfc-1
```

Now that we have the project locally and the correct branch checked out, lets build and create a link so that the `rollup-plugin-svelte` and this project can have access to this version of svelte.

```sh
yarn
yarn build
yarn link
```

Next, clone the  `rollup-plugin-svelte` repository

```sh
git clone https://github.com/rollup/rollup-plugin-svelte
cd rollup-plugin-svelte
git checkout svelte-3
yarn link svelte
yarn
yarn build
yarn link 
```

Now clone this project and run the following commands:

```sh
yarn link rollup-plugin-svelte
yarn link svelte
yarn
yarn dev
```

To build application run:

`yarn build`
