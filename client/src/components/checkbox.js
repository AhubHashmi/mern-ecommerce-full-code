import React from 'react';

const MyCheckbox = ({ id, name, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        onChange={(e) => onChange(e.target.checked, id)}
      />
      <label htmlFor={id}>{name}</label>
    </div>
  );
};

export default MyCheckbox;
