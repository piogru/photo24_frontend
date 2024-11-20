import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";

type AnimatedStepProps = {
  isActive: boolean;
  direction: "forward" | "backward";
  children: ReactNode;
  index: number;
  currentIndex: number;
};

export default function AnimatedStep({
  isActive,
  direction,
  children,
  index,
  currentIndex,
}: AnimatedStepProps) {
  const [shouldRender, setShouldRender] = useState(isActive);
  // const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  // useEffect(() => {
  //   if (isActive && stepRef.current) {
  //     const focusableElement = stepRef.current.querySelector(
  //       'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  //     );

  //     if (focusableElement) {
  //       (focusableElement as HTMLElement).focus();
  //     }
  //   }
  // }, [isActive]);

  if (!shouldRender) {
    return null;
  }

  const baseClasses =
    "top-0 left-0 w-full h-full transition-all duration-300 ease-in-out animate-in fade-in zoom-in-95";

  const visibilityClasses = isActive ? "opacity-100" : "opacity-0 absolute";

  const transformClasses = clsx(
    "translate-x-0",
    isActive ?
      {}
    : {
        "-translate-x-full": direction === "forward" || index < currentIndex,
        "translate-x-full": direction === "backward" || index > currentIndex,
      },
  );

  const className = clsx(baseClasses, visibilityClasses, transformClasses);

  return (
    <div
      //  ref={stepRef}
      className={className}
      aria-hidden={!isActive}
    >
      {children}
    </div>
  );
}
