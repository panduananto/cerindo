import React from 'react'

import SKDOAir from './SKDOAir'
import SKDOSea from './SKDOSea'

function SKDO({ importir, shipment, ppjk }) {
	return shipment !== null && importir !== null ? (
		shipment.type === 'air' ? (
			<SKDOAir importir={importir} shipment={shipment} ppjk={ppjk} />
		) : (
			<SKDOSea importir={importir} shipment={shipment} ppjk={ppjk} />
		)
	) : (
		<p className="text-center">Data importir dan shipment belum terisi dengan benar.</p>
	)
}

export default SKDO
