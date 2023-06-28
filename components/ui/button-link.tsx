'use client'

import React, { ComponentProps } from 'react'
import Link from 'next/link'
import { ButtonProps } from './button'
import { Button } from './button'

type ButtonLinkProps = ComponentProps<'a'> & ButtonProps

export interface Props extends ButtonLinkProps {
	href: string
}

export function ButtonLink({ href, ...props }: Props) {
	return (
		<Link href={href} className="inline-flex" tabIndex={-1}>
			<Button
				fullWidth={props.fullWidth}
				intent={props.intent}
				align={props.align}
				size={props.size}
				shape={props.shape}
			>
				{props.children}
			</Button>
		</Link>
	)
}
