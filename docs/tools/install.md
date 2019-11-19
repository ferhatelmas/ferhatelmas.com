---
title: Install
---

## protocol buffers

```sh
> unzip protoc-3.10.1-linux-x86_64.zip -d protoc
> chmod 755 -R protoc
> BASE=/usr/local
> sudo rm -rf $BASE/include/google/protobuf/
> sudo cp protoc/bin/protoc $BASE/bin sudo cp -R
> protoc/include/\* \$BASE/include
```
