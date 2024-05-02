echo
echo -e "\033[1;32mConfigure ...\033[0m"
sudo chown node node_modules
npm install -g npm

echo
echo -e "\033[1;32mInstall Nx 18 globally ...\033[0m"
npm install -g nx@^18

echo
echo -e "\033[1;32mInstall project dependencies ...\033[0m"
npm install

echo
echo -e "\033[1;32mInstallation is complete.\033[0m"
