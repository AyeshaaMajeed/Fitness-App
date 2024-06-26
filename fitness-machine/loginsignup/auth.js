$(document).ready(function () {
  // Validate and handle signup form
  $("#signup-form").validate({
    rules: {
      username: {
        required: true,
        minlength: 4,
      },
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 5,
      },
      confirmpassword: {
        required: true,
        equalTo: "#signup-password",
      },
    },
    messages: {
      username: "Please enter your username",
      email: {
        required: "Please enter your email",
        email: "Please enter a valid email address",
      },
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long",
      },
      confirmpassword: {
        required: "Please provide a password",
        equalTo: "Please enter the same password as above",
      },
    },
    submitHandler: function (form) {
      var formData = {
        username: $("#signup-username").val(),
        email: $("#signup-email").val(),
        password: $("#signup-password").val(),
      };

      // Save the signup data to localStorage
      localStorage.setItem('user_' + formData.username, JSON.stringify(formData));

      // Optionally, redirect to login page or clear form
      form.reset();
    },
  });

  // Validate and handle login form
  $("#login-form").validate({
    rules: {
      username: {
        required: true,
        minlength: 4,
      },
      password: "required",
    },
    messages: {
      username: {
        required: "Please enter your username",
        minlength: "Your username must be at least 4 characters long",
      },
      password: "Please provide your password",
    },
    submitHandler: function (form) {
      var formData = {
        username: $("#login-username").val(),
        password: $("#login-password").val(),
      };

      // Retrieve the signup data from localStorage
      var storedData = localStorage.getItem('user_' + formData.username);

      if (storedData) {
        var userData = JSON.parse(storedData);

        // Validate credentials
        if (userData.password === formData.password) {
          localStorage.setItem('loggedInUser', JSON.stringify(userData));
          window.location.href = '/dashboard/index.html'; // Redirect to dashboard
        } else {
          alert("Incorrect password. Please try again.");
        }
      } else {
        alert("User not found. Please sign up first.");
      }
    },
  });
});