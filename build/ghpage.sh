#!/bin/bash
git checkout gh-pages
cp -r dist/css .
cp -r dist/js .
cp dist/index.html index.htm
git add js css index.htm
git commit -m "Update Doc"
git push -u origin gh-pages
rm -fr css js index.htm

git checkout master
