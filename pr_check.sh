#!/bin/bash

APP_NAME="platform-changelog"
COMPONENT_NAME="platform-changelog-ui"
IMAGE="quay.io/cloudservices/platform-changelog-ui"

# lint the project. We need more but this is all we have for now
npm install
npm run lint

if [ $? -eq 0 ]; then
    echo "Linting Success"
else
    exit 1
fi

# create a 'dummy' result file so Jenkins will not fail
mkdir -p $WORKSPACE/artifacts
cat << EOF > $WORKSPACE/artifacts/junit-dummy.xml
<testsuite tests="1">
    <testcase classname="dummy" name="dummytest"/>
</testsuite>
EOF