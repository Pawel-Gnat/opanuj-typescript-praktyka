type Person = {
  firstName: string;
  lastName: string;
};

type FieldExtender<T, K> = {
  [Prop in keyof T]: T[Prop & K];
};

type PersonUpdateHistory = FieldExtender<
  Person,
  {
    isUpdated: boolean;
    updatedAt: number | null;
  }
>;

export const history: PersonUpdateHistory = {
  firstName: {
    value: 'John',
    isUpdated: false,
    updatedAt: null,
  },
  lastName: {
    value: 'Doe',
    isUpdated: true,
    updatedAt: new Date().getTime(),
  },
};
