#!/bin/bash

APP_NAME="platform-changelog"
COMPONENT_NAME="platform-changelog-ui"
IMAGE="quay.io/cloudservices/platform-changelog-ui"

# TODO: lint the project

# create a 'dummy' result file so Jenkins will not fail
mkdir -p $WORKSPACE/artifacts
cat << EOF > $WORKSPACE/artifacts/junit-dummy.xml
<testsuite tests="1">
    <testcase classname="dummy" name="dummytest"/>
</testsuite>
EOF