#!/usr/bin/expect -f
set timeout -1
set password tianfan123
set user root
set port 29255
set ip 65.49.134.212
set fileDir ./dist
set targetDir /root/education-dist

# 静态文件部署

spawn scp -C -r -P ${port} ${fileDir} root@${ip}:${targetDir}

expect {
    "(yes/no)?" {
        send "yes\r";
        expect "password:";
        send "${password}\r";
    }
    "password:" {
        send "${password}\r";
    }
}


#普通用户是$,root用户是#
# expect -re ".*[$,#]"

expect "]*"
send "exit\r"
expect eof
