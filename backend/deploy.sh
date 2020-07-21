#!/bin/bash
set -xe
# push to hook
git remote add deploy "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_DIRECTORY}"
git config user.name "Travis CI"
git config user.email "johnlawsharrison+travis@gmail.com"

git push --force deploy master
