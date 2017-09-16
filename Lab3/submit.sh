#! /bin/sh
##########################
# Bradford Smith (bsmith8)
# CS 554 Lab 3 submit.sh
# 09/15/2017
##########################

AUTHOR='bsmith8'
ASSIGNMENT='cs554-lab3'

# shellcheck disable=1001
zip -r $AUTHOR\_$ASSIGNMENT.zip ./* -x './node_modules/*'
