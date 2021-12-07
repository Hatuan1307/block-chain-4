// const template = document.getElementById("hello");

const template = document.createElement("template");

template.innerHTML = `
            <style>
              .cc {
                cursor: pointer;
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                margin-bottom: 30px;
                border: 1px solid #e1e1e1;
                transition: 0.1s ease-in-out;
              }
              
              .cc:hover {
                transform: scale(1.05);
                border: 1px solid gray;
              }
              .cc-active {
                border: 4px solid rgb(132, 148, 202);
              }
              
              .cc-active:hover {
                transform: scale(1);
                border: 4px solid rgb(132, 148, 202);
              }
              
              .cc-img-main {
                width: 32px;
                height: 32px;
                background-repeat: no-repeat;
                background-size: cover;
                margin-bottom: 15px;
              }
              
              .cc-num {
                font-family: "Roboto", sans-serif;
                font-size: 15px;
              }
              
              .cc-date {
                margin-top: 8px;
                font-family: "Roboto", sans-serif;
                color: #888;
                font-size: 15px;
              }
              
              .usdt .cc-img-main {
                background-image: url("/docs/images/usdt.png");
              }
              
              .btc .cc-img-main {
                background-image: url("/docs/images/btc.png");
              }
              
              .eth .cc-img-main {
                background-image: url("/docs/images/eth.png");
              }
              
              .sol .cc-img-main {
                background-image: url("/docs/images/sol.png");
              }
            </style>
            <div class="cc">
              <div class="cc-img-main"></div>
              <div class="cc-num"></div>
              <div class="cc-date"></div>
            </div>
`;


class UserWallet extends HTMLElement {
  constructor() {
    super();

    // Shadow DOM
    this.attachShadow({
      mode: "open",
    });

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Query DOM
    const cc = this.shadowRoot.querySelector(".cc");
    const num = this.shadowRoot.querySelector(".cc-num");
    const date = this.shadowRoot.querySelector(".cc-date");

    cc.classList.add(this.getType());
    num.innerText = this.getAddress();
    date.innerText = this.getDate();
  }

  getAddress() {
    // valid ?
    return this.getAttribute("address");
  }
  getDate() {
    let ts = this.getAttribute("date");
    const date = new Date(parseInt(ts * 1000));
    return `Valid Thru: ${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  getType() {
    // valid ?
    const type = this.getAttribute("type");
    switch (type) {
      case "usdt":
        return "usdt";
      case "btc":
        return "btc";
      case "eth":
        return "eth";
      case "sol":
        return "sol";
      default:
        return "usdt";
    }
  }

  getActive() {
    const isActive = this.getAttribute("isActive");
    if (isActive === "true") {
      return true;
    }
    return false;
  }
}

export default UserWallet;
