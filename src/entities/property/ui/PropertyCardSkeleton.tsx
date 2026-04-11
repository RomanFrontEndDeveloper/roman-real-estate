export const PropertyCardSkeleton = () => {
	return (
		<div className='bg-[var(--secondary)] rounded overflow-hidden relative'>
			<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]' />

			<div className='w-full h-[220px] bg-gray-700' />

			<div className='p-4 space-y-3'>
				<div className='h-4 bg-gray-700 w-3/4 rounded' />
				<div className='h-3 bg-gray-700 w-1/2 rounded' />
			</div>
		</div>
	);
};
