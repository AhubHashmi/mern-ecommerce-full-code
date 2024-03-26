import React from 'react';

const MyRadioGroup = ({ options, onChange }) => {
    return (
        <div>
            {options.map(option => (
                <div key={option.value}>
                    <input
                        type="radio"
                        id={option.value}
                        name="radioGroup"
                        value={option.value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                </div>
            ))}
        </div>
    );
};

export default MyRadioGroup;
