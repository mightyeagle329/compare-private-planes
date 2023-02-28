import { Link, useLocation } from "react-router-dom";

import cn from "classnames";
import styles from "./Footer.module.scss";

const Footer = () => {
  return <footer className={cn(styles.footer)}></footer>;
};

export default Footer;
