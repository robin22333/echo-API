test:
	./node_modules/.bin/mocha

install:
	npm install

run:
	node app.js

.PHONY: install test run
