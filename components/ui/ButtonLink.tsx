'use client'

import React, { ComponentProps } from 'react'
import Link from 'next/link'
import { ButtonProps } from './Button'
import { Button } from './Button'

type ButtonLinkProps = ComponentProps<'a'> & ButtonProps

export interface Props extends ButtonLinkProps {
	href: string
}

export function ButtonLink({ href, ...props }: Props) {
	return (
		<Link href={href} className="inline-flex">
			<Button fullWidth={props.fullWidth} variant={props.variant}>
				{props.children}
			</Button>
		</Link>
	)
}
