'use client'

import React, { CSSProperties, useMemo } from 'react'

import { Akl } from '@/types'
import {
	closestCenter,
	DndContext,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { deleteAkl, reorderAkl, selectAklById, selectAklIds, selectAllAkl } from '@/lib/store/features/akl/akl-slice'
import { useAppDispatch, useAppSelector } from '@/lib/store/store'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import Icons from './ui/icons'

import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import type { Row, RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
		headerClassName?: string
		rowClassName?: string
	}
}

const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
	const { attributes, listeners, setActivatorNodeRef } = useSortable({
		id: rowId,
	})

	return (
		<Button variant="ghost" size="icon" ref={setActivatorNodeRef} {...attributes} {...listeners}>
			<Icons.gripVertical className="size-5" />
			<span className="sr-only">Drag to reorder</span>
		</Button>
	)
}

const DraggableRow = ({ row }: { row: Row<Akl> }) => {
	const dispatch = useAppDispatch()
	const akl = useAppSelector((state) => selectAklById(state, row.original.id))

	const { transform, transition, setNodeRef, isDragging } = useSortable({
		id: row.original.id,
	})

	const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition: transition,
		opacity: isDragging ? 0.5 : 1,
		zIndex: isDragging ? 1 : 0,
		position: 'relative',
	}

	return (
		<Collapsible asChild>
			<React.Fragment>
				<tr ref={setNodeRef} style={style} className="border-b border-border">
					{row.getVisibleCells().map((cell) => {
						return (
							<td
								key={cell.id}
								className={cn(
									'whitespace-nowrap py-3 pl-4 pr-3 text-left text-sm uppercase tracking-normal text-slate-700',
									cell.column.columnDef.meta?.rowClassName ?? '',
								)}
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						)
					})}
				</tr>
				<CollapsibleContent asChild>
					<tr>
						<td colSpan={6}>
							<div className="grid grid-cols-12 gap-5 px-6 py-8">
								<div className="col-span-12 space-y-4 xl:col-span-6">
									<div className="grid grid-cols-4 gap-4">
										<div className="col-span-4 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-2">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												Kode AKL
											</p>
											<p className="mt-1 text-sm text-slate-700">{akl.id_akl.split('_').join(' ')}</p>
										</div>
										<div className="col-span-4 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												Tipe
											</p>
											<p className="mt-1 text-sm text-slate-700">{akl.type}</p>
										</div>
										<div className="col-span-4 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												HS Code
											</p>
											<p className="mt-1 text-sm text-slate-700">{akl.hscode.code}</p>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												Merek
											</p>
											<p className="mt-1 truncate text-sm text-slate-700">{akl.brand_name}</p>
										</div>
										<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												Kemasan
											</p>
											<p className="mt-1 truncate text-sm text-slate-700">{akl.packaging}</p>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												Negara asal
											</p>
											<p className="mt-1 text-sm text-slate-700">{akl.countries.name}</p>
										</div>
										<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												Kode negara asal
											</p>
											<p className="mt-1 text-sm text-slate-700">{akl.countries.code}</p>
										</div>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											Deskripsi
										</p>
										<p className="mt-1 truncate text-sm text-slate-700">{akl.name !== null ? akl.name : '-'}</p>
									</div>
								</div>
								<div className="col-span-12 space-y-4 xl:col-span-3">
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											Biaya masuk
										</p>
										<p className="relative mt-1 text-sm text-slate-700">
											{akl.hscode.import_dutyfees}
											<span className="absolute right-0 text-slate-400">&#37;</span>
										</p>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">PPN</p>
										<p className="relative mt-1 text-sm text-slate-700">
											{akl.hscode.value_added_tax}
											<span className="absolute right-0 text-slate-400">&#37;</span>
										</p>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											PPH &#40;API&#41;
										</p>
										<p className="relative mt-1 text-sm text-slate-700">
											{akl.hscode.income_tax_api} <span className="absolute right-0 text-slate-400">&#37;</span>
										</p>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											PPH &#40;Non-API&#41;
										</p>
										<p className="relative mt-1 block text-sm text-slate-700">
											{akl.hscode.income_tax_non_api}
											<span className="absolute right-0 text-slate-400">&#37;</span>
										</p>
									</div>
								</div>
								<div className="col-span-12 space-y-4 xl:col-span-3">
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											Tanggal AKL
										</p>
										<p className="mt-1 text-sm text-slate-700">{new Date(String(akl.date)).toLocaleDateString('id')}</p>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											Tanggal kadaluarsa AKL
										</p>
										<p className="mt-1 text-sm text-slate-700">
											{new Date(String(akl.expiry_date)).toLocaleDateString('id')}
										</p>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											Fasilitas
										</p>
										<p className="mt-1 text-sm text-slate-700">{akl.facility !== null ? akl.facility : '-'}</p>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											Lartas
										</p>
										<p className="mt-1 text-sm text-slate-700">
											{akl.hscode.lartas !== null ? akl.hscode.lartas : '-'}
										</p>
									</div>
								</div>
							</div>
							<div className="flex flex-row border-t border-slate-300 px-6 py-4 shadow-lg">
								<Button variant="destructive" onClick={() => dispatch(deleteAkl(akl.id))}>
									Hapus
								</Button>
							</div>
						</td>
					</tr>
				</CollapsibleContent>
			</React.Fragment>
		</Collapsible>
	)
}

const AklTable = () => {
	const dispatch = useAppDispatch()
	const aklIds = useAppSelector(selectAklIds) as UniqueIdentifier[]
	const allAkl = useAppSelector(selectAllAkl)

	const columnHelper = createColumnHelper<Akl>()
	const columns = useMemo(
		() => [
			columnHelper.display({
				id: 'dragHandle',
				header: '',
				cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
				meta: {
					headerClassName: 'pr-0',
					rowClassName: 'pr-0',
				},
			}),
			columnHelper.accessor('type', {
				header: 'Tipe',
				cell: ({ row }) => <span>{row.getValue('type')}</span>,
				meta: {
					headerClassName: 'hidden 2md:table-cell pl-0',
					rowClassName: 'hidden 2md:table-cell pl-0',
				},
			}),
			columnHelper.accessor('name', {
				header: 'Deskripsi',
				cell: ({ row }) => <span>{row.getValue('name')}</span>,
			}),
			columnHelper.accessor('countries', {
				header: 'Negara',
				cell: ({ row }) => <span>{`${row.original.countries.name} (${row.original.countries.code})`}</span>,
				meta: {
					headerClassName: 'hidden lg:table-cell',
					rowClassName: 'hidden lg:table-cell',
				},
			}),
			columnHelper.display({
				id: 'status',
				header: 'Status',
				cell: () => (
					<span className="inline-flex flex-row items-center gap-x-1 rounded-full bg-green-100 px-2 py-0.5 text-green-600">
						<Icons.checkCircle strokeWidth={3} className="size-3" />
						<span>Aktif</span>
					</span>
				),
			}),
			columnHelper.display({
				id: 'details',
				header: 'Details',
				cell: () => (
					<CollapsibleTrigger asChild>
						<Button variant="ghost" size="icon" className="border border-slate-300 hover:bg-muted">
							<Icons.chevronDown className="size-5" />
							<span className="sr-only">Open row details</span>
						</Button>
					</CollapsibleTrigger>
				),
				meta: {
					headerClassName: 'pl-0',
				},
			}),
		],
		[],
	)

	const table = useReactTable({
		data: allAkl,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => row.id,
	})

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (active && over && active.id !== over.id) {
			dispatch(
				reorderAkl({
					draggedId: String(active.id),
					targetId: String(over.id),
				}),
			)
		}
	}

	const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

	return (
		<DndContext
			collisionDetection={closestCenter}
			modifiers={[restrictToVerticalAxis]}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			<div className="flex max-w-full flex-auto flex-col overflow-auto">
				<table className="min-w-full">
					<thead className="w-full shadow-sm">
						{table.getHeaderGroups().map((headerGroup) => {
							return (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<th
												key={header.id}
												scope="col"
												colSpan={header.colSpan}
												className={cn(
													"sticky top-0 z-10 whitespace-nowrap bg-muted px-4 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-slate-300 after:content-['']",
													header.column.columnDef.meta?.headerClassName ?? '',
												)}
											>
												{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
											</th>
										)
									})}
								</tr>
							)
						})}
					</thead>
					{aklIds.length !== 0 ? (
						<tbody className="w-full overflow-y-auto">
							<SortableContext items={aklIds} strategy={verticalListSortingStrategy}>
								{table.getRowModel().rows.map((row) => {
									return <DraggableRow key={row.id} row={row} />
								})}
							</SortableContext>
						</tbody>
					) : (
						<tbody>
							<tr>
								<td colSpan={6}>
									<div className="m-6 rounded border-2 border-dashed border-slate-300 py-4 text-center">
										<p className="text-sm font-medium">Anda belum memilih izin AKL</p>
									</div>
								</td>
							</tr>
						</tbody>
					)}
				</table>
			</div>
		</DndContext>
	)
}

export default AklTable
