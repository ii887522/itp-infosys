# Either add "sudo" before all commands or use "sudo su" first
# Amazon Linux 2023

#!/bin/bash
dnf install git nodejs python-pip -y
echo "github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl" > .ssh/known_hosts
aws s3 cp s3://itp-infosys-key-bucket/id_ed25519 .ssh/id_ed25519
chmod 400 .ssh/id_ed25519
git clone git@github.com:ii887522/itp-infosys.git
cd itp-infosys
npm install
npx quasar build
pip3 install -r requirements.txt
python3 server/app.py
