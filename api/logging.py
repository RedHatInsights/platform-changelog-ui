import logging
import logging.config
import os

import logstash_formatter
import watchtower
from boto3.session import Session
from yaml import safe_load
from logging import NullHandler
from app_common_python import isClowderEnabled

DEFAULT_LOGGING_CONFIG_FILE = "logconfig.yaml"
LOGGER_NAME = "gumbaroo"


def configure_logging():
    log_config_file = os.getenv("GUMBAROO_LOGGING_CONFIG_FILE", DEFAULT_LOGGING_CONFIG_FILE)
    with open(log_config_file) as log_config_file:
        logconfig_dict = safe_load(log_config_file)

    logging.config.dictConfig(logconfig_dict)
    logger = logging.getLogger(LOGGER_NAME)
    log_level = os.getenv("LOG_LEVEL", "INFO").upper()
    logger.setLevel(log_level)

    for component in ("sqlalchemy.engine"):
        env_key = component.replace(".", "_").upper()
        level = os.getenv(f"{env_key}_LOG_LEVEL")
        if level:
            logging.getLogger(component).setLevel(level.upper())


def clowder_config():
    import app_common_python

    cfg = app_common_python.LoadedConfig

    if cfg.logging:
        cw = cfg.logging.cloudwatch
        return cw.accessKeyId, cw.secretAccessKey, cw.Region, cw.logGroup, False
    else:
        return None, None, None, None, None


def non_clowder_config():
    aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID", None)
    aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY", None)
    aws_region_name = os.getenv("AWS_REGION_NAME", None)
    aws_log_group = os.getenv("AWS_LOG_GROUP", "platform")
    create_log_group = str(os.getenv("AWS_CREATE_LOG_GROUP")).lower() == "true"
    return aws_access_key_id, aws_secret_access_key, aws_region_name, aws_log_group, create_log_group


def cloudwatch_handler():
    if isClowderEnabled():
        f = clowder_config
    else:
        f = non_clowder_config

    aws_access_key_id, aws_secret_access_key, aws_region_name, aws_log_group, create_log_group = f()

    if all((aws_access_key_id, aws_secret_access_key, aws_region_name)):
        aws_log_stream = os.getenv("AWS_LOG_STREAM", _get_hostname())
        print(f"Configuring watchtower logging (log_group={aws_log_group}, stream_name={aws_log_stream})")
        boto3_session = Session(
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key,
            region_name=aws_region_name,
        )
        return watchtower.CloudWatchLogHandler(
            boto3_session=boto3_session,
            log_group=aws_log_group,
            stream_name=aws_log_stream,
            create_log_group=create_log_group,
        )
    else:
        print("Unable to configure watchtower logging.  Please verify watchtower logging configuration!")
        return NullHandler()


def _get_hostname():
    return os.uname().nodename


def get_logger(name):
    return logging.getLogger(f"{LOGGER_NAME}.{name}")
