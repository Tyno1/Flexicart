#!/bin/bash

# Ensure the environment variable BACKEND_URL is set
if [ -z "$BACKEND_URL" ]; then
  echo "Error: BACKEND_URL environment variable is not set."
  exit 1
fi

# Ping the server using the BACKEND_URL environment variable
curl -I $BACKEND_URL

# Optional: log the ping attempt
echo "$(date): Pinged $BACKEND_URL" >> /var/log/server_alive.log
