const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const MarkdownBlock = CompLibrary.MarkdownBlock /* Used to read markdown */
const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props
    const { baseUrl, docsUrl } = siteConfig
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    )

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    )

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    )

    return (
      <SplashContainer>
        <div className="inner">
          <h1>Hey, I'm ferhat — a passionate developer.</h1>
          <div className="percent-50">
            <h2>
              In this website, you can find information about me and the topics
              I'm interested.
            </h2>
            <h4>
              <i>a small intro</i>
            </h4>
            <h2>
              I studied computer science at{' '}
              <a href="https://www.cmpe.boun.edu.tr/">Bogazici University</a>{' '}
              and <a href="https://www.epfl.ch/schools/ic/">EPFL</a>.
            </h2>
            <h2>
              After studies, I worked at <a href="https://home.cern/">CERN</a>,{' '}
              <a href="https://www.unit9.com/">Unit9</a> and{' '}
              <a href="https://www.agflow.com/">AgFlow</a>. Right now, I am
              working as a senior software engineer at{' '}
              <a href="https://getstream.io/">Stream</a> to improve the
              efficiency and the performance of distributed backend systems and
              mostly leveraging go.
              <h2></h2>
              <h2>I like reading books and running a lot.</h2>
            </h2>
          </div>
          <PromoSection></PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props
    const { baseUrl } = siteConfig

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
      </div>
    )
  }
}

module.exports = Index
