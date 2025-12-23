import Link from 'next/link';

interface ButtonProps {
  buttonOutlineColor?: string;
  buttonText?: string;
  href?: string;
  onClick?: () => void;
  openInNewTab?: boolean;
}

export default function Button({ 
  buttonOutlineColor, 
  buttonText,
  href,
  onClick,
  openInNewTab = false
}: ButtonProps) {
  const buttonClasses = "rubik-regular px-8 md:px-12 lg:px-16 py-3 md:py-4 border-2 bg-transparent uppercase text-sm md:text-base lg:text-lg tracking-wide hover:opacity-80 hover:scale-105 transition-all duration-300 text-center sm:text-center md:text-center inline-block";
  
  const buttonStyle = {
    borderColor: buttonOutlineColor,
    color: buttonOutlineColor,
  };

  // If href is provided, render as Link
  if (href) {
    // External link or new tab
    if (openInNewTab || href.startsWith('http')) {
      return (
        <a
          href={href}
          className={buttonClasses}
          style={buttonStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonText}
        </a>
      );
    }
    
    // Internal link
    return (
      <Link
        href={href}
        className={buttonClasses}
        style={buttonStyle}
      >
        {buttonText}
      </Link>
    );
  }

  // Otherwise, render as button with onClick
  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      style={buttonStyle}
    >
      {buttonText}
    </button>
  );
}