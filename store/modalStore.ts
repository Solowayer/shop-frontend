import { create } from 'zustand'

type ModalState = {
	isOpen: boolean
	content: JSX.Element | null
	openModal: (content: JSX.Element) => void
	closeModal: () => void
}

export const useModalStore = create<ModalState>(set => ({
	isOpen: false,
	content: null,
	openModal: content => set({ isOpen: true, content }),
	closeModal: () => set({ isOpen: false, content: null })
}))
