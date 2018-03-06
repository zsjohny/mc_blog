title: 五分钟开发您自己的ERC20代币
tags:
  - blockchain
categories:
  - 区块链
date: 2018-03-06 15:26:00
---
# 五分钟开发您自己的ERC20代币

https://zhuanlan.zhihu.com/p/32545281

代币发行应用对于以太坊就像微信对于移动互联网，目前它既是以太坊的杀手应用和价值支撑，又是普通用户对以太坊和和区块链的最直观认识。

随着最近两年基于以太坊智能合约基础设施和相关工具的迅猛发展，开发出具有工业水准的ERC20代币的技术门槛也大大降低。本文将介绍如何快速的开发您自己的ERC20代币。

1. 安装Node.js，安装文件和各平台具体安装方法请见https://nodejs.org/zh-cn/download/。 由于我们后面使用的开发工具truffle以及本地测试区块链ganache都是基于javascript 开发
2. 安装truffle,truffle正如其网站所宣传的一样，它是智能合约开发的瑞士军刀。就像maven大大简化的Java程序的编译和部署，truffle也使得智能合约的开发和部署更加傻瓜化。(npm install -g truffle)
3. 安装ganache. ganache是一个专门为开发智能合约定制的区块链本地节点工具。大家可以从http://truffleframework.com/ganache/下载对应平台的安装包并安装。它和以太坊原本节点软件(geth,parity)相比，具有以下优点，

安装方便，省去繁琐的配置，点击几下鼠标便可完成。
省系统资源，他不会没完没了的挖矿，只是在有交易需要打包的时候才打包。
有图形界面，从图形界面可以方便和直观的查看块，交易，账户等信息。


4. 启动ganache, ganache启动后，界面如下：
[image:BCEFF568-90B7-48F3-B127-59CD6F7DA33E-347-0000813293F58ECE/CFA377B4-4A67-4889-B1A0-7351C089F43A.png]

5. 打开一个命令行终端，输入如下命令：


```
mkdir TutorialToken

cd TutorialToken

truffle unbox tutorialtoken

npm install zeppelin-solidity
```


稍微解释一下上面的命令，第一和第二行创建目录TutorialToken并进入该目录。第三行使用truffle的unbox命令使用tutorialtoken这个项目作为范例，创建ERC20代币智能合约的骨架。第四行是安装智能合约的第三方库zeppelin-solidity, zeppelin-solidity之于ERC20代币智能合约就类似spring boot之于JAVA web后端开发，是一个事实上的业界标准库。

6. 使用诸如VSCode, Atom等类似的编辑器打开上面的目录，如果你是前端开发人员，你应该发现目录结构和普通的JavaScript前端项目非常相似，唯一不同的就是多了contracts和migrations这两个目录。

6.1 在contracts目录下创建一个新文件TutorialToken.sol, 内容如下：
```
pragma solidity ^0.4.17;



import 'zeppelin-solidity/contracts/token/StandardToken.sol';



contract TutorialToken is StandardToken {

string public name = "TutorialToken";

string public symbol = "HT";

uint8 public decimals = 2;

uint public INITIAL_SUPPLY = 888888;

function TutorialToken() public {

totalSupply = INITIAL_SUPPLY;

balances[msg.sender] = INITIAL_SUPPLY;

}

}

```

6.2 在migrations目录下新建 2_deploy_contracts.js,内容如下：


```

var TutorialToken = artifacts.require("TutorialToken");



module.exports = function(deployer) {

deployer.deploy(TutorialToken);

}
```

6.3 编译智能合约

```
truffle compile
```



6.4 部署智能合约

```
truffle migrate
```



6.5 修改./src/js/app.js第16行，将

```
App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');

改成

App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
```

6.6 
```
npm install
```

6.7 
```
npm run dev
```

6.8 用firefox或者chrome打开http://localhost:3000, 如果你看到如下画面，恭喜您，你的ERC20代币TutorialToken已经大功搞成。