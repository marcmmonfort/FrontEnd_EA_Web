import { useState } from "react";
import Input from "../input/input.component";
import React from "react";

interface Password {
  passwordUser: string;
  passwordConfirmUser: string;
}

interface PasswordFormProps {
  onSubmit: (password: string) => void;
  passwordError?: string;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onSubmit, passwordError }) => {
  const [formData, setFormData] = useState<Password>({ passwordUser: '', passwordConfirmUser: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.passwordUser === formData.passwordConfirmUser && formData.passwordUser !== '') {
      onSubmit(formData.passwordUser);
    }
  };

  const { passwordConfirmUser, ...formWithoutPasswordConfirm } = formData;

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Contraseña"
        name="passwordUser"
        type="password"
        value={formWithoutPasswordConfirm.passwordUser}
        onChange={handleChange}
        required
      />
      <Input
        label="Confirmar contraseña"
        name="passwordConfirmUser"
        type="password"
        value={passwordConfirmUser}
        onChange={handleChange}
        required
        error={formData.passwordUser !== formData.passwordConfirmUser || formData.passwordUser === '' ? "Las contraseñas no coinciden o están vacías" : passwordError}
      />
    </form>
  );
};

export default PasswordForm;
