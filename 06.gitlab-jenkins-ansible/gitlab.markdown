# 课程介绍
- Gitlab搭建与流程使用
- Ansible环境配置与Playbook编写规范
- Jenkins环境构建与任务编写
- Freestyle 任务实现静态网站部署交付
# GitLab
## 主要服务
- Nginx 静态web服务器
- Gitlab-woekhorse 轻量级的反向代理服务器
- Gitlab-shell 用于处理Git命令和修改Authorized keys列表
- Logrotate 日志文件管理工具
- Postgresql 数据库
- Redis 缓存服务器
## 工作流程
 - 创建并克隆项目
 - 创建项目某Feature分支
 - 编写代码并提交至该分支
 - 推送该项目分支至远程GitLab服务器
 - 进行代码检查并提交Master主分支合并申请
 - 项目负责人审查代码并确认合并申请

## 安装
- 利用VirtualBox创建测试服务器
- 安装Gitlab前系统预配置准备工作
    - 关闭firewalld防火墙（让本地pc可以访问Linux的所有端口资源）
        - systemctl stop firewalld （关闭当前的防火墙）
        - systemctl disable firewalld 禁止防火墙开机启动
    - 关闭SELINUX并重启系统
        - # vi /etc/sysconfig/selinux   SELINUX=disabled   # reboot
        - getenforce 查看状态
    - 安装Omnibus Gitlab-ce package 
        - gitlab-ce (集成了常用的服务 一键安装包 相对于源代码的安装 很容易上手)
        - 安装Gitlab组件 # yum -y install curl policycoreutils openssh-server openssh-clients postfix
        - 配置YUM仓库 # curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
    - 启动postfix邮件服务 # systemctl start postfix && systemctl enable postfix
    - 安装Gitlab-ce 社区版本 # yum install -y gitlab-ce
- Omnibus Gitlab 等相关配置初始化并完成安装
    - 证书创建于配置加载
        - mkdir - p /etc/gitlab/ssl
        - openssl genrsa -out "/etc/gitlab/ssl/gitlab.example.com.key" 2048 //创建秘钥
        - openssl req -new -key "/etc/gitlab/ssl/gitlab.example.com.key" -out "/etc/gitlab/ssl/gitlab.example.com.csr"  //csr证书 
            - common Name gitlab.example.com
            - email Address: xxx@example.com
            - challage paddword:xxxxx
            - 查看是否创建成功 ll
        - openssl x509 -req -days 365 -in "/etc/gitlab/ssl/gitlab.example.com.csr"  -signkey "/etc/gitlab/ssl/gitlab.example.com.key"  -out "/etc/gitlab/ssl/gitlab.example.com.crt" // 根据私有秘钥和csr证书创建crt签署证书
        - openssl dhparam -out /etc/gitlab/ssl/dhparams.pem 2048  //再创建pem证书
        - chmod 600 *  更改权限
        - vi /etc/gitlab/gitlab.rb  
            - external_url:http://gitlab.example.com->https://gitlab.example.com
            - redirect_http_to_https =true //注释去掉
            - nginx['ssl_certificate'] = '/etc/gitlab/ssl/gitlab.example.com.crt'
            - nginx['ssl_certificate_key'] = '/etc/gitlab/ssl/gitlab.example.com.key'
            - nginx['ssl_dhparam'] = '/etc/gitlab/ssl/dhparams.pem'
        - gitlab-ctl reconfigure  //初始化gitlab的配置文件
    - Nginx SSL代理服务配置
        - vi /var/opt/gitlab/nginx/conf/gitlab-http.conf
        - 搜索server_name
            - 下面一行写入  rewrite ^(.*)$ https://$host$1 permanent;
        - gitlab-ctl restart //是的配置生效 重启
    - 初始化Gitlab 相关服务并完成安装

