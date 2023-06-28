#!/bin/bash

set -exv

UI_IMAGE="quay.io/cloudservices/platform-changelog-ui"
IMAGE_TAG=$(git rev-parse --short=7 HEAD)

if [[ -z "$QUAY_USER" || -z "$QUAY_TOKEN" ]]; then
    echo "QUAY_USER and QUAY_TOKEN must be set"
    exit 1
fi

if [[ -z "$RH_REGISTRY_USER" || -z "$RH_REGISTRY_TOKEN" ]]; then
    echo "RH_REGISTRY_USER and RH_REGISTRY_TOKEN  must be set"
    exit 1
fi

AUTH_CONF_DIR="$(pwd)/.docker"
mkdir -p $AUTH_CONF_DIR

docker --config="$AUTH_CONF_DIR" login -u="$QUAY_USER" -p="$QUAY_TOKEN" quay.io
docker --config="$AUTH_CONF_DIR" login -u="$RH_REGISTRY_USER" -p="$RH_REGISTRY_TOKEN" registry.redhat.io
docker --config="$AUTH_CONF_DIR" build -t "${UI_IMAGE}:${IMAGE_TAG}" .
docker --config="$AUTH_CONF_DIR" push "${UI_IMAGE}:${IMAGE_TAG}"
docker --config="$AUTH_CONF_DIR" tag "${UI_IMAGE}:${IMAGE_TAG}" "${UI_IMAGE}:qa"
docker --config="$AUTH_CONF_DIR" push "${UI_IMAGE}:qa"
docker --config="$AUTH_CONF_DIR" tag "${UI_IMAGE}:${IMAGE_TAG}" "${UI_IMAGE}:latest"
docker --config="$AUTH_CONF_DIR" push "${UI_IMAGE}:latest"
