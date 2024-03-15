import { ROUTES } from "@constants/Routes";
import { Link } from "react-router-dom";
import CardPresentation from '@components/molecules/CardPresentation';
import { LandingPageInfos } from "@constants/PagesInfo";

const LandingPage = () => {
    return (
        <>
            <header className="fixed top-0 left-0 flex justify-center items-center w-full z-50">
                <nav className="container mx-auto p-8 bg-primary rounded-xl m-1 flex justify-between transform  origin-[33%_75%]">
                    <h1 className="">
                        <Link to={ROUTES.HEADECOEUR_PRODUCTS + '/alwadi'}>
                            <span className="font-extrabold text-main">Command</span>
                            <span className="font-extrabold text-white">&apos;Heure</span>
                        </Link>
                    </h1>
                    <nav className="text-white space-x-24 flex">
                        {/* <a href="">Fournisseurs</a>
                    <a href="">Contact</a>
                    <a href="">Code</a>
                    <a href="">Secteurs</a> */}
                    </nav>
                </nav>
            </header>
            <main className="text-primary font-sans">
                <section style={{ backgroundImage: "url(/pattern2.svg)" }} className="flex justify-center items-center h-screen flex-col space-y-5 bg-no-repeat bg-cover">
                    <h2 className="text-5xl font-serif text-primary text-center w-1/2">{LandingPageInfos.title}</h2>
                    <Link to={ROUTES.HEADECOEUR_PRODUCTS + '/alwadi'} className="bg-main font-bold p-5 text-white rounded-2xl transform hover:scale-105 hover:duration-300 hover:ease-in-out ">ESSAYER LE COMMAND'HEURE</Link>
                </section>

                <section style={{ backgroundImage: "url(/benner.jpg)" }} className="flex flex-row space-x-48 justify-center items-center h-screen bg-cover">
                    {LandingPageInfos.presentation.map((item, index) => <CardPresentation key={index} {...item} />)}
                </section>
            </main>
        </>
    );
};

export default LandingPage;

