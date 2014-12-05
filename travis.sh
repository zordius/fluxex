#!/bin/sh
echo "DEBUG ENV: ${TRAVIS_JOB_NUMBER} ${TRAVIS_BUILD_NUMBER} ..."

if [ "${TRAVIS_BUILD_NUMBER}.1" != "${TRAVIS_JOB_NUMBER}" ]; then
  echo "Only run sauce labs 1 time 1 commit... quit."
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

# Bump npm version and push back to git
npm version prerelease -m "Auto commit for npm publish version %s [ci skip]"
git push "https://${GHTK}@github.com/zordius/fluxex.git" --tags > /dev/null 2>&1

# Deploy to npm
gem install dpl
dpl --provider=npm --email='zordius@yahoo-inc.com' --api-key=${NPM_API_KEY} > /dev/null 2>&1
