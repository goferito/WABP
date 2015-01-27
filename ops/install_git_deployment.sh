#!/bin/bash

R_PATH=$(echo $0 | sed 's/[^\/]*$//')
INSTALL_FILE="$R_PATH""files/remote_install_git_deployment.sh"

function exit_error {
  echo ERROR $1
  echo "Usage: install_git_deployment <SSH_HOST> <PROJECT NAME> <PORT>"
  exit 1
}
[ -z $1 ] && exit_error "No ssh host provided."
[ -z $2 ] && exit_error "No project name provided"
[ -z $3 ] && exit_error "No service port provided"

ssh -t $1 "PROJECT=$2;PORT=$3;$(cat $INSTALL_FILE)"

if [ $? -eq 0 ]; then
  echo "Secrets are ignored by the repository."
  echo "You need to copy them manually with:"
  echo "   scp ${R_PATH}../secrets.js $1:$2"
  echo
  read -p "Do you want to execute this now? [Y/n] " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    scp ${R_PATH}../secrets.js $1:$2
  fi
  echo
  echo "Then you should be able to deploy with:"
  echo "   git push server master"
  echo
fi

