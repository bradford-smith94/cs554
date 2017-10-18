#! /bin/sh
##########################
# Bradford Smith (bsmith8)
# CS 554 Lab 5 submit.sh
# 10/17/2017
##########################

AUTHOR='bsmith8'
ASSIGNMENT='cs554-lab5'

# shellcheck disable=1001
zip -r $AUTHOR\_$ASSIGNMENT.zip ./* -x './node_modules/*'
