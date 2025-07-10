import React from 'react';
import type { SuggestionsProps } from '../types';

const CompanySearchDropdown: React.FC<SuggestionsProps> = ({ title, id, setFormData, setShowSuggestions, formData, skipNextFetch }) => {

    return (
        <li
            key={id}
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