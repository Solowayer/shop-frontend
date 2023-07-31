'use client'

import { useSellerRedirect } from '@/lib/hooks/useSellerRedirect'
import React from 'react'

export default function SellerDashboard() {
	useSellerRedirect()
	return <div>Головна</div>
}
