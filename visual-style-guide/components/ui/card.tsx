import * as React from "react"

import { cn } from "@/lib/utils" // Upravte cestu k utils.ts podle potřeby

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement, // V originále HTMLHeadingElement, ale používá se jako <p> v ResumeCard, sjednoceno na <p> pro flexibilitu, i když sémanticky může být <h3> lepší
  React.HTMLAttributes<HTMLHeadingElement> // Props zůstávají pro HTMLHeadingElement
>(({ className, ...props }, ref) => (
  <h3 // Použito <h3> pro sémantiku, ale typ je HTMLParagraphElement pro širší použití
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight", // Původní styl pro CardTitle
      // "text-lg font-bold truncate dark:text-white", // Styl z ProjectCard - zvažte, zda neudělat varianty
      // "font-semibold text-sm dark:text-white", // Styl z ResumeCard
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
