install:
	npm install

dev: infra/up
	npm run start:dev

build:
	npm run build

infra/up:
	docker-compose up -d mongo mongo-express

up: build
	docker-compose up --build -d

down:
	docker-compose down --remove-orphans

.PHONY: test
test:
	npm run test

test/updateSnapshots:
	npm run test:updateSnapshots

test/cov:
	npm run test:cov

test/e2e: infra/up
	npm run test:e2e

test/e2e/updateSnapshots: infra/up
	npm run test:e2e:updateSnapshots

format:
	npm run lint
	npm run format
