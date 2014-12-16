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

# build examples
npm run-script build_example
git commit -m "Auto generated example bundle from Travis [ci skip]" examples
git push "https://${GHTK}@github.com/zordius/fluxex.git" HEAD:${TRAVIS_BRANCH} > /dev/null 2>&1

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

# back to project
cd ..
cd fluxex

# Bump npm version and push back to git
npm version prerelease -m "Auto commit for npm publish version %s [ci skip]"
git push "https://${GHTK}@github.com/zordius/fluxex.git" --tags > /dev/null 2>&1

# Deploy to npm
gem install dpl
dpl --provider=npm --email='zordius@yahoo-inc.com' --api-key=${NPM_API_KEY} > /dev/null 2>&1
