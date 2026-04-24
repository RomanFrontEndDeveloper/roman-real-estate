'use client';

import { Button } from '@/shared/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title?: string;
	description?: string;
};

export const ConfirmModal = ({
	isOpen,
	onClose,
	onConfirm,
	title = 'Are you sure?',
	description = 'This action cannot be undone.',
}: Props) => {
	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<>
				{/* 🔥 BACKDROP */}
				<motion.div
					className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation(); // 🔥 блокує всі кліки назовні
						onClose();
					}}
				/>

				{/* 🔥 MODAL */}
				<motion.div
					className='fixed inset-0 flex items-center justify-center z-50 px-4'
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.9, opacity: 0 }}
					onClick={(e) => {
						e.stopPropagation(); // 🔥 захист від Link
					}}
				>
					<div
						className='bg-[var(--secondary)] rounded-2xl p-6 w-full max-w-sm shadow-xl border border-gray-700'
						onClick={(e) => e.stopPropagation()}
					>
						<h2 className='text-xl font-semibold text-white mb-2'>
							{title}
						</h2>

						<p className='text-gray-400 mb-6'>{description}</p>

						<div className='flex justify-end gap-3'>
							{/* ❌ CANCEL */}
							<Button
								variant='outline'
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									onClose();
								}}
							>
								Cancel
							</Button>

							{/* ✅ DELETE */}
							<Button
								className='bg-red-600 hover:bg-red-700 text-white'
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									onConfirm();
									onClose();
								}}
							>
								Delete
							</Button>
						</div>
					</div>
				</motion.div>
			</>
		</AnimatePresence>
	);
};
