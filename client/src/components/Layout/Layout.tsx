import Header from "../Header/Header";
import { ILayout } from "./types";
import style from "./Layout.module.css";

const Layout = ({ children, style: cssStyle }: ILayout) => {
  return (
    <div className="flex flex-col relative">
      <Header />
      <div className={`bg-background ${style.layout}`} style={cssStyle}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
