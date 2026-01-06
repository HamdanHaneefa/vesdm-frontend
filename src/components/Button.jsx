import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  type = 'button',
  disabled = false,
  icon: Icon,
  iconPosition = 'right',
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wide rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#007ACC] text-white hover:opacity-90 shadow-lg hover:shadow-xl",
    secondary: "bg-[#0F172A] text-white hover:bg-[#007ACC] shadow-lg",
    outline: "border-2 border-[#007ACC] text-[#007ACC] hover:bg-[#007ACC] hover:text-white",
    ghost: "border border-slate-200 text-slate-700 hover:border-[#007ACC] hover:text-[#007ACC]",
    danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-lg",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={18} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} />}
    </motion.button>
  );
};

export default Button;
