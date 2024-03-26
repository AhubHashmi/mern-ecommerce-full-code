import React from 'react';

const MySelect = ({ options, onChange }) => {
    return (
        <select
            className="form-select mb-3"
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="" disabled selected>Select a category</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default MySelect;
