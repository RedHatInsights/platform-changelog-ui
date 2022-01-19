#!/bin/bash

set -exv

UI_IMAGE="quay.io/cloudservices/platform-changelog-ui"
API_IMAGE="quay.io/cloudservices/platform-changelog-api"
IMAGE_TAG=$(git rev-parse --short=7 HEAD)

if [[ -z "$QUAY_USER" || -z "$QUAY_TOKEN" ]]; then
    echo "QUAY_USER and QUAY_TOKEN must be set"
    exit 1
fi

if [[ -z "$RH_REGISTRY_USER" || -z "$RH_REGISTRY_TOKEN" ]]; then
    echo "RH_REGISTRY_USER and RH_REGISTRY_TOKEN  must be set"
    exit 1
fi

AUTH_CONF_DIR="$(pwd)/.podman"
mkdir -p $AUTH_CONF_DIR

podman login -u="$QUAY_USER" -p="$QUAY_TOKEN" quay.io

podman build -t "${UI_IMAGE}:${IMAGE_TAG}" ui
podman push "${UI_IMAGE}:${IMAGE_TAG}"

podman build -t "${API_IMAGE}:${IMAGE_TAG}" api
podman push "${API_IMAGE}:${IMAGE_TAG}"
