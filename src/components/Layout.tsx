import type {ReactNode} from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

interface Props {
    children: ReactNode;
}

const Layout = ({children} : Props) => {
    return (
        <>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
}
export default Layout;