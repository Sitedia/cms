echo
echo -e "\033[1;32mConfigure Npm ...\033[0m"
sudo npm config set fund false
sudo npm install -g npm

echo
echo -e "\033[1;32mPrepare node_modules folder ...\033[0m"
sudo chown node node_modules

echo
echo -e "\033[1;32mInstall Nx 18 globally ...\033[0m"
npm config set fund false
npm install -g nx

echo
echo -e "\033[1;32mInstall project dependencies ...\033[0m"
npm install

echo
echo -e "\033[1;32mInstallation is complete.\033[0m"
