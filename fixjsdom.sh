#!/bin/sh
if [ "${TRAVIS_BUILD_NUMBER}.1" = "${TRAVIS_JOB_NUMBER}" ]; then
  npm install jsdom@3.1.2
  exit 0
fi

if [ "${TRAVIS_BUILD_NUMBER}.2" = "${TRAVIS_JOB_NUMBER}" ]; then
  npm install jsdom@3.1.2
  exit 0
fi

if [ "${TRAVIS_BUILD_NUMBER}.3" = "${TRAVIS_JOB_NUMBER}" ]; then
  npm install jsdom@6.5.1
  exit 0
fi

npm install jsdom@7.2.2 
