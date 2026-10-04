'use client'
import { useEffect } from "react";
import useUserState from "../hooks/useGlobalState";
import axios, { AxiosError, AxiosResponse } from "axios";

export default function CurrentUserFetch(){
  const [user, setUser] = useUserState();

  useEffect(()=> {
    if(user.isFetched){
      return 
    }


    if(localStorage.getItem('access-token')){
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/current/user';
      axios
        .get(url,{
          headers: {
            'access-token':localStorage.getItem('access-token'),
            'client':localStorage.getItem('client'),
            'uid':localStorage.getItem('uid'),
          },
        })
        .then((res:AxiosResponse) => {
          setUser({
            ...user,
            ...res.data,
            isSignedIn:true,
            isFetched:true,
          })
          //トークンがdevise側で変更されることへの措置
          const accessToken  = res.headers["access-token"]
          const client  = res.headers["client"]
          const uid  = res.headers["uid"]
          if (accessToken && client && uid) {
            localStorage.setItem("access-token", accessToken);
            localStorage.setItem("client", client);
            localStorage.setItem("uid", uid);
          }
        })
        .catch((err: AxiosError<{error:string}>) => {
          console.log(err.message)
          setUser({
            ...user,
            isFetched:true,
          })
        })
    } else{
      setUser({
        ...user,
        isFetched:true,
      })
    }
  }, [user,setUser])

  return<></>
}