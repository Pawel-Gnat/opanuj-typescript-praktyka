declare global {
  interface Window {
    analytics: {
      trackEvent(event: string): void;
    };
  }
}

export {};
