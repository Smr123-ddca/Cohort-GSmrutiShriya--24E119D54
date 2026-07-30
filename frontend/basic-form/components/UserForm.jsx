import { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    fullname: "",
    reg_id: "",
    email: "",
    password: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value,});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    alert("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration Form</h2>

      <label>Full Name:</label>
      <input
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
      />

      <br /><br />

      <label>Registration ID:</label>
      <input
        type="text"
        name="reg_id"
        value={formData.reg_id}
        onChange={handleChange}
      />

      <br /><br />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <br /><br />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <br /><br />

      <label>Age:</label>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />

      <br /><br />

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;