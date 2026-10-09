import { Header } from "./Header";
import { Footer } from "./Footer";
import { Body } from "./Body";
import {Outlet } from "react-router-dom";

export function MainLayout(){

    return(
        <>
        <Header />
        <Body />
        <Outlet />
        <Footer />
        </>
    )

}