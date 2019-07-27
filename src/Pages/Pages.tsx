import * as React from "react"
import { IEntityItem } from "./types"
import { Router, RouteComponentProps } from "@reach/router"

interface Props extends RouteComponentProps {
  children: React.ReactNode
  templateColumns?: string
}

export const HorizontalSplit = ({
  templateColumns = "1fr 1fr",
  children,
}: Props) => (
  <div
    style={{
      display: "grid",
      gridGap: "20px",
      gridTemplateColumns: templateColumns,
    }}
  >
    {children}
  </div>
)

export const MasterDetailView = ({ item }: { item: IEntityItem }) => (
  <>
    <Router primary={false}>
      <item.list path={`${item.path}/*`} />
    </Router>
    <Router primary={false}>
      <item.new path={`${item.path}/new`} />
      {item.create && <item.create path={`${item.path}/create`} />}
      {item.batchCreate && (
        <item.batchCreate path={`${item.path}/batch-create`} />
      )}
      <item.detail path={`${item.path}/:id`} />
    </Router>
  </>
)

const MasterDetailContainer = (props: any) => (
  <div
    style={{
      display: "grid",
      gridGap: "20px",
      gridTemplateColumns: "2fr 3fr",
    }}
  >
    {props.children}
  </div>
)

interface IProps {
  items: IEntityItem[]
}

const Pages = (props: IProps) => (
  <>
    {props.items.map((item: IEntityItem, index) => (
      <MasterDetailContainer key={index}>
        <Router primary={false}>
          <item.list path={`${item.path}/*`} />
        </Router>
        <Router primary={false}>
          <item.new path={`${item.path}/new`} />
          {item.create && <item.create path={`${item.path}/create`} />}
          {item.batchCreate && (
            <item.batchCreate path={`${item.path}/batch-create`} />
          )}
          <item.detail path={`${item.path}/:id`} />
        </Router>
      </MasterDetailContainer>
    ))}
  </>
)

export { Pages }
