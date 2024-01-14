import { forwardRef, ForwardRefRenderFunction } from "react";
import { IButtonProps } from "./types";

// eslint-disable-next-line react-refresh/only-export-components
const Button: ForwardRefRenderFunction<HTMLButtonElement, IButtonProps> = (
  { children, className, secondary, ...rest },
  ref
) => {
  return (
    <button
      ref={ref}
      className={
        secondary ? `btn-secondary ${className}` : `btn-primary ${className}`
      }
      {...rest}
    >
      {children}
    </button>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default forwardRef(Button);
