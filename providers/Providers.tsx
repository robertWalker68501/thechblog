import { ReactNode } from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';

import { ThemeProvider } from './ThemeProvider';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
};

export default Providers;
