#!/bin/sh

if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
  echo "This is a PR, skip deploy."
  exit 0
fi

echo "DEBUG ENV: ${TRAVIS_JOB_NUMBER} ${TRAVIS_BUILD_NUMBER} ..."

if [ "${TRAVIS_BUILD_NUMBER}.2" != "${TRAVIS_JOB_NUMBER}" ]; then
  echo "Only run extra tasks 1 time 1 commit... quit."
  exit 0
fi

if [ "${TRAVIS_REPO_SLUG}" != "zordius/fluxex" ]; then
  echo "Skip deploy because this is a fork... quit."
  exit 0
fi

# push coverage to codeclimate
npm install codeclimate-test-reporter
node_ node_modules/.bin/codeclimate-test-reporter <coverage/lcov.info

# Skip deploy when not master
if [ "${TRAVIS_BRANCH}" != "master" ]; then
  echo skip deploy because now in branch ${TRAVIS_BRANCH}
  exit 0
fi

# Setup git
git config --global user.name "Travis-CI"
git config --global user.email "zordius@yahoo-inc.com"

# Do smoke test (only test 00hello)
npm run smoke_test

# Add browser test badge
git add examples
git commit -m "Auto commit smoke test results for ${TRAVIS_COMMIT} [ci skip]"
git push --force --quiet "https://${GHTK}@github.com/zordius/fluxex.git" HEAD:last_result > /dev/null 2>&1
git reset ${TRAVIS_COMMIT} --hard

# trigger example builds (push to fluxex-examples)
cd examples
git init
git pull --rebase --quiet "https://${GHTK}@github.com/zordius/fluxex-examples.git" master:master > /dev/null 2>&1
echo ${TRAVIS_COMMIT} > fluxex
git add . > /dev/null
git commit -m "Auto push new examples from zordius/fluxex@${TRAVIS_COMMIT}" > /dev/null
git push --force --quiet "https://${GHTK}@github.com/zordius/fluxex-examples.git" master > /dev/null 2>&1
cd ..

# build document
npm run build_doc
cd documents
if [ "${TRAVIS_BRANCH}" != "master" ]; then
  echo "Document will be pushed here: http://zordius.github.io/fluxex/${TRAVIS_BRANCH}/"
  cd ..
  git init
  git pull --quiet "https://${GHTK}@github.com/zordius/fluxex.git" gh-pages:master > /dev/null 2>&1
  rm -rf $TRAVIS_BRANCH
  mv documents $TRAVIS_BRANCH
  git add $TRAVIS_BRANCH
else
  echo "Document will be pushed here: http://zordius.github.io/fluxex/"
  git init
  git add .
fi

# push document
git commit -m "Auto deployed to Github Pages from branch ${TRAVIS_BRANCH} @${TRAVIS_COMMIT} [ci skip]"
git push --force --quiet "https://${GHTK}@github.com/zordius/fluxex.git" master:gh-pages > /dev/null 2>&1
