type InputProps = {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	type?: string;
	disabled?: boolean; // 👈 ДОДАТИ
};

export const Input = ({
	value,
	onChange,
	placeholder,
	type = 'text',
	disabled,
}: InputProps) => {
	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled} // 👈 ДОДАТИ
			className='
        px-4 py-2
        bg-[var(--secondary)]
        border border-gray-700
        text-white
        rounded
        w-full sm:w-[250px]
        focus:outline-none
        focus:border-[var(--gold)]
        focus:shadow-[0_0_8px_rgba(201,169,110,0.4)]
      '
		/>
	);
};
