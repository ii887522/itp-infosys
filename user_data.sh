# Either add "sudo" before all commands or use "sudo su" first
# Amazon Linux 2023

#!/bin/bash
dnf install git -y
git clone https://github.com/ii887522/itp-infosys.git
cd itp-infosys
npm install
npx quasar build
dnf install python-pip -y
pip3 install -r requirements.txt
python3 server/app.py
