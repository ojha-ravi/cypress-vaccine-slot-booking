// ==UserScript==
// @name         Set Opt
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Ravi Ojha
// @match        https://messages.google.com/web/conversations/1187
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function getOtp(message) {
    let match = message.match(/\d{6}/);
    return match[0];
  }

  const lastMessageSelector =
    "mw-conversation-container mws-messages-list mws-bottom-anchored mws-message-wrapper:last-of-type";

  function checkNewOtp() {
    console.log("I am here");
    const elem = document.querySelector(lastMessageSelector);
    console.log("I am here", elem);

    if (!elem) {
      return;
    }

    const otp = getOtp(elem.innerText);
    const existingOtp = window.localStorage.getItem("otp", null);

    console.log(existingOtp);

    if (existingOtp === otp) {
      return;
    }

    window.localStorage.setItem("otp", otp);

    fetch("http://localhost:8888/otp", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: otp }), // b
    });
  }

  const interval = setInterval(checkNewOtp, 5000);
})();
