#! /bin/sh
##########################
# Bradford Smith (bsmith8)
# CS 554 Lab 2 submit.sh
# 09/08/2017
##########################

AUTHOR='bsmith8'
ASSIGNMENT='cs554-lab2'

# shellcheck disable=1001
zip -r $AUTHOR\_$ASSIGNMENT.zip ./* -x './node_modules/*'
