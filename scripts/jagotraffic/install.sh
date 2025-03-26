#################################################
#          JAGO TRAFFIC (Jago Code)             #
#                                               #
#  Website       : https://traffic.jagocode.id  #
#  Documentation : https://docs.jagocode.id     #
#  Last Update   : 27 Mar 2025 03:27            #
#################################################

#!/bin/bash

set -e 
set -o pipefail 

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

if ! command -v nvm &>/dev/null; then
  echo " - NVM not found. Installing..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash >/dev/null
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

if ! command -v node &>/dev/null; then
  echo " - NodeJS is not installed. Installing latest LTS..."
  nvm install --lts >/dev/null
  nvm alias default $(nvm version-remote --lts)
  nvm use $(nvm version-remote --lts)
  echo " - NodeJS installed successfully: $(node -v)"
  exit 0
fi

CURRENT_VERSION=$(node -v | cut -d 'v' -f 2)
LATEST_VERSION=$(nvm version-remote --lts | sed 's/v//')

echo " - Current NodeJS version: $CURRENT_VERSION"
echo " - Latest LTS NodeJS version: $LATEST_VERSION"

if [ "$CURRENT_VERSION" != "$LATEST_VERSION" ]; then
  echo " - Upgrading NodeJS to LTS version $LATEST_VERSION..."
  nvm install --lts >/dev/null
  nvm alias default $(nvm version-remote --lts)
  nvm use $(nvm version-remote --lts)
  echo " - NodeJS successfully upgraded to $(node -v)"
else
  echo " - NodeJS is already up to date."
fi

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

echo -e "3. Check PM2 Installation."
if ! command -v pm2 &> /dev/null
then
    echo "PM2 is not installed. Installing PM2..."
    npm install -g pm2 cross-env
    echo "PM2 successfully installed."
else
    echo "PM2 is already installed."
fi


echo -e "4. Check Jago Traffic Installation."
if ! [ -x "$(command -v jagotraffic)" ]; then
  echo " - Jago Traffic is not installed. Installing Jago Traffic Worker. It may take a while."
  npm i -g jagotraffic >/dev/null
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