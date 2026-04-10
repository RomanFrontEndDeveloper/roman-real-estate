export const Logo = () => {
	return (
		<div className='flex items-center gap-3 cursor-pointer'>
			<svg
				width='40'
				height='40'
				viewBox='0 0 100 100'
				className='transition hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(201,169,110,0.6)]'
			>
				{/* дах */}
				<path
					d='M20 50 L50 25 L80 50'
					stroke='var(--gold)'
					strokeWidth='3'
					fill='none'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>

				{/* корпус */}
				<rect
					x='30'
					y='50'
					width='40'
					height='25'
					stroke='var(--gold)'
					strokeWidth='3'
					fill='none'
					rx='2'
				/>

				{/* двері */}
				<rect
					x='47'
					y='60'
					width='6'
					height='15'
					fill='var(--gold)'
					rx='1'
				/>
			</svg>

			{/* текст */}
			<div className='block leading-tight'>
				<div className='text-(--gold) text-sm font-semibold'>
					RomanRealEstate
				</div>
				<div className='text-[10px] tracking-widest text-gray-500'>
					REAL ESTATE
				</div>
			</div>
		</div>
	);
};
