import os
from pathlib import Path
from api.logging import get_logger

from app_common_python import isClowderEnabled

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SSL_VERIFY_FULL = "verify-full"

    def clowder_config(self):
        import app_common_python

        cfg = app_common_python.LoadedConfig

        # DB Configuration
        self._db_user = cfg.database.username
        self._db_password = cfg.database.password
        self._db_host = cfg.database.hostname
        self._db_port = cfg.database.port
        self._db_name = cfg.database.name
        if cfg.database.rdsCa:
            self._db_ssl_cert = cfg.rds_ca()

        # Metrics Configuration
        self.metrics_port = cfg.metricsPort
        self.metrics_path = cfg.metricsPath

    def non_clowder_config(self):

        # DB Configuration
        self._db_user = os.getenv("DB_USER", "postgres")
        self._db_password = os.getenv("DB_PASS", "postgres")
        self._db_host = os.getenv("DB_HOST", "localhost")
        self._db_port = os.getenv("DB_PORT", 5432)
        self._db_name = os.getenv("DB_NAME", "postgres")
        self._db_ssl_cert = os.getenv("DB_SSL_CERT", "")

        # Metrics Configuration
        self.metrics_port = 9126
        self.metrics_path = "/metrics"

    def __init__(self):
        self.logger = get_logger(__name__)

        if isClowderEnabled():
            self.clowder_config()
        else:
            self.non_clowder_config()

    @property
    def SERVICE_CONFIG(self):
        self.service_config = Path(__file__).parent / os.getenv("SERVICE_CONFIG", "../services.yml")
        return self.service_config

    @property
    def DATABASE_URI(self):
        if os.getenv("DATABASE_URL"):
            self.db_uri = os.getenv("DATABASE_URL")
        else:
            self._db_ssl_mode = os.getenv("DB_SSL_MODE", "")
            self.db_uri = self._build_db_uri(self._db_ssl_mode)
        return self.db_uri

    @property
    def TESTING(self):
        return os.getenv("TESTING", "")

    @property
    def GITHUB_SECRET(self):
        return os.getenv("GITHUB_SECRET", "")

    @property
    def GITLAB_SECRET(self):
        return os.getenv("GITLAB_SECRET", "")

    @property
    def DB_TRACK_MODIFICATIONS(self):
        return os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS", False)

    def _build_db_uri(self, ssl_mode, hide_password=False):
        db_user = self._db_user
        db_password = self._db_password

        if hide_password:
            db_user = "xxxx"
            db_password = "xxxx"

        db_uri = f"postgresql://{db_user}:{db_password}@{self._db_host}:{self._db_port}/{self._db_name}"
        if ssl_mode == self.SSL_VERIFY_FULL:
            db_uri += f"?sslmode={self._db_ssl_mode}&sslrootcert={self._db_ssl_cert}"
        return db_uri
