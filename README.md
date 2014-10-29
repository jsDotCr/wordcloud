# How do I get set everything up?

To set up the project those commands have to be run:
```bash
npm -g i bower gulp
npm i && bower i
```

## The different versions

There are two different versions of the project: developer and production.


### Developers, developers, developers!

To see the dev-version, please run:

```bash
gulp dev
```

And load then http://localhost:8767/src/


### Production

To see the production-ready version you'd need to run, instead:

```bash
gulp prod
```

And head to http://localhost:8767/build/



# Tests

The test server/environment can be run using the command:

```bash
gulp test
```

It's a karma runner (on top of mocha, sinon.js, chai). To execute the tests the browser should point to http://localhost:9876/ .
