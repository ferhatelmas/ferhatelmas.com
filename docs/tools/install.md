---
title: Install
---

## protocol buffers

https://github.com/protocolbuffers/protobuf/releases

```sh
> unzip protoc-3.11.2-linux-x86_64.zip -d protoc
> chmod 755 -R protoc
> sudo rm -rf /usr/local/include/google/protobuf/
> sudo cp protoc/bin/protoc /usr/local/bin
> sudo cp -R protoc/include/* /usr/local/include
```
