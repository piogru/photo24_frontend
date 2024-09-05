import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ComponentProps } from "react";

type MagnifyingGlassIconSolidProps = ComponentProps<typeof MagnifyingGlassIcon>;

export default function MagnifyingGlassIconSolid({
  className,
}: MagnifyingGlassIconSolidProps) {
  return <MagnifyingGlassIcon className={`${className} stroke-2`} />;
}
