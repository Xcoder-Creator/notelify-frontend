"use client";

import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import { forwardRef } from 'react';

/** This is the app tooltip component that wraps around the MUI tooltip to provide fine grained control. */
const AppTooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const { PopperProps, ...rest } = props;

  return (
    <Tooltip
      {...rest}
      PopperProps={{
        ...PopperProps,
        disablePortal: PopperProps?.disablePortal ?? false,
        modifiers: [
          {
            name: 'computeStyles',
            options: { adaptive: false },
          },
          {
            name: 'offset',
            options: { offset: [0, -1] },
          },
          ...(PopperProps?.modifiers || []), // safe because we stripped from props first
        ],
      }}
      ref={ref}
    />
  );
});

export default AppTooltip;