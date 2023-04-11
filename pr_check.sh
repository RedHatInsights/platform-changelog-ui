#!/bin/bash

APP_NAME="platform-changelog"
COMPONENT_NAME="platform-changelog-ui"
IMAGE="quay.io/cloudservices/platform-changelog-ui"

#TODO: Add a linter

# create a 'dummy' result file so Jenkins will not fail
create_dummy_junit_report() {

    mkdir -p "${WORKSPACE}/artifacts"

    cat << EOF > "${WORKSPACE}/artifacts/junit-dummy.xml"
<?xml version = "1.0" encoding = "UTF-8"?>
<testsuite tests="1">
    <testcase classname="dummy" name="dummytest"/>
</testsuite>
EOF
}

if . ./build_deploy.sh; then
    echo "Build image succeeded"
else
    echo "Build image failed"
    exit 1
fi

create_dummy_junit_report