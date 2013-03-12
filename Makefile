DIR = test/expected
SRC = test/fixtures/src/

expected: clean expected-dev expected-prod standalone

expected-dev:
	cd $(SRC); component build -o $(DIR) -n dev --dev -o ../../expected/dev

expected-prod:
	cd $(SRC); component build -o $(DIR) -n prod -o ../../expected/prod

standalone:
	cd $(SRC); component build -o $(DIR) -n standalone -s $$ -o ../../expected/standalone

clean:
	rm -fr $(DIR)

.PHONY: expected