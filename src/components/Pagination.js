// @flow
import React, { Component, Fragment } from 'react';

type P = {
    onscroll: Function,
    children: ?any,
}

export default class Pagination extends Component<P> {
  componentDidMount(): void {
    window.addEventListener('scroll', this.handleScrollEvent);
  }

  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.handleScrollEvent);
  }

  handleScrollEvent = (): void => {
    let offset = 10;
    if (
        this.getScrollTop() <=
        this.getDocumentHeight() - window.innerHeight - offset
    )
        return;
    if(this.props.onscroll) {
        this.props.onscroll();
    }
  };

  getScrollTop = (): number => {
    const scrollTop: any = document && document.scrollTop ? document.scrollTop : 0;
    const clientTop: any = document && document.clientTop ? document.clientTop : 0;
    return (
        (window.pageYOffset || scrollTop) - (clientTop || 0) ||
        0
    );
  };

  getDocumentHeight = (): number => {
    const body: HTMLBodyElement | Object = document && document.body ? document.body : {};
    const html: HTMLElement | Object = document && document.documentElement ? document.documentElement : {};

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  };

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}