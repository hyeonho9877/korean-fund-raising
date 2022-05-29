async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.log(error);
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      document.getElementById("btnConnect").innerHTML = "연결됨";

    //   dash board 보이기
      document.getElementById("dashBoard").style.display = "block";

    } else {
      document.getElementById("btnConnect").innerHTML =
        "MetaMask를 설치해주세요";
    }
  }
  