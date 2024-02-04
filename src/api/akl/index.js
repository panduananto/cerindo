import supabase from '../../supabase'

export const aklAPI = {
	fetch: async function (query) {
		return await supabase
			.from('item_akl')
			.select(
				`id, type, name, facility,
					akl:id_akl (id, brand_name, packaging, date, expiry_date, file_url),
					hscode:id_hscode (code, import_dutyfees, value_added_tax, income_tax_api, income_tax_non_api, lartas),
					country:id_country (code, name)`,
			)
			.eq('type', query)
	},
	downloadFile: async function (url) {
		return await supabase.storage.from('cerindo').download(`akl/${url}`)
	},
}
