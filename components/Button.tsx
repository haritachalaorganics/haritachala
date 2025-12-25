'use client';

import Link from 'next/link';

interface ButtonProps {
  buttonOutlineColor?: string;
  buttonText?: string;
  href?: string;
  onClick?: () => void;
  openInNewTab?: boolean;
  variant?: 'default' | 'product-view' | 'all-products';
}

export default function Button({ 
  buttonOutlineColor, 
  buttonText,
  href,
  onClick,
  openInNewTab = false,
  variant = 'default'
}: ButtonProps) {
  // Determine hover class based on variant
  const getHoverClass = () => {
    if (variant === 'product-view') {
      return 'hover-light-pink';
    } else if (variant === 'all-products') {
      return 'hover-pink-foreground';
    }
    return 'hover:opacity-80';
  };

  const buttonClasses = `rubik-regular px-8 md:px-12 lg:px-16 py-3 md:py-4 border-2 bg-transparent uppercase text-sm md:text-base lg:text-lg tracking-wide hover:scale-105 transition-all duration-300 text-center sm:text-center md:text-center inline-block rounded-lg ${getHoverClass()}`;
  
  const buttonStyle = {
    borderColor: buttonOutlineColor,
    color: buttonOutlineColor,
  };

  // If href is provided, render as Link
  if (href) {
    // External link or new tab
    if (openInNewTab || href.startsWith('http')) {
      return (
        <>
          <a
            href={href}
            className={buttonClasses}
            style={buttonStyle}
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonText}
          </a>
          <style jsx>{`
            .hover-light-pink:hover {
              background-color: #FFB3D9 !important;
              border-color: #FFB3D9 !important;
            }
            .hover-pink-foreground:hover {
              background-color: #FF69B4 !important;
              border-color: #FF69B4 !important;
              color: #FFB3D9 !important;
            }
          `}</style>
        </>
      );
    }
    
    // Internal link
    return (
      <>
        <Link
          href={href}
          className={buttonClasses}
          style={buttonStyle}
        >
          {buttonText}
        </Link>
        <style jsx>{`
          .hover-light-pink:hover {
            background-color: #FFB3D9 !important;
            border-color: #FFB3D9 !important;
          }
          .hover-pink-foreground:hover {
            background-color: #FF69B4 !important;
            border-color: #FF69B4 !important;
            color: #FFB3D9 !important;
          }
        `}</style>
      </>
    );
  }

  // Otherwise, render as button with onClick
  return (
    <>
      <button
        onClick={onClick}
        className={buttonClasses}
        style={buttonStyle}
      >
        {buttonText}
      </button>
      <style jsx>{`
        .hover-light-pink:hover {
          background-color: #FFB3D9 !important;
          border-color: #FFB3D9 !important;
        }
        .hover-pink-foreground:hover {
          background-color: #FF69B4 !important;
          border-color: #FF69B4 !important;
          color: #FFB3D9 !important;
        }
      `}</style>
    </>
  );
}