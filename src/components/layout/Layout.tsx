import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps
{
    children: any
}

export default function Layout(props: LayoutProps)
{
    return (
        <div className="container-fluid page-container">
            <Header />
                {props.children}
            <Footer />
        </div>
    );
}