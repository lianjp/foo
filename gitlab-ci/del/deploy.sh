#!/usr/bin/expect -f
set timeout -1
set password tianfan123
set user root
set port 29255
set ip 65.49.134.212
set fileDir ./dist
set targetDir /root/education-dist

# spawn ssh -p ${port} ${user}@${ip}
# 静态文件部署 -C 表示压缩
spawn scp -r -P ${port} ${fileDir} root@${ip}:${targetDir}

# scp -r -P 28069 ./aaa root@176.122.168.74:/root/aaa &>/dev/deploylog
# >> /var/log/scp
# >/tmp/scplog
# spawn ssh -p $port $user@$ip

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

# 表示上一步匹配的等待
sleep 3

expect {
    "end" {
        send "ls -a\r"
    }
}
# expect {
#     # "*#" {
#     #     send "ls -a\r"
#     #     send "exit\r"
#     # }
#     "quit" exit
#     -re ".*(\$|#)" {
#         send "ls -a\r"
#         # send "exit\r"
#     }
# }

sleep 3
echo scp done succeed
# log_file /home/deploylog

# 如果有下面这一行，将继续在对方服务器继续命令行
# interact

# 如果有下面一行，则退出远程
expect eof
exit