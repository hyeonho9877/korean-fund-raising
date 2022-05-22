# korean-fund-raising

한국식 계모임 DApp 설계 프로젝트입니다.

제안서: [MarkDown](PAPER.md), [PDF](PAPER.pdf)

## 기능

* 그룹 생성

* 그룹에 멤버 초대

* 멤버 탈퇴 및 추방

  일정 기간동안 입금 내역이 확인되지 않으면 해당 멤버를 추방

* 이체

* 출금

  일정 인원 이상의 동의가 있을 경우 해당 자금을 출금할 수 있음.

### 기술 스택

* Ethereum / Truffle / Ganache

* Express.js

## 연동 및 실행

Ganache에서 `truffle-config.js`를 불러들여 truffle과 연동합니다.

```bash
truffle compile
truffle migrate
npm install
node app.js
```

## 참고

* [솔리디티 공식 문서](https://docs.soliditylang.org/en/v0.8.14/)

  * [솔리디티 공식 문서(한글 번역)](https://solidity-kr.readthedocs.io/ko/latest/index.html)

* [Express.js API 문서](https://expressjs.com/en/4x/api.html)

* [Web3.js API 문서](https://web3js.readthedocs.io/en/v1.7.3/)
