#!/bin/sh
ORIGIN_COMMIT=`cat fluxex`
export ORIGIN_COMMIT
echo Original commit is https://github.com/zordius/fluxex/tree/${ORIGIN_COMMIT} ...

# Setup git
git config --global user.name "Travis-CI"
git config --global user.email "zordius@yahoo-inc.com"

# Do example tests
npm test

# Add browser test badge
git add .
git commit -m "Auto commit browser test results for zordius/fluxex@${ORIGIN_COMMIT} [ci skip]"
git push "https://${GHTK}@github.com/zordius/fluxex-examples.git" HEAD:${TRAVIS_BRANCH} > /dev/null 2>&1
