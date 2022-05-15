(function () {
  "use strict";

  const firstNameInputEl = document.getElementById("firstName");
  const lastNameInputEl = document.getElementById("lastName");
  const emailInputEl = document.getElementById("email");
  const phoneNumberInputEl = document.getElementById("phoneNumber");
  const passwordInputEl = document.getElementById("password");
  const confirmPasswordInputEl = document.getElementById("confirmPassword");

  const removeErrorMessage = function (target) {
    target.classList.remove("error");

    if (
      target.nextElementSibling &&
      target.nextElementSibling.classList.contains("error-message")
    ) {
      target.nextElementSibling.remove();
    }
  };

  const addErrorMessage = function (target, strMsg, container) {
    if (!target.nextElementSibling) {
      target.classList.add("error");
      container.textContent = strMsg;
      target.closest("li").appendChild(container);
    } else {
      if (target.nextElementSibling.classList.contains("error-message")) {
        target.nextElementSibling.textContent = strMsg;
      }
    }
  };

  const checkInput = function (e) {
    const divEl = document.createElement("div");
    divEl.classList.add("error-message");

    if (e.target.validity.valueMissing) {
      const errorMessage = e.target.name.trim().split("-").join(" ");

      addErrorMessage(
        e.target,
        `* ${
          errorMessage[0].toUpperCase() + errorMessage.slice(1)
        } is required.`,
        divEl
      );
    } else if (e.target.validity.patternMismatch) {
      if (e.target.id === "email") {
        addErrorMessage(e.target, "you@example.com", divEl);
      } else {
        addErrorMessage(e.target, "Format: 123-456-7890", divEl);
      }
    } else if (e.target.validity.tooShort) {
      addErrorMessage(
        e.target,
        `Should be at least ${e.target.minLength} characters; you entered ${e.target.value.length}.`,
        divEl
      );
    } else {
      removeErrorMessage(e.target);
    }

    if (
      passwordInputEl.validity.valid &&
      confirmPasswordInputEl.validity.valid
    ) {
      if (confirmPasswordInputEl.value !== passwordInputEl.value) {
        addErrorMessage(
          confirmPasswordInputEl,
          "* Password do not match.",
          divEl
        );
      } else {
        removeErrorMessage(confirmPasswordInputEl);
      }
    }

    if (confirmPasswordInputEl.validity.valid) {
      if (!passwordInputEl.value) {
        addErrorMessage(passwordInputEl, "* Password is required.", divEl);
      } else {
        removeErrorMessage(passwordInputEl);
      }
    }
  };

  firstNameInputEl.addEventListener("input", checkInput);
  lastNameInputEl.addEventListener("input", checkInput);
  emailInputEl.addEventListener("input", checkInput);
  phoneNumberInputEl.addEventListener("input", checkInput);
  passwordInputEl.addEventListener("input", checkInput);
  confirmPasswordInputEl.addEventListener("input", checkInput);
})();
