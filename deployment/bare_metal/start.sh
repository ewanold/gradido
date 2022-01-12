#!/bin/bash

# wait for node to properly unref the process(?)
sleep 15

# Find current directory & configure paths
SCRIPT_PATH=$(realpath $0)
SCRIPT_DIR=$(dirname $SCRIPT_PATH)
LOCK_FILE=$SCRIPT_DIR/update.lock
UPDATE_HTML=$SCRIPT_DIR/nginx/update-page/updating.html
PROJECT_ROOT=$SCRIPT_DIR/../../
NGINX_CONFIG_DIR=$SCRIPT_DIR/nginx/sites-available

# Load .env or .env.dist if not present
set -o allexport
#TODO
if [ -f "$SCRIPT_DIR/.env" ]; then
    source $SCRIPT_DIR/.env
else
    source $SCRIPT_DIR/.env.dist
fi
set +o allexport

# lock start
if [ -f $LOCK_FILE ] ; then
  retVal="Already building!"
  return "${retVal}" 2>/dev/null || exit "${retVal}"
fi
touch $LOCK_FILE

UPDATE_SITE_CONFIG=stage1_updating

# Create a new updating.html from the template
\cp $SCRIPT_DIR/nginx/update-page/updating.html.template $UPDATE_HTML

# configure nginx for the update-page
echo 'Configuring nginx to serve the update-page<br>' >> $UPDATE_HTML
rm /etc/nginx/sites-enabled/gradido.conf
ln -s /etc/nginx/sites-available/update-page.conf /etc/nginx/sites-enabled/
sudo /etc/init.d/nginx restart

# stop all services
echo 'Stopping all Gradido services<br>' >> $UPDATE_HTML
pm2 stop gradido-backend --no-treekill
pm2 stop gradido-frontend
pm2 stop gradido-admin

# git
BRANCH=${1:-master}
echo "Starting with git pull - branch:$BRANCH<br>" >> $UPDATE_HTML
cd $PROJECT_ROOT
git fetch origin $BRANCH
git checkout $BRANCH
git pull
export BUILD_COMMIT="$(git rev-parse HEAD)"

# Generate gradido.conf from template
echo 'Generate new gradido nginx config<br>' >> $UPDATE_HTML
case "$NGINX_SSL" in
 true) TEMPLATE_FILE="gradido.conf.ssl.template" ;;
    *) TEMPLATE_FILE="gradido.conf.template" ;;
esac
envsubst "$(env | sed -e 's/=.*//' -e 's/^/\$/g')" < $NGINX_CONFIG_DIR/$TEMPLATE_FILE > $NGINX_CONFIG_DIR/gradido.conf

# Generate update-page.conf from template
echo 'Generate new update-page nginx config<br>' >> $UPDATE_HTML
case "$NGINX_SSL" in
 true) TEMPLATE_FILE="update-page.conf.ssl.template" ;;
    *) TEMPLATE_FILE="update-page.conf.template" ;;
esac
envsubst "$(env | sed -e 's/=.*//' -e 's/^/\$/g')" < $NGINX_CONFIG_DIR/$TEMPLATE_FILE > $NGINX_CONFIG_DIR/update-page.conf

# Install & build database
echo 'Updating database<br>' >> $UPDATE_HTML
cd $PROJECT_ROOT/database
yarn install
yarn build
if [ "$DEPLOY_SEED_DATA" = "true" ]; then
  yarn dev_up
  yarn dev_reset
  yarn seed 
else
  yarn up
fi

# Install & build backend
echo 'Updating backend<br>' >> $UPDATE_HTML
cd $PROJECT_ROOT/backend
yarn install
yarn build
pm2 delete gradido-backend
pm2 start --name gradido-backend "yarn start" --no-treekill
pm2 save

# Install & build frontend
echo 'Updating frontend<br>' >> $UPDATE_HTML
cd $PROJECT_ROOT/frontend
yarn install
yarn build
pm2 delete gradido-frontend
pm2 start --name gradido-frontend "yarn start"
pm2 save

# Install & build admin
echo 'Updating admin<br>' >> $UPDATE_HTML
cd $PROJECT_ROOT/admin
yarn install
yarn build
pm2 delete gradido-admin
pm2 start --name gradido-admin "yarn start"
pm2 save

# let nginx showing gradido
echo 'Configuring nginx to serve gradido again<br>' >> $UPDATE_HTML
ln -s /etc/nginx/sites-available/gradido.conf /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/update-page.conf
sudo /etc/init.d/nginx restart

# release lock
rm $LOCK_FILE