#!/bin/bash
i=0
while [[ "$i" -lt 10 ]]; do
zone=$(awk -v min=1 -v max=9 'BEGIN{srand(); print int(min+rand()*(max-min+1))}')
echo $zone
curl -H "Content-Type: application/json" -X POST -d '{"zone":"'"$zone"'","event":"enter"}' -s "http://heatmap-backend.mybluemix.net/triggers/add" -o /dev/null
((i++))
done