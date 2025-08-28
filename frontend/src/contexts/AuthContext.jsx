import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

let AuthContext = createContext()

 let AuthReducer =(state,action)=>{
        switch (action.type) {
            case "LOGIN":
             localStorage.setItem('admin',JSON.stringify(action.payload))
          return {admin: action.payload}
                case "LOGOUT":
                    localStorage.removeItem('admin')
                console.log('action hit logout')
             return {admin:null}
            default:
              return state
        }
    }
    
let AuthContextProvider = ({children}) =>{
   
let[state,dispatch]=useReducer(AuthReducer,{
        admin:null,

    })
useEffect(()=>{
try{    
    axios.get('/api/admins/me').then(res => {
        let admin = res.data;

        if(admin){
        dispatch({type: 'LOGIN',payload:admin})
    }else{
        dispatch({type:"LOGOUT"})
    }})
    }catch(e){
        dispatch({type:"LOGOUT"})
    }
},[])

// dispatch({type:"LOGIN",payload:"Kaung Zin Thu"})
 return (
    <AuthContext.Provider value={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>
 )
}


export {AuthContext,AuthContextProvider}