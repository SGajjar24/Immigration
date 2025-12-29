import * as React from "react"

import { cn } from "../../utils/cn"

// Since class-variance-authority might not be installed, I will implement a simpler version or just install it.
// Actually, it's safer to just implement without cva if I don't want to install more deps, but cva is standard shadcn.
// I'll assume I can just write standard Tailwind classes.

const Badge = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' }
>(({ className, variant = "default", ...props }, ref) => {
    const variants = {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-white/10 text-secondary-foreground hover:bg-white/20",
        destructive: "border-transparent bg-red-500/15 text-red-500 hover:bg-red-500/25",
        outline: "text-foreground",
        success: "border-transparent bg-green-500/15 text-green-400 hover:bg-green-500/25",
        warning: "border-transparent bg-yellow-500/15 text-yellow-500 hover:bg-yellow-500/25",
    }

    return (
        <div
            ref={ref}
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    )
})
Badge.displayName = "Badge"

export { Badge }
