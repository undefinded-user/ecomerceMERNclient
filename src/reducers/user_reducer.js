export cosnt userReducer = (state={name: 'Bogdan'}, action) =>{
	switch(action.type) {
		case 'LOGGEDIN_USER':{
			return {...state, ...action.payload}
		}
		case 'LOGOUT':{
			return {...state, ...action.payload}
		}
		default:{
			return state 
		}
	}
}