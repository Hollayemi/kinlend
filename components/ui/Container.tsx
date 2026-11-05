import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/cn";

export function Container({ as: Tag = "div", className, ...rest }: { as?: ElementType } & ComponentProps<"div">) {
  return <Tag className={cn("mx-auto w-full max-w-[76rem] px-5 sm:px-8", className)} {...rest} />;
}
