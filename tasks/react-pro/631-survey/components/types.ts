export interface SurveyContextType {
  handleSubmit: (e: React.FormEvent) => void;
  values: Record<string, any>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export interface SurveyProps {
  onSubmit?: (values: Record<string, any>) => void;
  children: React.ReactNode;
}

export interface BaseInputProps {
  name: string;
  label: string;
  required?: boolean;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
}

export interface AnswerProps extends BaseInputProps {
  placeholder?: string;
}

export interface ChoiceOption {
  value: string;
  label: string;
}

export interface ChoiceProps extends BaseInputProps {
  options: ChoiceOption[];
}

export interface SubmitProps {
  children: React.ReactNode;
}

export type SurveyComponent = {
  (props: SurveyProps): React.JSX.Element;
  ShortAnswer: React.ComponentType<AnswerProps>;
  LongAnswer: React.ComponentType<AnswerProps>;
  Choice: React.ComponentType<ChoiceProps>;
  Submit: React.ComponentType<SubmitProps>;
};
