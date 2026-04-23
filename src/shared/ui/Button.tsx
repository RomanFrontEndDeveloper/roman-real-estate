type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	type?: 'button' | 'submit';
	variant?: 'primary' | 'outline';
	className?: string;
	disabled?: boolean; // 🔥 додали
};

export const Button = ({
	children,
	onClick,
	type = 'button', // 🔥 дефолт
	variant = 'primary',
	className = '',
	disabled = false, // 🔥 дефолт
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
			type={type} // 🔥 тепер працює submit
			onClick={onClick}
			disabled={disabled} // 🔥 ключове
			className={`${base} ${styles[variant]} ${className} ${
				disabled ? 'opacity-40 cursor-not-allowed' : ''
			}`}
		>
			{children}
		</button>
	);
};
