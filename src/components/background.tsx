import React from 'react';
import { cn } from '@/lib/utils';

interface BackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColorClass?: string;
  gridColorClass?: string;
  gridSize?: string;
  maskImage?: string;
}

const Background: React.FC<BackgroundProps> = ({
  className,
  backgroundColorClass = "bg-background",
  gridColorClass = "bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] opacity-50 dark:opacity-30",
  gridSize = "bg-[size:14px_24px]",
  maskImage = "[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)]",
  ...props
}) => {
  return (
    <div className={cn("fixed inset-0 z-[-1]", className)} {...props}>
      <div className={cn("relative h-full w-full", backgroundColorClass)}>
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 top-0",
            gridColorClass,
            gridSize,
            maskImage
          )}
        />
      </div>
    </div>
  );
};

export default Background;