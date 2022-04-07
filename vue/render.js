const h = (tag, props, children) => {
  return {
    tag,
    props,
    children
  }
}

const mount = (vnode, container) => {
  const element = vnode.el = document.createElement(vnode.tag)
  if (vnode.props) {
    for (prop in vnode.props) {
      if (prop.startsWith('on')) {
        element.addEventListener(prop.slice(2).toLowerCase(), vnode.props[prop])
      } else {
        element.setAttribute(prop, vnode.props[prop])
      }
    }
  }
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      element.textContent = vnode.children
    } else {
      vnode.children.forEach(item => {
        mount(item, element)
      })
    }
  }

  container.appendChild(element)
}