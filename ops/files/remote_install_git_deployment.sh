#!/bin/bash

#TODO install node if not there
#TODO check that $PORT is not yet used

which gulp >> /dev/null
if [ $? -ne 0 ]; then
  echo "Installing gulp..."
  sudo npm i -g gulp
fi

echo "Creating folder for the repository..."
mkdir repo_$PROJECT || exit 1

echo "Initialising bare repository..."
cd repo_$PROJECT
git init --bare

echo "Creating post-receive script..."
echo "#!/bin/sh" > hooks/post-receive
echo "GIT_WORK_TREE=/home/$(whoami)/$PROJECT" >> hooks/post-receive
echo "export GIT_WORK_TREE" >> hooks/post-receive
echo "echo 'Updating to last version...'" >> hooks/post-receive
echo "git checkout -f" >> hooks/post-receive
echo  >> hooks/post-receive
echo "echo 'Installing dependencies...'" >> hooks/post-receive
echo 'cd $GIT_WORK_TREE' >> hooks/post-receive
echo 'npm install' >> hooks/post-receive
echo 'gulp deploy' >> hooks/post-receive
echo  >> hooks/post-receive
echo "sudo stop $PROJECT" >> hooks/post-receive
echo "sudo start $PROJECT" >> hooks/post-receive

echo "Giving post-receive execution permissions..."
chmod u+x hooks/post-receive

echo "Creating folder to host code..."
cd ~
mkdir $PROJECT || exit 1

echo "Creating /etc/init/$PROJECT.conf ..."
echo "#!upstart

start on (local-filesystems and net-device-up IFACE=eth0)
stop on shutdown

respawn
respawn limit 2 10

script
  sudo -u www-data sh -c 'PORT=$PORT NODE_ENV=production /usr/bin/node /home/$(whoami)/$PROJECT'
end script

pre-start script
  date -u +%Y-%m-%dT%T.%3NZ
  echo 'Started $PROJECT'
end script

" | sudo tee /etc/init/${PROJECT}.conf >> /dev/null

echo "Add permission on sudoers to restart service without password..."
echo "%$(whoami) ALL=(ALL) NOPASSWD: /sbin/start $PROJECT, /sbin/stop $PROJECT" | sudo tee /etc/sudoers.d/$PROJECT >> /dev/null
sudo chmod 0440 /etc/sudoers.d/$PROJECT

