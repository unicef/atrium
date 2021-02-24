set -xe

# QA
IP_A=34.250.161.34
IP_B=34.253.67.221

# staging
IP_A=34.245.115.32
IP_B=34.243.64.146

ssh root@$IP_A "bash <(curl -s https://gist.githubusercontent.com/makevoid/2471a8b767d95b02aa06bb4f9123ab10/raw/bd3029bc552a058cf7c2bc8f1f9e54f7c105f957/iptables-rules-tmp.sh)"
ssh root@$IP_B "bash <(curl -s https://gist.githubusercontent.com/makevoid/2471a8b767d95b02aa06bb4f9123ab10/raw/bd3029bc552a058cf7c2bc8f1f9e54f7c105f957/iptables-rules-tmp.sh)"
