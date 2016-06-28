title: "Tcpdump for sniffering http request"
date: 2015-06-09 10:34:05
strategies: network
tags:
  - tcpdump
  - sniffer
  - http
  - header
  - request
---

#####  1. Filter for HTTP header of GET method

    tcpdump -s 0 -A 'tcp[((tcp[12:1] & 0xf0) >> 2):4] = 0x47455420'

##### 2. Filter for HTTP POST method

    tcpdump -s 0 -A 'tcp[((tcp[12:1] & 0xf0) >> 2):4] = 0x504f5354'

##### 3. Monitor HTTP traffic

including request and response headers and message body:

  *  To monitor HTTP traffic including request and response headers and message body:
```bash
tcpdump -A -s 0 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)'
```
  *  To monitor HTTP traffic including request and response headers and message body from a particular source:
```bash
tcpdump -A -s 0 'src example.com and tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)'
```
  *  To monitor HTTP traffic including request and response headers and message body from local host to local host:
```bash
tcpdump -A -s 0 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)' -i lo
```
  *  To only include HTTP requests, modify “tcp port 80” to “tcp dst port 80” in above commands

  *  Capture TCP packets from local host to local host
```bash
        tcpdump -i lo
```



### refrence:
[wireshark for string filter online exchange](https://www.wireshark.org/tools/string-cf.html)
[Wireshark for capture filter](https://wiki.wireshark.org/CaptureFilters)