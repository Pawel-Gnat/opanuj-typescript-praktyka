import { TextProps } from './BaseText';

export interface BoldProps {
  className: string;
}

type Substract<T, K> = Omit<T, keyof K>;

export default function withBold<P extends TextProps & BoldProps>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WithBold(props: Substract<P, BoldProps>) {
    const combinedProps = {
      ...(props as P),
      className: `${(props as P).className ?? ''} bold`.trim(),
    };

    return <WrappedComponent {...combinedProps} />;
  };
}
