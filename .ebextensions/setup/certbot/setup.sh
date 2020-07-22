
# TODO : check if installed

cd ~/

# Check if certbot utility is installed
certbotPath="/usr/local/bin/certbot-auto"
if [ ! -f "$certbotPath" ]
then

    # Get certbot
    wget https://dl.eff.org/certbot-auto
    chmod a+x certbot-auto

    # Move to executable scripts folders
    mv certbot-auto /usr/local/bin/certbot-auto
    ln -sf /usr/local/bin/certbot-auto /usr/bin/certbot-auto

    # Where certbot will generate acme challenges files
    mkdir -p /srv/www/acme-challenge/
fi

# Reinstall certbot utility to avoid some exceptions
sudo rm -rf /opt/eff.org/*
sudo /usr/local/bin/certbot-auto --debug --help # this will throws an error at first time
sudo cp -f /opt/eff.org/certbot/venv/lib64/python2.7/site-packages /opt/eff.org/certbot/venv/lib64/python2.7/site-packages.sav
sudo ln -s /opt/eff.org/certbot/venv/lib64/python2.7/dist-packages/ /opt/eff.org/certbot/venv/lib64/python2.7/site-packages
cd ~/
sudo /usr/local/bin/certbot-auto --debug --help # this time no exception

# Check if SSL cert installed
certPath="/etc/letsencrypt/live/cliprcert/privkey.pem"

if [ ! -f "$certPath" ]
then

    # Certificate is not installed !
    # Load the temporary nginx conf file (copied just before this script execution through 01_setup.config))
    cp -f .ebextensions/setup/conf/nginx/nginx-certbot-setup.conf /etc/nginx/nginx.conf
    sudo service nginx restart

    # Generate SSL certificate
    # Certbot will generate a file into /var/www/html/web/.well-known/acme-challenge
    # Then will check if file exists at https//mywebsite.com/.well-known/acme-challenge/{file_generated}
    # That's how we can automate SSL process
    sudo bash -c "certbot-auto certonly -w /srv/www/ --cert-name cliprcert --debug --non-interactive --email contact@clipr.co --agree-tos --standalone -d ${CERT_SSL_DOMAIN}  --pre-hook=\"service nginx stop\" --post-hook=\"service nginx start\" --keep-until-expiring"

    # Generate dh params for server security
    mkdir -p /etc/pki/nginx/
    openssl dhparam -out /etc/pki/nginx/dhparams.pem 2048

fi

# A cron is then setup in main .config to check for certificate renewal each month.
# It will renew certificate if less than 30 days from expiration