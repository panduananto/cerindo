'use client'

import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { shipmentSchema } from '@/lib/validations/skpabean'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import Icons from '../ui/icons'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Textarea } from '../ui/textarea'

type Inputs = z.infer<typeof shipmentSchema>

const ShipmentForm = () => {
	const form = useForm<Inputs>({
		mode: 'onTouched',
		resolver: zodResolver(shipmentSchema),
		defaultValues: {
			shipmentType: 'sea',
			aircraft: '',
			goods: '',
			containerSerial: '',
			vessel: '',
			eta: '',
			tracking: '',
			trackingDate: '',
			invoice: '',
			invoiceDate: '',
			price: '',
		},
	})

	async function onSubmit(values: Inputs) {}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="grid grid-cols-6 gap-x-4 gap-y-6 p-6">
					<div className="col-span-6">
						<FormField
							control={form.control}
							name="shipmentType"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Jenis Shipment</FormLabel>
										<FormControl>
											<RadioGroup onValueChange={field.onChange} defaultValue="sea" className="flex items-center">
												<FormItem className="relative flex-1 space-y-0">
													<FormControl>
														<React.Fragment>
															<RadioGroupItem value="sea" id="sea" className="peer sr-only" />
															<Label
																htmlFor="sea"
																className={cn(
																	'group flex cursor-pointer flex-row-reverse items-center justify-between rounded border border-primary p-4',
																	'peer-data-[state=checked]:bg-primary/10 hover:bg-primary/10 [&:has([data-state=checked])]:bg-primary/10',
																)}
															>
																<Icons.checkCircle
																	className={cn(
																		'invisible size-4 stroke-[3]',
																		'peer-data-[state=checked]:group-[]:visible peer-data-[state=checked]:group-[]:text-primary',
																	)}
																/>
																Sea
															</Label>
														</React.Fragment>
													</FormControl>
												</FormItem>
												<FormItem className="relative flex-1 space-y-0">
													<FormControl>
														<React.Fragment>
															<RadioGroupItem value="air" id="air" className="peer sr-only" />
															<Label
																htmlFor="air"
																className={cn(
																	'group flex cursor-pointer flex-row-reverse items-center justify-between rounded border border-primary p-4',
																	'peer-data-[state=checked]:bg-primary/10 hover:bg-primary/10 [&:has([data-state=checked])]:bg-primary/10',
																)}
															>
																<Icons.checkCircle className="invisible size-4 stroke-[3] peer-data-[state=checked]:group-[]:visible peer-data-[state=checked]:group-[]:text-primary" />
																Air
															</Label>
														</React.Fragment>
													</FormControl>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					{form.getValues('shipmentType') === 'air' && (
						<div className="col-span-4">
							<FormField
								control={form.control}
								name="aircraft"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel htmlFor="aircraft">Kode penerbangan</FormLabel>
											<FormControl>
												<Input type="text" autoComplete="off" placeholder="Masukkan kode penerbangan..." {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
						</div>
					)}
					<div className="col-span-6">
						<FormField
							control={form.control}
							name="goods"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor="goods">Deskripsi Barang *</FormLabel>
										<FormControl>
											<Textarea autoComplete="off" placeholder="Masukkan deskripsi barang..." {...field} rows={4} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="col-span-3">
						<FormField
							control={form.control}
							name="containerSerial"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor="containerSerial">Party / Cont</FormLabel>
										<FormControl>
											<Input type="text" autoComplete="off" placeholder="Masukkan harga barang..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="col-span-3">
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor="price">Harga barang *</FormLabel>
										<FormControl>
											<Input type="text" autoComplete="off" placeholder="Masukkan harga barang..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="col-span-4">
						<FormField
							control={form.control}
							name="vessel"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor="vessel">Vessel *</FormLabel>
										<FormControl>
											<Input
												type="text"
												autoComplete="off"
												placeholder="Masukkan nama vessel pengangkut barang..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="col-span-2">
						<FormField
							control={form.control}
							name="eta"
							render={({ field }) => {
								const currentYear = new Date().getFullYear()

								return (
									<FormItem>
										<FormLabel htmlFor="eta">ETA *</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button variant="outline" className="w-full">
														{field.value ? (
															format(field.value, 'PPP')
														) : (
															<span className="text-muted-foreground">Pilih tanggal ETA</span>
														)}
														<Icons.calendar className="ml-auto size-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="end">
												<Calendar
													mode="single"
													captionLayout="dropdown-buttons"
													fromYear={currentYear - 5}
													toYear={currentYear + 5}
													selected={new Date(field.value)}
													onSelect={field.onChange}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="col-span-4">
						<FormField
							control={form.control}
							name="tracking"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor="tracking">B/L atau AWB *</FormLabel>
										<FormControl>
											<Input type="text" autoComplete="off" placeholder="Masukkan nomor B/L atau AWB..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="col-span-2">
						<FormField
							control={form.control}
							name="trackingDate"
							render={({ field }) => {
								const currentYear = new Date().getFullYear()

								return (
									<FormItem>
										<FormLabel htmlFor="trackingDate">Tanggal *</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button variant="outline" className="w-full">
														{field.value ? (
															format(field.value, 'PPP')
														) : (
															<span className="text-muted-foreground">Pilih tanggal dokumen</span>
														)}
														<Icons.calendar className="ml-auto size-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="end">
												<Calendar
													mode="single"
													captionLayout="dropdown-buttons"
													fromYear={currentYear - 5}
													toYear={currentYear + 5}
													selected={new Date(field.value)}
													onSelect={field.onChange}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="col-span-4">
						<FormField
							control={form.control}
							name="invoice"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor="invoice">Invoice *</FormLabel>
										<FormControl>
											<Input type="text" autoComplete="off" placeholder="Masukkan nomor invoice..." {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="col-span-2">
						<FormField
							control={form.control}
							name="invoiceDate"
							render={({ field }) => {
								const currentYear = new Date().getFullYear()

								return (
									<FormItem>
										<FormLabel htmlFor="invoiceDate">Tanggal invoice *</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button variant="outline" className="w-full">
														{field.value ? (
															format(field.value, 'PPP')
														) : (
															<span className="text-muted-foreground">Pilih tanggal invoice</span>
														)}
														<Icons.calendar className="ml-auto size-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="end">
												<Calendar
													mode="single"
													captionLayout="dropdown-buttons"
													fromYear={currentYear - 5}
													toYear={currentYear + 5}
													selected={new Date(field.value)}
													onSelect={field.onChange}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
				</div>
			</form>
		</Form>
	)
}

export default ShipmentForm
