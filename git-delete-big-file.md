
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch "驱动整合包.zip" ' --prune-empty --tag-name-filter cat -- --all
git push origin --force --all
git push origin --force --tags
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d
git reflog expire --expire=now --all
git gc --prune=now
git count-objects -v

  182  sudo yum install gitlab-runner
  183  curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh | sudo bash
  184  sudo yum install gitlab-runner
  185  sudo gitlab-ci-multi-runner register
  186  sudo  gitlab-ci-multi-runner start
  187  yum install -y expect
  188  java -version
https://stackoverflow.com/questions/21820715/how-to-install-latest-version-of-git-on-centos-7-x-6-x

  yum install http://opensource.wandisco.com/centos/6/git/x86_64/wandisco-git-release-6-1.noarch.rpm
  yum install git