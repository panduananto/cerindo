import React from 'react'

import SKPAir from './SKPAir'
import SKPSea from './SKPSea'

function SKP({ importir, shipment, ppjk }) {
	return shipment !== null && importir !== null ? (
		shipment.type === 'air' ? (
			<SKPAir importir={importir} shipment={shipment} ppjk={ppjk} />
		) : (
			<SKPSea importir={importir} shipment={shipment} ppjk={ppjk} />
		)
	) : (
		<p className="text-center">Data importir dan shipment belum terisi dengan benar.</p>
	)
}

export default SKP
