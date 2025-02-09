import { TextProps } from './BaseText';

export interface ItalicProps {
  className: string;
}

type Substract<T, K> = Omit<T, keyof K>;

export default function withItalic<P extends TextProps & ItalicProps>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WithItalic(props: Substract<P, ItalicProps>) {
    const combinedProps = {
      ...(props as P),
      className: 'italic',
    };

    return <WrappedComponent {...combinedProps} />;
  };
}
