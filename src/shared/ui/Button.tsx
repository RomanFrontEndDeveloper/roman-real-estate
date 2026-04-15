type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	type?: 'button' | 'submit';
	variant?: 'primary' | 'outline';
	className?: string;
};

export const Button = ({
	children,
	onClick,
	variant = 'primary',
	className = '',
}: ButtonProps) => {
	const base =
		'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 active:scale-95';

	const styles = {
		primary:
			'bg-[var(--gold)] text-black hover:shadow-[0_0_12px_rgba(201,169,110,0.6)]',
		outline:
			'border border-gray-700 text-gray-400 hover:border-[var(--gold)] hover:text-[var(--gold)]',
	};

	return (
		<button
			onClick={onClick}
			className={`${base} ${styles[variant]} ${className}`}
		>
			{children}
		</button>
	);
};
