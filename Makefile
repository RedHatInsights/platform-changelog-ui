init:

	pipenv shell

test:

	SERVICE_CONFIG="../tests/services.yml" TESTING="True" pipenv run pytest -v -s ./tests
	pipenv run flake8


