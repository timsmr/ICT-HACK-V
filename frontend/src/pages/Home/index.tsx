import React from "react";
import Button from "shared/components/Button";
import Footer from "shared/components/Footer";
import Header from "shared/components/Header";
import { Content } from "./components/Content";

import styles from "./index.module.scss";

export function Home() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}

export default Home;
