import axios from "axios";

export default async function fetcher(url:string) {
  try{
      const response = await axios.get(url,{
        headers:{
        'access-token':localStorage.getItem('access-token'),
        'client':localStorage.getItem('client'),
        'uid':localStorage.getItem('uid'),
      }});
      const accessToken  = response.headers["access-token"]
      const client  = response.headers["client"]
      const uid  = response.headers["uid"]
      if (accessToken && client && uid) {
        localStorage.setItem("access-token", accessToken);
        localStorage.setItem("client", client);
        localStorage.setItem("uid", uid);
      }
      return response.data
    }
    catch(error){
      //axiosのエラーの場合はステータスと内容を表示
      if (axios.isAxiosError(error)) {
      console.log(error.response?.status)
      console.log(error.response?.data)
    } else {
      console.log('予期しないエラーが発生しました')
    }
    }
}