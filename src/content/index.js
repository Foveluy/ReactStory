import React from 'react'
import { Route } from 'react-router-dom'
import markdown from '../rscomponent/markdown'
import { make } from '../rscomponent/codeblock'
import { withRouter, Redirect } from 'react-router-dom'

class MDXLoader extends React.Component {
  componentDidMount() {
    // this is a hack for prismjs
    make(true)
  }
  render() {
    const { MDXComponent } = this.props
    return <MDXComponent components={markdown()} />
  }
}

@withRouter
export default class Contentbody extends React.Component {
  shouldComponentUpdate(nextprop) {
    const { location } = this.props
    return location.pathname !== nextprop.location.pathname
  }

  render() {
    const { component, readme, location, siteConfig } = this.props
    console.log(location.pathname, siteConfig.gitpagePrefix)
    if (location.pathname === siteConfig.gitpagePrefix) {
      return <Redirect to={'/'} />
    }

    return (
      <div
        className="rs-body-markdown-body"
        style={{
          padding: 24,
          background: '#fff',
          width: '100%',
          maxWidth: 740
        }}
      >
        {readme ? <Route path={'/README'} component={() => <MDXLoader MDXComponent={readme.component} />} /> : null}
        {Object.keys(component).map((key, idx) => {
          return (
            <Route
              key={key}
              path={'/' + key.replace('_', '/')}
              component={() => <MDXLoader MDXComponent={component[key]} />}
            />
          )
        })}
      </div>
    )
  }
}
