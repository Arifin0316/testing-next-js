import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

function Navbar() {
  const { data } = useSession();
  return (
    <nav className="fixed top-0 w-full bg-blue-600 p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">MyApp</h1>
        
        <div className="flex items-center space-x-4">
          {data && data.user ? (
            <>
              <span className="text-white font-medium">{data.user.name}</span>
              {data.user.image && (
                <Image src={data.user.image} alt="i" width={500} height={500} className="w-8 h-8 rounded-full" />
              )}
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
