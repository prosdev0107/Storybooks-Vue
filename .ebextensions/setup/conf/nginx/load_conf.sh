
# We have a specificity here :
# We use an Elastic Load Balancer only in production environment
# So we need a nginx with SSL conf only with staging environment

if [ "$SYMFONY_ENV" = "prod" ]
then
    cp -f .ebextensions/setup/conf/nginx/nginx.conf /etc/nginx/nginx.conf
else
    cp -f .ebextensions/setup/conf/nginx/nginx-ssl.conf /etc/nginx/nginx.conf
fi
