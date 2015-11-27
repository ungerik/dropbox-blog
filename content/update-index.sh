#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR

echo "Updating content index"
ls -m1 images > images/index.txt
ls -m1 pages > pages/index.txt
ls -m1 posts > posts/index.txt
