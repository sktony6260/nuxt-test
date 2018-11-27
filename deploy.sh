APPLICATION_PATH=/var/wwwroot/nuxt-test/
BRANCH_NAME=master
echo 'switch folder to application'
cd ${APPLICATION_PATH}
git fetch --all
git checkout ${BRANCH_NAME}
git reset --hard
git pull origin master
echo 'install node_module'
npm i
npm run build
pm2 delete nuxt-test
pm2 start ecosystem.config.js

