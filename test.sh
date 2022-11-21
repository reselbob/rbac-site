#!/bin/bash

nohup npm start &

npm test

npm stop
