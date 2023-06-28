'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { buttonStyles } from './button'

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = ({ ...props }: AlertDialogPrimitive.AlertDialogPortalProps) => (
	<AlertDialogPrimitive.Portal {...props} />
)
AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName

const AlertDialogOverlay = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ ...props }, ref) => <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50" {...props} ref={ref} />)
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ ...props }, ref) => (
	<AlertDialogPortal>
		<AlertDialogOverlay />
		<AlertDialogPrimitive.Content
			ref={ref}
			className="fixed flex flex-col gap-4 top-[50%] z-50 left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] drop-shadow-lg focus:outline-none"
			{...props}
		/>
	</AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogTitle = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ ...props }, ref) => <AlertDialogPrimitive.Title ref={ref} className="text-lg font-bold" {...props} />)
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ ...props }, ref) => <AlertDialogPrimitive.Description ref={ref} className="text-sm text-zinc-500" {...props} />)
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Action>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ ...props }, ref) => (
	<AlertDialogPrimitive.Action ref={ref} {...props} className={buttonStyles({ intent: 'danger' })} />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ ...props }, ref) => (
	<AlertDialogPrimitive.Cancel ref={ref} {...props} className={buttonStyles({ intent: 'secondary' })} />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel
}
