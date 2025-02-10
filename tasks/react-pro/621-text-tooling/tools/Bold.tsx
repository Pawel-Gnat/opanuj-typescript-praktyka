import React from 'react';
import { TextProps } from './BaseText';

export default function withBold<P extends TextProps>(WrappedComponent: React.ComponentType<P>) {
  return function WithBold(props: P) {
    const newText = (
      <span data-testid="bold" style={{ fontWeight: 'bold' }}>
        {props.text}
      </span>
    );
    return <WrappedComponent {...props} text={newText} />;
  };
}
