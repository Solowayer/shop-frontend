'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@/components/ui'
import DefaultError from '@/components/layouts/default-error'
import ProfileService from '@/services/profile-service'

export default function Page() {
	const { data, isError, isLoading, refetch } = useQuery(['profile'], ProfileService.get)

	if (isLoading) {
		return <Spinner />
	}

	if (isError) {
		return <DefaultError reset={refetch} />
	}

	return <div>{data.firstName}</div>
}
