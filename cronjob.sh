#!/bin/bash
source venv/bin/activate

count=0;
until python scrape.py; do
  sleep 5
  if [[ "$count" -gt 20 ]]; then
    echo "break";
    break
  fi
  count=$((count+1))
done