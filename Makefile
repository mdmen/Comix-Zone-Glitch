.PHONY: build help
.DEFAULT_GOAL := help

start: ## Start dev server
	@webpack serve --config webpack/webpack.dev.js

build: ## Create production build
	@webpack --config webpack/webpack.prod.js

eslint: ## Lint *.ts files by eslint
	@eslint . --ext .ts

tslint: ## Check code by tsc according to tsconfig.json
	@tsc --noEmit

lint: eslint tslint ## Lint typescript

help: ## Show list of commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'
