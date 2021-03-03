#!/bin/bash
IFS_SAVE=$IFS
IFS=$'\n\t'

basepath=$(cd `dirname $0`; pwd)
echo now path at: ${basepath}

for line in `cat ${basepath}/\test.host.list`
do
  sleep 10
  IFS=$IFS_SAVE
  echo $line
  echo "get ip and passwd: ${line}"
  expect $basepath/main.sh $line
  IFS=$'\n\t'
  sleep 10
done
exit