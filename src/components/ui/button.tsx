import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl",
        outline:
          "border border-border bg-card/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:border-primary/30 shadow-md hover:shadow-lg",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-to-r from-primary via-accent to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 text-primary-foreground shadow-2xl hover:shadow-primary/25 hover:scale-105 animate-glow-pulse",
        floating: "bg-card/80 backdrop-blur-lg border border-border/50 hover:bg-card hover:border-primary/30 shadow-xl hover:shadow-2xl hover:scale-105",
        aurora: "bg-gradient-sunrise text-primary-foreground shadow-lg shadow-aurora-primary/20 hover:shadow-aurora-primary/40 hover:scale-105 transition-all duration-300",
        cosmos: "bg-gradient-space text-primary-foreground shadow-lg shadow-cosmos-primary/20 hover:shadow-cosmos-primary/40 hover:scale-105 transition-all duration-300",
        circuit: "bg-gradient-neon text-primary-foreground shadow-lg shadow-circuit-primary/20 hover:shadow-circuit-primary/40 hover:scale-105 transition-all duration-300",
        eden: "bg-gradient-forest text-primary-foreground shadow-lg shadow-eden-primary/20 hover:shadow-eden-primary/40 hover:scale-105 transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-xl px-8",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
