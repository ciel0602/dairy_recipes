'use client'
import useUserState from "@/app/hooks/useGlobalState"
import { Link } from "@mui/material";

export default function RecipesTopPage() {
  const [user] = useUserState();

  return(
    <>
    {user.isFetched && (
      <>
        {user.isSignedIn &&(
          <>
              レシピトップページ
              <div>id:{user.id}</div>
              <div>名前：{user.name}</div>
              <div>email：{user.email}</div>
          </>
        )}
        {!user.isSignedIn && (
          <>
            <div>サインインしてください。</div>
            <Link href="/">サインインはこちら</Link>
          </>
        )}
      </>
    )}
    </>
  )
}