export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 hover-scale custom-shadow';
  
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-blue-500 border-2 border-blue-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    ghost: 'bg-gray-100 hover:bg-gray-200 text-gray-700'
  };
  
  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6',
    lg: 'py-4 px-6'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}