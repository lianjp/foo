#!/bin/bash
IFS_SAVE=$IFS
IFS=$'\n\t'

basepath=$(cd `dirname $0`; pwd)
echo now path at: ${basepath}

for line in `cat ${basepath}/prod.host.list`

do
  sleep 3
  IFS=$IFS_SAVE
  echo "get ip and passwd: ${line}"
  expect $basepath/main.sh $line
  # expect `${basepath}/\main.sh` $line
  IFS=$'\n\t'
  sleep 3
done
exit