type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	type?: 'button' | 'submit';
	variant?: 'primary' | 'outline';
	className?: string;
	disabled?: boolean;
};

export const Button = ({
	children,
	onClick,
	type = 'button',
	variant = 'primary',
	className = '',
	disabled = false,
}: ButtonProps) => {
	const base =
		'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 active:scale-95';

	const variantStyles =
		variant === 'primary'
			? 'bg-[var(--gold)] text-black hover:shadow-[0_0_12px_rgba(201,169,110,0.6)]'
			: 'border border-gray-700 text-gray-400 hover:border-[var(--gold)] hover:text-[var(--gold)]';

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${base} ${variantStyles} ${className} ${
				disabled && 'opacity-40 cursor-not-allowed'
			}`}
		>
			{children}
		</button>
	);
};
