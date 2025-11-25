import Link from 'next/link';

interface ButtonProps {
  buttonOutlineColor?: string;
  buttonText?: string;
  href?: string;
  onClick?: () => void;
}

export default function Button({ 
  buttonOutlineColor, 
  buttonText,
  href,
  onClick 
}: ButtonProps) {
  const buttonClasses = "rubik-regular px-8 md:px-12 lg:px-16 py-3 md:py-4 border-2 bg-transparent uppercase text-sm md:text-base lg:text-lg tracking-wide hover:opacity-80 hover:scale-105 transition-all duration-300 inline-block text-center";
  
  const buttonStyle = {
    borderColor: buttonOutlineColor,
    color: buttonOutlineColor,
  };

  // If href is provided, render as Link
  if (href) {
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