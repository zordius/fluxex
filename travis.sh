#!/bin/sh
echo "DEBUG ENV: ${TRAVIS_JOB_NUMBER} ${TRAVIS_BUILD_NUMBER} ..."

if [ "${TRAVIS_BUILD_NUMBER}.1" != "${TRAVIS_JOB_NUMBER}" ]; then
  echo "Only run extra tasks 1 time 1 commit... quit."
  exit 0
fi

if [ "${TRAVIS_REPO_SLUG}" != "zordius/fluxex" ]; then
  echo "Skip deploy because this is a fork... quit."
  exit 0
fi

# push coverage to codeclimate
npm install codeclimate-test-reporter
npm run-script coverage
node_modules/.bin/codeclimate < coverage/lcov.info

# Skip deploy when not master
if [ "${TRAVIS_BRANCH}" != "master" ]; then
  echo skip deploy because now in branch ${TRAVIS_BRANCH}
  exit 0
fi

# Setup git
git config --global user.name "Travis-CI"
git config --global user.email "zordius@yahoo-inc.com"

# Do smoke test (only test 00hello)
npm run-script smoke_test

# Add browser test badge
git add examples
git commit -m "Auto commit smoke test results for ${TRAVIS_COMMIT} [ci skip]"
git push "https://${GHTK}@github.com/zordius/fluxex.git" HEAD:${TRAVIS_BRANCH} > /dev/null 2>&1

# Bump npm version and push back to git
TODAY=`date +"%Y-%m-%d"`
RELEASED=`npm info fluxex |grep $TODAY | wc -l`

if [ ${RELEASED} -eq 0 ]; then
  npm version prerelease -m "[NIGHTLY RELEASE] Auto commit for npm publish version %s [ci skip]"
  git push "https://${GHTK}@github.com/zordius/fluxex.git" --tags > /dev/null 2>&1
  git push "https://${GHTK}@github.com/zordius/fluxex.git" HEAD:${TRAVIS_BRANCH} > /dev/null 2>&1

  # Deploy to npm
  gem install dpl
  dpl --provider=npm --email='zordius@yahoo-inc.com' --api-key=${NPM_API_KEY} > /dev/null 2>&1
else
  echo One day on pre-release, $TODAY already released so skip.
fi

# trigger example builds (push to fluxex-examples)
cd examples
git init
echo ${TRAVIS_COMMIT} > fluxex
git add .
git commit -m "Auto push new examples from zordius/fluxex@${TRAVIS_COMMIT}"
git push --force --quiet "https://${GHTK}@github.com/zordius/fluxex-examples.git" master > /dev/null 2>&1
cd ..

# build document
npm run-script build_doc
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
