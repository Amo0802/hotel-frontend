// Reusable input field component
import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  id: string;
  type?: string;
  label?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string | null;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  id, 
  type = 'text', 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error = null,
  readOnly = false
}) => {
  return (
    <div className="form-group">
      {label && <label className="form-label" htmlFor={id}>{label}</label>}
      
      <input
        id={id}
        type={type}
        className="form-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
      />
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default InputField;