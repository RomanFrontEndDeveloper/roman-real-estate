export const PropertyCardSkeleton = () => {
	return (
		<div
			className='bg-[var(--secondary)] rounded overflow-hidden relative'
			aria-busy='true'
		>
			{/* shimmer */}
			<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]' />

			{/* image */}
			<div className='w-full h-[220px] bg-gray-700 animate-pulse' />

			{/* content */}
			<div className='p-4 space-y-3'>
				<div className='h-4 bg-gray-700 w-3/4 rounded animate-pulse' />
				<div className='h-3 bg-gray-700 w-1/2 rounded animate-pulse' />
			</div>
		</div>
	);
};
