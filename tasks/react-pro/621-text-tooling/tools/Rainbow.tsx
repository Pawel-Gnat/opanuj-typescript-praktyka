import { TextProps } from './BaseText';

function rainbowText(text: string) {
  return text.split('').map((char: string, index: number) => {
    const hue = Math.floor((index / text.length) * 360);
    return (
      <span key={index} style={{ color: `hsl(${hue}, 80%, 50%)` }}>
        {char}
      </span>
    );
  });
}

export default function withRainbow<P extends TextProps>(WrappedComponent: React.ComponentType<P>) {
  return function RainbowComponent(props: P) {
    const { text, ...rest } = props;
    const processedText = typeof text === 'string' ? rainbowText(text) : text;

    const newText = <span data-testid="rainbow">{processedText}</span>;

    return <WrappedComponent {...(rest as P)} text={newText} />;
  };
}
