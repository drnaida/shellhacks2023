import classnames from "classnames";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import Themes, { ThemableProps } from "../ThemableProps";

declare interface LinkProps extends ThemableProps, RouterLinkProps {
  external?: boolean;
  isAbsoluteUrl?: boolean;
  dummy?: boolean;
  disabled?: boolean;
  setHovered?: React.Dispatch<React.SetStateAction<string | undefined>>;
  active?: boolean;
}

export function Link({ theme, className, external, isAbsoluteUrl, disabled, setHovered, active, dummy, to, id, ...props }: LinkProps): React.ReactElement {
  const componentClasses = classnames(
    'transition-all ease-in-out duration-200',
    { 'text-gray-800 dark:text-gray-200': disabled },
    (theme ?? Themes.Default).getText(),
    { 'cursor-pointer': dummy },
    { 'cursor-not-allowed': disabled },
    'hover:underline',
    { 'underline': active },
    className
  );
  if (dummy) {
    return <a className={componentClasses} {...props} onClick={e => {
      if (disabled) {
        e.stopPropagation();
        e.preventDefault();
      } else {
        props.onClick && props.onClick(e);
      }
    }}></a>
  } else if (external) {
    const link = to.toString();

    if (isAbsoluteUrl) {
      const normalizedLink = link.startsWith("http") ? link : "//" + link;
      return <a className={componentClasses} {...props} href={normalizedLink}></a>
    }

    return <a className={componentClasses} {...props} href={link}></a>
  }
  return <RouterLink to={to} className={componentClasses} onClick={e => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      props.onClick && props.onClick(e);
    }
  }} onMouseEnter={() => {
    if (setHovered) {
      setHovered(id);
    }
  }} onMouseLeave={() => {
    if (setHovered) {
      setHovered(undefined);
    }
  }} {...props} />
}