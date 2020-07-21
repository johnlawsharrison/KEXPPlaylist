#!/bin/bash
set -xe
# rsync build artifacts to deployment dir
rsync -r --quiet --delete dist/playlist-frontend/ ${DEPLOY_USER}@${DEPLOY_HOST}:${FRONTEND_DEPLOY_DIRECTORY}
