# Ansaible
## python 环境
- 利用python vitualenv来隔离ansible所依赖的python环境
## 两种安装模式
- Yum 包管理安装
    - yum -y install ansible  //全局安装 任意用户都可以使用 python环境管理混乱
- Git 源代码安装【推荐】
    - git clone https://github.com/ansible/ansible.git  //不会冲突

## Ansible配合virtualenv安装配置
- Ansible2.5+python3.6安装步骤（CentOS7）
    - 预先安装python3.6版本
    - 安装virtualenv
        - pip install virtualenv
    - 创建Ansible账户并安装python3.6版本virtualenv实例
        - useradd deploy && su - deploy
        - virtualenv -p /usr/local/bin/python3 .py3-a2.5-env
    - Git源代码安装ansible2.5
        - cd /home/deploy/.py3-a2.5-env
        - git clone https://github.com/ansible/ansible.git
        - cd ansible && git checkout stable-2.5
    - 加载Python3.6 Virtualenv环境
        - source /home/deploy/.py3-a2.5-env/bin/activate
    - 安装ansible依赖包
        - pip install paramiko PyYAML jinja2
    - 在Python3.6虚拟环境下加载ansible2.5
        - source /home/deploy/.py3-a2.5-env/ansible/hacking/env-setup -q
    - 验证ansible2.5
        - ansible --version

## 安装流程
- 关闭firewalld防火墙（让本地pc可以访问Linux的所有端口资源）
    - systemctl stop firewalld （关闭当前的防火墙）
    - systemctl disable firewalld 禁止防火墙开机启动
- 关闭SELINUX并重启系统（关闭强制访问策略）
    - # vi /etc/sysconfig/selinux   SELINUX=disabled   # reboot
    - getenforce 查看状态
- 下载和安装python3.6安装包
    - wget http://www.python.org/ftp/python/3.6.5/Python-3.6.5.tar.xz
    - tar xf Python-3.5.6.tar.xz  //解压编译包
    - cd Python-3.6.5 //进入该目录
        - ./configure --prefix=/usr/local --with-ensurepip=install --enable-shared LDFLAGS="-wl,-rpath /usr/local/lib" //设定一些当前环境编译的值 
        - make && make altinstall   //编译并将编译出来的东西安装到usr/local下
        - whick pip3.6   //查看pip3.6的目录
        - ln -s /usr/local/bin/pip3.6 /usr/local/bin/pip //创建软连接
        - pip install virtualenv  //安装virtualenv工具
        - useradd deploy //创建ansible系统账户
        - su - deploy  //登陆该用户的命令行界面
        - env -p /usr/local/bin/python3.6 .py3-a2.5-env //在deploy用户下创建一个python3.6的virtualenv实列，这个virtualenv实列用来集成ansible2.5版本
    - git源码安装ansible2.5版本
        - cd /home/deploy/.py3-a2.5-env
        - which git  //bin/git 说明已经安装成功
            - 如果没有安装成功
                - su - root 
                - yum -y install git nss curl //安装git及相关的依赖包
                - su - deploy
        - git clone https://github.com/ansible/ansible.git
        - source /home/deploy/.py3-a2.5-env/bin/activate  //成功加载了virtualenv环境
        - pip install paramiko PyYAML jinja2 //安装ansible相关依赖包
        - 将ansible移动virtualenv环境下
            - ll //ansible 当前目录下有一个ansible包
            - mv ansible .py3-a2.5-env
            - cd .py3-a2.5-env/ansible/
            - git checkout stable-2.5  //切换版本
        - 在虚拟环境下加载ansible2.5版本
            - source /home/deploy/.py2-a2.5-env/ansible/hacking/env-setup -q
        - 验证ansible 是否加载成功
            - ansible --version
