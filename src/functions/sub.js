import axios from 'axios'

export const getSubs = async () => {
	return await axios.get(`${process.env.REACT_APP_API}/subs`)
}

export const getSub = async (slug) => {
	return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)
}

export const createSub = async (authtoken, sub, category) => {
	return await axios.post(`${process.env.REACT_APP_API}/sub`, {name : sub, parent : category}, {
		headers: {
			authtoken
		}
	})
}

export const updateSub = async (slug, authtoken, sub, category) => {
	return await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, {name:sub, parent:category}, {
		headers: {
			authtoken
		}
	})
}

export const removeSub = async (slug, authtoken) => {
	return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
		headers: {
			authtoken
		}
	})
}