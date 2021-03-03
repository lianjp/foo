#!/usr/bin/expect -f
package require Expect
set timeout -1
set ipaddress [lindex $argv 0]
set port [lindex $argv 1]
set username [lindex $argv 2]
set passwd [lindex $argv 3]
# 目标文件夹
set targetDir [lindex $argv 4]

# 本地文件夹
set fileDir [lindex $argv 5]

# 静态文件 copy 部署
# spawn scp -C -r -P ${port} ${fileDir} ${username}@${ipaddress}:${targetDir}

# spawn ssh -p ${port} ${username}@${ipaddress} mkdir -p ${targetDir}

# expect {
#     "(yes/no)?" {
#         send "yes\r";
#         expect "password:";
#         send "${passwd}\r";
#     }
#     "password:" {
#         send "${passwd}\r";
#     }
# }

# 同步文件夹方式部署
spawn rsync -rav --delete -e "ssh -p ${port}" ${fileDir} ${username}@${ipaddress}:${targetDir}

# spawn rsync -rav --delete -e "ssh -p ${port}" ${fileDir} ${username}@${ipaddress}:${targetDir}

# rsync -rav --delete -e 'ssh -p 29255' dist/ root@65.49.134.212:/root/education-dist

expect {
    "(yes/no)?" {
        send "yes\r";
        expect "password:";
        send "${passwd}\r";
    }
    "password:" {
        send "${passwd}\r";
    }
}

# expect "]*"
# send "exit\r"
expect eof