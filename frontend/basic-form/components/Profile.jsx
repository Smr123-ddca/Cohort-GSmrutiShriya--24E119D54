import { useState } from "react";
import { useUser } from "../context/UserContext";


function Form() {
  const [formData, setFormData] = useState({
    fullname: "",
    reg_id: "",
    email: "",
    password: "",
    age: "",
  });

  const { user } = useUser();

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value,});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await fetch("http://localhost:3000/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      return;
    }

    alert("Information changed successfully!");
  } catch (error) {
    console.error(error);
    alert("Could not reach the server");
  }
};
    


  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration Form</h2>

      {/* <label>Full Name:</label>
      <input
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
      />

      <br /><br /> */}

      <label>Registration ID:</label>
      <input
        type="text"
        name="reg_id"
        value={formData.reg_id}
        onChange={handleChange}
      />

      <br /><br />

      <label> New Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <br /><br />

      <label>New Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <br /><br />

      <label>New Age:</label>
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

};

export default Form;