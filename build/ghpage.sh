#!/bin/bash
git checkout gh-pages
cp -r dist/css .
cp -r dist/js .
cp dist/index.html index.htm
git add js css index.htm
git commit -m $1
git push -u origin gh-pages
git checkout css js index.htm

git checkout master
