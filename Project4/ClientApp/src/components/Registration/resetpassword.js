import React, { useState } from "react";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here, you would send a request to your backend to reset the user's password
    // with the new password they provided

    setIsPasswordReset(true);
  };

  if (isPasswordReset) {
    return <p>Your password has been reset successfully!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your new password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        Confirm your new password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button type="submit">Reset password</button>
    </form>
  );
}

export default ResetPassword;
