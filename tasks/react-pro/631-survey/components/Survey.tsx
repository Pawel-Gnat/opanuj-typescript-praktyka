import React, { ChangeEvent, Children, cloneElement, ReactElement, useState } from 'react';
import { SurveyContext } from './context';
import { SurveyProps, AnswerProps, SurveyComponent, ChoiceProps, SubmitProps } from './types';

const Survey: SurveyComponent = ({ children, onSubmit }: SurveyProps) => {
  const [values, setValues] = useState<Record<string, any>>({});

  const handleChange = (name: string, newValue: any) => {
    setValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) {
      throw new Error('onSubmit callback is required!');
    }
    onSubmit(values);
  };

  return (
    <SurveyContext.Provider value={{ handleSubmit, values, setValues }}>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {Children.map(children, (child) => {
          const item = child as ReactElement<AnswerProps | ChoiceProps>;

          if (
            item.type === Survey.ShortAnswer ||
            item.type === Survey.LongAnswer ||
            item.type === Survey.Choice
          ) {
            const { name, onChange } = item.props;
            const value = values[name] || '';

            const handleInputChange = (e: ChangeEvent<any>) => {
              const newValue = e.target.value;
              handleChange(name, newValue);
              if (onChange) onChange(e);
            };

            return cloneElement(item, { value, onChange: handleInputChange });
          }

          return child;
        })}
      </form>
    </SurveyContext.Provider>
  );
};

const ShortAnswer = ({ name, label, placeholder, required, value, onChange }: AnswerProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-300 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        required={required}
        value={value || ''}
        onChange={onChange}
        className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100"
      />
    </div>
  );
};

const LongAnswer = ({ name, label, placeholder, required, value, onChange }: AnswerProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-300 mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value || ''}
        rows={6}
        onChange={onChange}
        className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100"
      />
    </div>
  );
};

const Choice = ({ name, label, options, required, value, onChange }: ChoiceProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-300 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        value={value || ''}
        onChange={onChange}
        className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-100"
      >
        <option value="" disabled>
          Wybierz...
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const Submit = ({ children }: SubmitProps) => {
  return (
    <button
      type="submit"
      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
    >
      {children}
    </button>
  );
};

Survey.ShortAnswer = ShortAnswer;
Survey.LongAnswer = LongAnswer;
Survey.Choice = Choice;
Survey.Submit = Submit;

export default Survey;
