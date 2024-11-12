import { useSession } from "next-auth/react";

function Profile() {
    const { data: session } = useSession();
  return (
    <div className='flex flex-col items-center justify-center mt-20 gap-6'>
        <h1 className="text-5xl font-bold">profile</h1>
        <p className="text-3xl font-bold">{session && session.user ? session.user.name : ""}</p>
    </div>
  )
}

export default Profile