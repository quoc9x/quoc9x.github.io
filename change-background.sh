#! /bin/bash

# Get list background images
array=($(ls assets/img/background/my-list/))

# Get tag image in index.html
var="my-list"
strHtmlTag=$(sed -n "/$var/p" index.html)

# Detect number
nameImageCurrent=$(echo "$strHtmlTag" | tr -d -c 0-9)

# Random name image
selectedexpression=${array[ $RANDOM % ${#array[@]} ]}

# Detect number
nameImageNew=$(echo "$selectedexpression" | tr -d -c 0-9)

# Random background image
while [ $nameImageNew -eq $nameImageCurrent ]
do
   selectedexpression=${array[ $RANDOM % ${#array[@]} ]}
   nameImageNew=$(echo "$selectedexpression" | tr -d -c 0-9)
done

# Get current Path and new Path
currentPath="assets/img/background/my-list/$nameImageCurrent.jpg"
newPath="assets/img/background/my-list/$nameImageNew.jpg"

#Replace background image
sed -i s+$currentPath+$newPath+ index.html




