#!/bin/bash
# Verify deployment - Check what files exist on production

echo "Checking production site structure..."
echo ""

echo "Testing if assets folder is accessible:"
curl -I https://africanbraindatanetwork.com/assets/ 2>&1 | head -5
echo ""

echo "Testing specific image files:"
for img in "abdn_logo.png" "lagos_group_picture.jpeg" "moses.png" "Faculty/Azeezat.jpg" "Faculty/Horia.jpeg"; do
  echo -n "  /assets/$img: "
  status=$(curl -s -o /dev/null -w "%{http_code}" "https://africanbraindatanetwork.com/assets/$img")
  if [ "$status" = "200" ]; then
    echo "✓ Found"
  else
    echo "✗ Not found (HTTP $status)"
  fi
done

echo ""
echo "Checking case sensitivity:"
echo -n "  /assets/abdn_logo.png: "
curl -s -o /dev/null -w "%{http_code}" "https://africanbraindatanetwork.com/assets/abdn_logo.png"
echo ""
echo -n "  /Assets/abdn_logo.png: "
curl -s -o /dev/null -w "%{http_code}" "https://africanbraindatanetwork.com/Assets/abdn_logo.png"
echo ""
