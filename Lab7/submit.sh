#! /bin/sh
##########################
# Bradford Smith (bsmith8)
# CS 554 Lab 7 submit.sh
# 11/09/2017
##########################

AUTHOR='bsmith8'
ASSIGNMENT='cs554-lab7'

# shellcheck disable=1001
zip -r $AUTHOR\_$ASSIGNMENT.zip ./* -x './node_modules/*'
