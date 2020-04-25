# Ansaible
## python 环境
- 利用python vitualenv来隔离ansible所依赖的python环境
## 两种安装模式
- Yum 包管理安装
    - yum -y install ansible  //全局安装 python环境管理混乱
- Git 源代码安装【推荐】
    - git clone https://github.com/ansible/ansible.git

## Ansible配合virtualenv安装配置
- Ansible2.5+python3.6安装步骤（CentOS7）
    - 预先安装virtualenv
    - 安装virtualenv
        - pip install virtualenv
    - 创建Ansible账户并安装python3.6版本virtualenv实例
        - useradd deploy && su - deploy
        - virtualenv -p /usr/local/bin/python3 .py3-a2.5-env
        
