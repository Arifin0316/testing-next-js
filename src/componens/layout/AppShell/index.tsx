import { useRouter } from "next/router"
import { Roboto } from "next/font/google"
import dynamic from "next/dynamic"

// denemik roting
const Navbar = dynamic(() => import("../Navbar"), { ssr: false })

type AppShellProps = {
    children: React.ReactNode
}
const DisebelNavbar = ["/auth/login", "/auth/register", "/404"]

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400","500","700","900"]
})
function AppShell(props: AppShellProps) {
    const { children } = props
    const {pathname} = useRouter()
    return (
        <div className={roboto.className}>
            {!DisebelNavbar.includes(pathname) && <Navbar/>}
            {children}
        </div>
    )
}

export default AppShell
