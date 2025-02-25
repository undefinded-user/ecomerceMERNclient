import axios from 'axios'

export const getProducts = async (count) => {
	return await axios.get(`${process.env.REACT_APP_API}/products/${count}`)
}

export const getSortedProducts = async (sort, order, page) => {
	return await axios.post(`${process.env.REACT_APP_API}/products/sorted`, {
		sort,
		order,
		page
	})
}

export const getProduct = async (slug) => {
	return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)
}

export const getPrepopulatedProduct = async (slug) => {
	return await axios.get(`${process.env.REACT_APP_API}/product/prepopulated/${slug}`)
}

export const createProduct = async (authtoken, info) => {
	return await axios.post(`${process.env.REACT_APP_API}/product`, info, {
		headers: {
			authtoken
		}
	})
}

export const updateProduct = async (slug, authtoken, product) => {
	return await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, {product}, {
		headers: {
			authtoken
		}
	})
}

export const removeProduct = async (slug, authtoken) => {
	return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
		headers: {
			authtoken
		}
	})
}

export const getTotal = async () => {
	return await axios.get(`${process.env.REACT_APP_API}/products/total`)
}