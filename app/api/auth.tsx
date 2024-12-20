import { NextRequest } from "next/server";
import Cookies from 'js-cookie';
export const  verifyToken = async(token:string)=>{

    try{
        console.log(token)
        const  Response = await fetch(`http://${process.env.NEXT_PUBLIC_LOCAL_IP}/v1/auth/admin/verifyToken`, {
            method:'POST',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        console.log(await Response.text())
        if(!Response.ok){
            throw new Error('Failed to verify token')
        }
        
        return true;
    }catch(error){
        console.log(error)
        throw new Error('Failed to verify token')   
    }
}

export const handleLogin = async(email:string,password:string,)=>{
    
    try{
        const Response = await fetch(`http://${process.env.NEXT_PUBLIC_LOCAL_IP}/v1/auth/admin/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
            
        });
        // console.log(await Response.text())
        if(Response.status === 401){
            throw new Error('Unauthorized access')
        }
        if(Response.status === 404){
            throw new Error('User not found')
        }
        if(!Response.ok){
            throw new Error('Failed to login')
        }
        const data = await Response.json();
        const token = data.token
        Cookies.set('token', token, { expires: 1 });

    }    
    catch(error){
        console.log(error)
        throw new Error('Failed to login')
    }
}
export const handleLogout = async()=>{
    try{
        Cookies.remove('token');
    }catch(error){
        console.log(error)
        throw new Error('Failed to logout')
    }
}
    
