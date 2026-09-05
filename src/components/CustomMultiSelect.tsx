import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

interface CustomMultiSelectProps {
  options: any[];
  value: any[];
  onChange: (value: any[]) => void;
  optionLabel: string;
  optionValue: string;
  placeholder?: string;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  options, value, onChange, optionLabel, optionValue, placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optValue: any) => {
    const isSelected = value.includes(optValue);
    if (isSelected) {
      onChange(value.filter(v => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  const getDisplayValue = () => {
    if (!value || value.length === 0) return placeholder || 'Выберите...';
    return options
      .filter(opt => value.includes(opt[optionValue]))
      .map(opt => opt[optionLabel])
      .join(', ');
  };

  return (
    <div className="custom-select-container" ref={containerRef}>
      <div className={`custom-select-trigger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span className="custom-select-display">{getDisplayValue()}</span>
        <i className={`pi pi-chevron-down custom-select-icon ${isOpen ? 'open' : ''}`}></i>
      </div>
      
      {isOpen && (
        <div className="custom-select-dropdown">
          {options.map((opt, i) => {
            const isSelected = value.includes(opt[optionValue]);
            return (
              <div 
                key={i} 
                className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(opt[optionValue]);
                }}
              >
                <div className={`custom-checkbox ${isSelected ? 'checked' : ''}`}>
                  {isSelected && <i className="pi pi-check"></i>}
                </div>
                <span>{opt[optionLabel]}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelect;
