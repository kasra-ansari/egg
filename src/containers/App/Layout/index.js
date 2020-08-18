import React from "react";

const Layout = props => (
    <>
        <header>this is header</header>
        <section>{props.children}</section>
        <footer>this is footer</footer>

    </>
)

export default Layout;