import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Body } from "./Body";
import accountIconSrc from "../assets/Icons/user.svg";
import cartIconSrc from "../assets/Icons/shopping-cart.svg";

export function MainLayout(){

    return(
        <>
        <Header accountIconSrc={accountIconSrc} cartIconSrc={cartIconSrc} />
        <Body />
        <Footer />
        </>
    )

}