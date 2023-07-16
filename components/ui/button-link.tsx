'use client'

import React, { forwardRef } from 'react'
import Link, { LinkProps } from 'next/link'
import { ButtonProps } from './button'
import { Button } from './button'

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps & LinkProps

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink({ href, ...props }, ref) {
	return (
		<Link ref={ref} href={href} passHref>
			<Button
				fullWidth={props.fullWidth}
				intent={props.intent}
				align={props.align}
				size={props.size}
				shape={props.shape}
				disabled={props.disabled}
			>
				{props.children}
			</Button>
		</Link>
	)
})
