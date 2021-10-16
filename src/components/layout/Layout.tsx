import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps
{
    children: any
}

export default function Layout(props: LayoutProps)
{
    return (
        <div>
            <Header />
            {props.children}
            <Footer />
        </div>
    );
}