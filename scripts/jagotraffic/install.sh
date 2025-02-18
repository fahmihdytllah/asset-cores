#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status
## $1 could be empty, so we need to disable this check
#set -u # Treat unset variables as an error and exit
set -o pipefail # Cause a pipeline to return the status of the last command that exited with a non-zero status


VERSION="1.0"
OS_TYPE=$(grep -w "ID" /etc/os-release | cut -d "=" -f 2 | tr -d '"')

case "$OS_TYPE" in
ubuntu | debian | centos | almalinux) ;;
*)
    echo "This script only supports Debian-based (Ubuntu, Debian, Raspbian) or RedHat-based (CentOS, Fedora, RHEL, Oracle Linux, Rocky, AlmaLinux, Amazon Linux) operating systems for now."
    exit
    ;;
esac

echo -e "\033[0;36m"
cat << "EOF"
      _                 _____           __  __ _      
     | | __ _  __ _  __|_   _| __ __ _ / _|/ _(_) ___ 
  _  | |/ _` |/ _` |/ _ \| || '__/ _` | |_| |_| |/ __|
 | |_| | (_| | (_| | (_) | || | | (_| |  _|  _| | (__ 
  \___/ \__,_|\__, |\___/|_||_|  \__,_|_| |_| |_|\___|
              |___/                                     
EOF
echo -e "\033[0m"
echo -e "Welcome to Jago Traffic Worker Installer!"
echo -e "This script will install everything for you. Sit back and relax."

echo -e "+--------------------------------------------+"
echo    "|   Website :  https://traffic.jagocode.id   |"
echo    "|   Docs    :  https://docs.jagocode.id      |"
echo -e "+--------------------------------------------+\n"
echo -e "1. Installing required packages. "

case "$OS_TYPE" in
ubuntu | debian | raspbian)
    ;;
centos | fedora | rhel | ol | rocky | almalinux | amzn)
    ;;
*)
    echo "This script only supports Debian-based (Ubuntu, Debian, Raspbian) or RedHat-based (CentOS, Fedora, RHEL, Oracle Linux, Rocky, AlmaLinux, Amazon Linux) operating systems for now."
    exit
    ;;
esac

case "$OS_TYPE" in
ubuntu | debian | raspbian)
  apt update -y >/dev/null

  UBUNTU_VERSION=$(grep -w "VERSION_ID" /etc/os-release  | cut -d "=" -f 2 | cut -d'.' -f1 | tr -d '"')
  if [ "$OS_TYPE" = "ubuntu" ] && [ "$UBUNTU_VERSION" -ge 24 ]; then
    apt install -y git ca-certificates fonts-liberation libasound2t64 libatk1.0-0t64 libatk-bridge2.0-0t64 libcairo2 libcups2t64 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc-s1 libglib2.0-0t64 libgtk-3-0t64 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils >/dev/null
  else
    apt install -y git ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils >/dev/null
  fi
  ;;
centos | almalinux)
  yum update -y >/dev/null
  yum update -y install git alsa-lib.x86_64 atk.x86_64 cups-libs.x86_64 gtk3.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXrandr.x86_64 libXScrnSaver.x86_64 libXtst.x86_64 pango.x86_64 xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-fonts-cyrillic xorg-x11-fonts-misc xorg-x11-fonts-Type1 xorg-x11-utils >/dev/null
  yum update -y nss >/dev/null
  ;;
*)
    echo "###############################################################################"
    echo "WARNING: Could not detect and install OpenSSH server - this does not mean that it is not installed or not running, just that we could not detect it."
    echo -e "Please make sure it is installed and running, otherwise Publify cannot connect to the host system. \n"
    echo "###############################################################################"
    exit 1
    ;;
esac

echo -e "2. Check NodeJS Installation."
if ! [ -x "$(command -v node)" ]; then
  echo " - NodeJS is not installed. Installing NodeJS. It may take a while."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash >/dev/null
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
  
  # Source the correct profile file
  if [ -f "$HOME/.zshrc" ]; then
    source ~/.zshrc
  elif [ -f "$HOME/.bash_profile" ]; then
    source ~/.bash_profile
  elif [ -f "$HOME/.profile" ]; then
    source ~/.profile
  else
    source ~/.bashrc
  fi

  nvm install 20 --lts >/dev/null
  echo " - NodeJS installed successfully."
else
  NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
  if [ "$NODE_VERSION" -lt 18 ]; then
    echo " - NodeJS version is below 18. Upgrading to latest LTS version."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash >/dev/null
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
    # Source the correct profile file
    if [ -f "$HOME/.zshrc" ]; then
      source ~/.zshrc
    elif [ -f "$HOME/.bash_profile" ]; then
      source ~/.bash_profile
    elif [ -f "$HOME/.profile" ]; then
      source ~/.profile
    else
      source ~/.bashrc
    fi
    nvm install 20 --lts >/dev/null
    echo " - NodeJS upgraded successfully."
  else
    echo " - NodeJS version $NODE_VERSION is compatible."
  fi
fi

echo -e "3. Check PM2 Installation."
if ! command -v pm2 &> /dev/null
then
    echo "PM2 is not installed. Installing PM2..."
    npm install -g pm2
    echo "PM2 successfully installed."
else
    echo "PM2 is already installed."
fi


echo -e "4. Check Jago Traffic Installation."
if ! [ -x "$(command -v jagotraffic)" ]; then
  echo " - Jago Traffic is not installed. Installing Jago Traffic Worker. It may take a while."
  npm i --global jagotraffic >/dev/null
  echo " - Jago Traffic installed successfully."
else
  echo " - Jago Traffic is installed..."
fi

echo -e "\033[0;35m
   ____                            _         _       _   _                 _
  / ___|___  _ __   __ _ _ __ __ _| |_ _   _| | __ _| |_(_) ___  _ __  ___| |
 | |   / _ \| '_ \ / _\` | '__/ _\` | __| | | | |/ _\` | __| |/ _ \| '_ \/ __| |
 | |__| (_) | | | | (_| | | | (_| | |_| |_| | | (_| | |_| | (_) | | | \__ \_|
  \____\___/|_| |_|\__, |_|  \__,_|\__|\__,_|_|\__,_|\__|_|\___/|_| |_|___(_)
                   |___/
\033[0m"
echo -e "\nYour instance is ready to use."
echo -e "\nYou need to restart your terminal to apply the changes."
echo -e "Please visit https://docs.jagocode.id/docs/jago-traffic/how-to-use/run-worker to get started.\n"