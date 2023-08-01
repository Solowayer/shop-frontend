'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Search } from '../icons'
import { useRouter } from 'next/navigation'


export default function SearchForm() {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		setValue,
		formState: { isSubmitting },
	} = useForm<{ value: string }>({
		defaultValues: {
			value: ''
		},
	})

	const onSubmit: SubmitHandler<{ value: string }> = (data) => {
		console.log(data.value);
		router.replace(`/search?searchTerm=${data.value}`)
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setValue('value', value)
	}


	return (
		<form onSubmit={handleSubmit(onSubmit)} className='w-[600px]'>
			<div className='relative flex items-center bg-zinc-100 h-[40px] rounded-full overflow-hidden'>
				<input id="name" placeholder='Пошук' {...register('value')} onChange={handleChange} className="bg-transparent px-6 py-2 w-full h-full outline-none" />
				<button type="submit" disabled={isSubmitting} className='flex items-center justify-center h-full w-[64px] bg-black p-2 text-white right-0'>
					<Search size="24" />
				</button>
			</div>
		</form>
	)
}
