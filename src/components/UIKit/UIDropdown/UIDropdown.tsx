
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export type DropdownOption = {
  value: string;
  label: string;
};

type UIDropdownProps = {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  iconLeft?: ReactNode;
  disabled?: boolean;
  name?: string;
};

export function UIDropdown({
  label,
  placeholder = "Seleccionar",
  options,
  value,
  onChange,
  iconLeft,
  disabled = false,
  name,
}: UIDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedValue = value ?? internalValue;

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [isOpen, activeIndex]);

  function openDropdown() {
    if (disabled || options.length === 0) return;

    const selectedIndex = options.findIndex(
      (option) => option.value === selectedValue
    );

    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  }

  function closeDropdown() {
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  function selectOption(option: DropdownOption) {
    if (value === undefined) {
      setInternalValue(option.value);
    }

    onChange?.(option.value);
    closeDropdown();
  }

  function handleButtonKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>
  ) {
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      if (!isOpen) {
        openDropdown();
      } else {
        closeDropdown();
      }
    }

    if (event.key === "Escape") {
      closeDropdown();
    }
  }

  function handleOptionKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index + 1) % options.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index - 1 + options.length) % options.length
      );
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeDropdown();
    }

    if (event.key === "Tab") {
      setIsOpen(false);
    }
  }

  return (
    <div
      className={`ui-dropdown ${disabled ? "ui-dropdown--disabled" : ""}`}
      ref={containerRef}
    >
      {label && (
        <label className="ui-dropdown__label">
          {label}
        </label>
      )}

      {name && (
        <input
          type="hidden"
          name={name}
          value={selectedValue}
        />
      )}

      <button
        ref={buttonRef}
        type="button"
        className={`ui-dropdown__trigger ${
          isOpen ? "ui-dropdown__trigger--open" : ""
        }`}
        onClick={() => {
          if (isOpen) {
            closeDropdown();
          } else {
            openDropdown();
          }
        }}
        onKeyDown={handleButtonKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={disabled}
      >
        <span className="ui-dropdown__content">
          {iconLeft && (
            <span
              className="ui-dropdown__icon"
              aria-hidden="true"
            >
              {iconLeft}
            </span>
          )}

          <span className="ui-dropdown__text">
            {selectedOption?.label ?? placeholder}
          </span>
        </span>

        <svg
          className={`ui-dropdown__chevron ${
            isOpen ? "ui-dropdown__chevron--open" : ""
          }`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="ui-dropdown__menu"
          role="listbox"
          aria-label={label ?? placeholder}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              type="button"
              role="option"
              aria-selected={selectedValue === option.value}
              className={`ui-dropdown__option ${
                selectedValue === option.value
                  ? "ui-dropdown__option--selected"
                  : ""
              }`}
              tabIndex={index === activeIndex ? 0 : -1}
              onFocus={() => setActiveIndex(index)}
              onClick={() => selectOption(option)}
              onKeyDown={(event) =>
                handleOptionKeyDown(event, index)
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
