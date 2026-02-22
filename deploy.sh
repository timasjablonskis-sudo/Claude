#!/bin/bash
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.next' --exclude 'deploy.sh' \
  ./ hostinger:/docker/convoy-site/
echo "Convoy deployed!"
