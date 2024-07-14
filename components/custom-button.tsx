import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary rounded-lg  flex items-center justify-center  mx-auto",
        destructive:
          "bg-red-500 rounded-lg flex items-center justify-center  mx-auto",
        outline:
          "border border-primary text-primary bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "bg-transparent",
      },
      size: {
        default: "px-4 py-3",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CustomButtonProps extends VariantProps<typeof buttonVariants> {
  title: string;
  onClick?: any;
  style?: StyleProp<ViewStyle>;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

export default function CustomButton({
  title,
  onClick,
  style,
  variant,
  size,
  className,
  textClassName,
  disabled,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={style}
      onPress={onClick}
      // bg-gradient-to-r from-[#FF8C00] to-[#FFA300]
      // className={` `}  bg-primary  rounded-lg w-full flex items-center justify-center  mx-auto
      className={cn(
        buttonVariants({ variant, size, className }),
        disabled && "opacity-90 bg-primary/70"
      )}
    >
      <Text
        className={cn(
          variant == "default" ? "text-white" : "text-primary",
          "font- text-[13px]  ",
          textClassName
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
