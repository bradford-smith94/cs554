#! /bin/sh
##########################
# Bradford Smith (bsmith8)
# CS 554 Lab 4 submit.sh
# 10/11/2017
##########################

AUTHOR='bsmith8'
ASSIGNMENT='cs554-lab4'

# shellcheck disable=1001
zip -r $AUTHOR\_$ASSIGNMENT.zip ./* -x './node_modules/*'
