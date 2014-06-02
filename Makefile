DIR = test/expected
SRC = test/fixtures
COMPONENT-BUILD = ../../node_modules/component/bin/component-build

expected: clean expected-dev expected-prod standalone norequire

expected-dev:
	cd $(SRC); $(COMPONENT-BUILD) -o $(DIR) -n dev --dev -o ../expected/dev

expected-prod:
	cd $(SRC); $(COMPONENT-BUILD) -o $(DIR) -n prod -o ../expected/prod

standalone:
	cd $(SRC); $(COMPONENT-BUILD) -o $(DIR) -n standalone -s $$ -o ../expected/standalone

norequire:
	cd $(SRC); $(COMPONENT-BUILD) -o $(DIR) -n norequire -R -o ../expected/norequire

clean:
	rm -fr $(DIR)

.PHONY: expected
