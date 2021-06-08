import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import "./FormInput.css";

// Server Request
const axios = require("axios");

export const FormInput = () => {
  const [checked, setChecked] = useState(false);
  const setActive = (el, active) => {
    const formField = el.parentNode.parentNode;
    if (active) {
      formField.classList.add("form-field--is-active");
    } else {
      formField.classList.remove("form-field--is-active");
      el.value === ""
        ? formField.classList.remove("form-field--is-filled")
        : formField.classList.add("form-field--is-filled");
    }
  };

  [].forEach.call(
    document.querySelectorAll(".form-field__input, .form-field__textarea"),
    (el) => {
      el.onblur = () => {
        setActive(el, false);
      };
      el.onfocus = () => {
        setActive(el, true);
      };
    }
  );

  const handleCheckBox = () => {
    setChecked(!checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let user_name = e.target.name.value;
    let email = e.target.email.value;
    let subject = e.target.subject.value;
    let mobile = e.target.mobile.value;
    let phone = e.target.phone.value;
    let registered_company = e.target.exampleCheck1.value;
    let message = e.target.message.value;

    axios
      .post("http://localhost:5000/", {
        user_name: user_name,
        email: email,
        subject: subject,
        mobile: mobile,
        phone: phone,
        registered_company: registered_company,
        message: message,
      })
      .then(function (response) {
        alert("Form Succesfully Submited");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <form novalidate id="contact_form" onSubmit={handleSubmit}>
      <div class="row">
        <div class="col-sm">
          <div class="form-field">
            <div class="form-field__control">
              <label for="name" class="form-field__label">
                NAME
              </label>
              <input
                id="name"
                name="user_name"
                type="text"
                class="form-field__input"
              />
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="form-field">
            <div class="form-field__control">
              <label for="email" class="form-field__label">
                EMAIL
              </label>
              <input id="email" type="email" class="form-field__input" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <div class="form-field">
            <div class="form-field__control">
              <label for="subject" class="form-field__label">
                SUBJECT
              </label>
              <input id="subject" type="text" class="form-field__input" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <div class="form-field">
            <div class="form-field__control">
              <label for="mobile" class="form-field__label">
                Mobile
              </label>
              <input id="mobile" type="number" class="form-field__input" />
            </div>
          </div>
        </div>
        <div class="col-sm">
          <div class="form-field">
            <div class="form-field__control">
              <label for="phone" class="form-field__label">
                Phone
              </label>
              <input
                id="phone"
                type="number"
                class="form-field__input"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <div class="form-field">
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input checkbox"
                id="exampleCheck1"
                value={checked}
                onChange={handleCheckBox}
              />
              <label class="form-check-label pl-2" for="exampleCheck1">
                Are you a registered company?
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm">
          <div class="form-field">
            <div class="form-field__control">
              <label for="message" class="form-field__label">
                Message
              </label>
              <textarea id="message" class="form-field__textarea"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm text-center">
          <button
            type="submit"
            className="customButton text-uppercase font-weight-900 btnSize box-shadow-2 mb-2 btn-lg px-4 px-lg-5 btn-block form-button text-prussian-blue btn btn-green btn-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
