import React from 'react'

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Username is required';
  } else if (!/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(input.name)) {
    errors.name = 'Username is invalid';
  }
  if (!input.email) {
    errors.email = 'Username is required';
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = 'Username is invalid';
  }
};

const NewsletterSignUp = () => {
  const [input, setInput] = React.useState({
      name: '',
      email: ''
  });
  const [errors, setErrors] = React.useState({});
  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    }); /* the current state of the input */
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    })); /* the current state of the errors */
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // el submit jejejej
  };

  return (
    <div>
      //
    </div>
  )
};

export default NewsletterSignUp;