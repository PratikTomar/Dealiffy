import React from 'react';
import type { SuggestionsProps } from '../types';

const CompanySearchDropdown: React.FC<SuggestionsProps> = ({ title, key, setFormData, setShowSuggestions, formData, skipNextFetch }) => {
    return (
        <li
            key={key}
            onClick={() => {
                skipNextFetch.current = true
                setFormData({ ...formData, companyName: title });
                setShowSuggestions(false);
            }}
            className="p-2 hover:bg-blue-100 cursor-pointer"
        >
            {title}
        </li>
    );
}

export default CompanySearchDropdown