'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Close, Search } from '../icons'
import { useRouter } from 'next/navigation'


export default function SearchForm() {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, isDirty },
	} = useForm<{ value: string }>({
		defaultValues: {
			value: ''
		},
	})

	const onSubmit: SubmitHandler<{ value: string }> = (data) => {
		console.log(data.value);
		if (data.value === '') {
			return null
		} else {
			router.replace(`/search?q=${data.value}`)
			reset()
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='w-[600px]'>
			<div className='relative flex items-center bg-zinc-100 h-[40px] rounded-full overflow-hidden'>
				<div className='flex w-full relative items-center'>
					<input id="name" placeholder='Пошук' {...register('value')} className="bg-transparent px-6 py-2 flex-1 h-full outline-none" />
					{isDirty &&
						<div className='absolute right-2 hover:cursor-pointer'>
							<Close onClick={() => reset()} />
						</div>
					}
				</div>
				<button type="submit" disabled={isSubmitting} className='flex items-center justify-center h-full w-[64px] bg-black p-2 text-white right-0 disabled:bg-zinc-400'>
					<Search size="24" />
				</button>
			</div>
		</form>
	)
}
