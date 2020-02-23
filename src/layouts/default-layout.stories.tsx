import * as React from "react"
import { Formik } from "formik"
import { Form, Input, SubmitButton } from "formik-antd"
import * as colors from "@ant-design/colors"
import { presetPalettes } from "@ant-design/colors"
import { Button, message, Menu, PageHeader, Tabs } from "antd"
import {
  ApplicationLayout,
  DefaultApplicationLayout,
  DefaultHeader,
} from "./default-layout"
import MenuItem from "antd/lib/menu/MenuItem"
import { PageContentContainer } from "../Formik/Layout"
import styled from "styled-components"

export default {
  title: "DefaultLayout",
}
const Header = DefaultApplicationLayout.HeaderMenu

const ContentContainer = styled.div`
  padding: 0 24px 24px 24px;
`

export const text = () => (
  <ApplicationLayout
    Header={
      <DefaultHeader>
        <MenuItem>hello</MenuItem>
      </DefaultHeader>
    }
    SideBar={
      <Menu mode="inline">
        {/* <Menu.SubMenu title="Sitzungen">
          <Menu.Item>Sitzung 1</Menu.Item>
          <Menu.Item>Sitzung 2</Menu.Item>
        </Menu.SubMenu> */}
        <Menu.Item>Anfragen</Menu.Item>
        <Menu.Item>Meine Anmeldungen</Menu.Item>
        <Menu.Item>Support</Menu.Item>
        {/* <Menu.SubMenu title="Support">
          <Menu.Item>Sitzung 1</Menu.Item>
          <Menu.Item>Sitzung 2</Menu.Item>
        </Menu.SubMenu> */}
      </Menu>
    }
  >
    <div>
      <PageHeader title="hello world"></PageHeader>
      <ContentContainer>
        <Tabs defaultActiveKey="1" style={{ flex: 1 }}>
          <Tabs.TabPane tab="Allgemein" key="1">
            <div style={{ height: "200", background: "white" }}></div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="2020" key="2" />
        </Tabs>
      </ContentContainer>
    </div>
  </ApplicationLayout>
)
