#!/bin/bash
PORT=3004
lsof -ti:$PORT | xargs kill -9 2>/dev/null
sleep 1
PORT=$PORT npx next@16.2.9 dev --port $PORT
