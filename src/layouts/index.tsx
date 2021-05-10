import Header from "../components/header"
import styles from "./index.module.scss";

// 今はよく分からない
type LayoutProps = {
  children: React.ReactNode;
};
// headerとmainのcomponentを一つにしたMainLayoutというcomponentを作成
function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {/* header部分 */}
      <Header />
      {/* main部分 */}
      <main className={styles.main}>{children}</main>
    </>
  );
}

export default MainLayout;