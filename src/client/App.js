import React, { Component } from 'react';
import PDFViewer from 'pdf-viewer-reactjs';
import { useLocation } from 'react-router-dom';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');
  }
  state = {
    url: '/uploads/loading.pdf',
  };
  getUrlParameter = name => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null
      ? ''
      : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
  componentDidMount() {
    //let location = useLocation();
    console.log(this);
    this.setState({ url: this.getUrlParameter('url') });
  }

  render() {
    return (
      <PDFViewer
        document={{
          url: this.state.url,
        }}
      />
    );
  }
}
