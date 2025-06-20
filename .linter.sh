#!/bin/bash
cd /home/kavia/workspace/code-generation/fairyfinance--magicmetrics-64543-ab8d1425/fairyfinance_magicmetrics_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

