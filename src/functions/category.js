import axios from 'axios'

export const getCategories = async () => {
	return await axios.get(`${process.env.REACT_APP_API}/categories`)
}

export const getCategory = async (slug) => {
	return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`)
}

export const createCategory = async (authtoken, category) => {
	return await axios.post(`${process.env.REACT_APP_API}/category`, {name : category}, {
		headers: {
			authtoken
		}
	})
}

export const updateCategory = async (slug, authtoken, category) => {
	return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, {name:category}, {
		headers: {
			authtoken
		}
	})
}

export const removeCategory = async (slug, authtoken) => {
	return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
		headers: {
			authtoken
		}
	})
}

export const getParentSubs = async (_id) => {
	return await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`)
}