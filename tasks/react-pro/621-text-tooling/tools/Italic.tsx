import React from 'react';
import { TextProps } from './BaseText';

export default function withItalic<P extends TextProps>(WrappedComponent: React.ComponentType<P>) {
  return function WithItalic(props: P) {
    const newText = (
      <span data-testid="italic" style={{ fontStyle: 'italic' }}>
        {props.text}
      </span>
    );
    return <WrappedComponent {...props} text={newText} />;
  };
}
