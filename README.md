# MyEvents

## Description

This is a NestJS application to manage events.

## Getting started

```bash
# Check node version >= 20
$ node --version

# Install PNPM
$ npm install -g pnpm

# Install dependencies
$ pnpm install

# Start the application in development mode
$ nx serve apps/backend
```

## Useful commands

```bash
# View the dependencies graph
$ nx graph

# Check all the source code : lint, test, test coverage, build
$ pnpm install && nx reset && nx run-many -t lint,test:coverage,build --verbose

# Check the Docker image
$ nx reset && clear && nx docker:build apps/backend && clear && nx docker:start apps/backend --batch
$ docker rm -rf backend
```
