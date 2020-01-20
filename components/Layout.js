// components/Layout.js

function Layout(props) {
  return (
    <div className="page-layout">
      {props.children}
    </div>
  )
}

export default Layout;