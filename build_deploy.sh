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

docker login -u="$QUAY_USER" -p="$QUAY_TOKEN" quay.io

docker build -t "${UI_IMAGE}:${IMAGE_TAG}" ui
docker push "${UI_IMAGE}:${IMAGE_TAG}"