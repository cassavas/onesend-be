#!/bin/bash

LOCAL_DIR='apps/'
ADDRESS="54.169.62.150"
USER="ubuntu"
SOURCE_DIR='www/api.onesend.vn/apps'
TARGET_DIR='www/api.onesend.vn'

GREEN="\033[0;32m"
RED="\033[0;31m"
RESET="\033[0m"



rsync -zaP -a  ${LOCAL_DIR} ${USER}@${ADDRESS}:${SOURCE_DIR}
rsync -zaP  package.json ${USER}@${ADDRESS}:${TARGET_DIR}
rsync -zaP  .env ${USER}@${ADDRESS}:${TARGET_DIR}
rsync -zaP  tsconfig.json ${USER}@${ADDRESS}:${TARGET_DIR}

# https://bun.sh/guides/ecosystem/systemd
ssh ${USER}@${ADDRESS} 'bash -s' <<'ENDSSH'
  cd www/api.onesend.vn
  echo -e '\033[0;32mBuilding... \033[0m'

  /home/ubuntu/.bun/bin/bun run build:prod

  echo -e '\033[0;32mInstalling dependency... \033[0m'

  /home/ubuntu/.bun/bin/bun i

  echo -e '\033[0;32mRestarting server...'
  sudo systemctl restart onesend.service
  sudo systemctl status onesend.service

ENDSSH


