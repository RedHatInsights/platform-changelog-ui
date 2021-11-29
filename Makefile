init:
	pipenv shell



run_migrations:
	SQLALCHEMY_ENGINE_LOG_LEVEL=INFO flask db migrate


upgrade_db:
	SQLALCHEMY_ENGINE_LOG_LEVEL=INFO flask db upgrade


run_web:
	./run.sh
