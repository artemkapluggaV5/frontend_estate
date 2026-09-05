import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

interface CustomDropdownProps {
  options: any[];
  value: any;
  onChange: (value: any) => void;
  optionLabel: string;
  optionValue: string;
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
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

  const selectOption = (optValue: any) => {
    onChange(optValue);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (value === null || value === undefined || value === '') return placeholder || 'Выберите...';
    const selected = options.find(opt => opt[optionValue] === value);
    return selected ? selected[optionLabel] : placeholder;
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
            const isSelected = value === opt[optionValue];
            return (
              <div 
                key={i} 
                className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(opt[optionValue]);
                }}
              >
                <span>{opt[optionLabel]}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
