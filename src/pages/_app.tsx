import { ConfigProvider, Image, Layout, Row, theme as styles } from "antd";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Logo from "public/BrunaReisLogo.svg";
import { Auth } from "~/components/Header/Auth";
import { SiderMenu } from "~/components/Menu/SiderMenu";
import theme from "~/theme/theme.config";

import "~/styles/globals.css";

import Link from "next/link";
import { CompaniesDropdown } from "~/components/Header/CompaniesDropDown";
import { api } from "~/utils/api";

const { Header, Content, Footer, Sider } = Layout;

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const {
    token: { colorBgContainer },
  } = styles.useToken();

  return (
    <SessionProvider session={session}>
      <ConfigProvider theme={theme}>
        <Layout style={{ height: "100vh" }}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            // onBreakpoint={(broken) => {
            //   console.log(broken);
            // }}
            // onCollapse={(collapsed, type) => {
            //   console.log(collapsed, type);
            // }}
          >
            <Link href="/">
              <Image
                src={(Logo as { src: string }).src}
                preview={false}
                style={{ padding: "1rem", borderRadius: "15%" }}
                alt="Bruna Reis Logo"
              />
            </Link>
            <SiderMenu />
          </Sider>
          <Layout>
            <Header style={{ padding: 0 }}>
              <Row
                justify="end"
                align="middle"
                style={{ height: "100%", paddingRight: "1rem" }}
              >
                <CompaniesDropdown />
                <Auth />
              </Row>
            </Header>
            <Content style={{ margin: "24px 16px 0" }}>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
              >
                <Component {...pageProps} />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Cólera CRM ©{new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
