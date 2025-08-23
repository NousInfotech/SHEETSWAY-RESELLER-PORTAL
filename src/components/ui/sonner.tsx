'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--success-bg': 'rgb(232 132 12)',
          '--success-text': 'white',
          '--success-border': 'rgb(232 132 12)',
          '--error-bg': 'rgb(239 68 68)',
          '--error-text': 'white',
          '--error-border': 'rgb(239 68 68)',
          '--warning-bg': 'rgb(245 158 11)',
          '--warning-text': 'white',
          '--warning-border': 'rgb(245 158 11)',
          '--info-bg': 'rgb(59 130 246)',
          '--info-text': 'white',
          '--info-border': 'rgb(59 130 246)'
        } as React.CSSProperties
      }
      position="bottom-right"
      {...props}
    />
  );
};

export { Toaster };
