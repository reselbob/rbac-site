#!/bin/bash

nohup npm start &

npm test

npm stop

rm nohup.out
