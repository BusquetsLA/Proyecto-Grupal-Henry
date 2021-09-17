import React from 'react'

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Debe ingresar su nombre';
  } else if (!/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(input.name)) {
    errors.name = 'Ese nombre es inválido';
  }
  if (!input.email) {
    errors.email = 'Debe ingresar su correo electrónico';
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = 'Ese correo es inválido';
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
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <input type='text' name='name' placeholder="Nombre" className={`${errors.name && 'danger'}`} value={input.name} onChange={handleInputChange}/>
            {errors.name && (<p className="danger">{errors.name}</p>)}
        </div>
        <div>
          <input type='text' name='email' placeholder="Correo" className={`${errors.email && 'danger'}`} value={input.email} onChange={handleInputChange}/>
            {errors.email && (<p className="danger">{errors.email}</p>)}
        </div>
        <button type='submit'> Suscribirse </button>
      </form>
    </div>
  )
};

export default NewsletterSignUp;