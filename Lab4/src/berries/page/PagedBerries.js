import React, {Component} from 'react';

//import strings from '../../utils/strings.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { BrowserRouter as Switch, Redirect } from 'react-router-dom';

import { Pager } from 'react-bootstrap';

import LoadingText from '../../utils/loading.js';

class PagedBerries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      berriesList: undefined,
      loading: false,
      error: false
    };
  }

  async loadBerriesByPage(page) {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.get(`berry/?offset=${page * 20}`);
      const berriesList = response.data;
      this.setState({ loading: false, berriesList });
    } catch (e) {
      this.setState({ loading: false });
      this.setState({ error: true });
    }
  }

  async componentDidMount() {
    const requestedPage = this.props.match.params.page;
    await this.loadBerriesByPage(requestedPage);
  }

  async componentWillReceiveProps(nextProps) {
    const newPage = nextProps.match.params.page;
    const oldPage = this.props.match.params.page;

    if (newPage !== oldPage) {
      await this.loadBerriesByPage(newPage);
    }
  }

  render() {
    let body = null;
    const { match } = this.props;
    const { url } = match;

    if (this.state.loading) {
      body = <LoadingText/>
    } else if (this.state.berriesList !== undefined) {
      let prevButton = '';
      let nextButton = '';

      if (this.state.berriesList.next) {
        nextButton = <Pager.Item href={`/berries/page/${parseInt(match.params.page) + 1}`}>Next &rarr;</Pager.Item>
      } else {
        nextButton = <Pager.Item disabled href={`/berries/page/${parseInt(match.params.page) + 1}`}>Next &rarr;</Pager.Item>
      }
      if (this.state.berriesList.previous) {
        prevButton = <Pager.Item href={`/berries/page/${parseInt(match.params.page) - 1}`}>&larr; Previous</Pager.Item>
      } else {
        prevButton = <Pager.Item disabled href={`/berries/page/${parseInt(match.params.page) - 1}`}>&larr; Previous</Pager.Item>
      }

      let pagerInstance = (
        <Pager>
          {prevButton}
          {` Page ${match.params.page} `}
          {nextButton}
        </Pager>
      );
      body = (
        <div>
          <h2>Berries Page {match.params.page}</h2>
          {this.state.berriesList.results.map(function(obj, i) {
            return (
              <a href={`/berries/${obj.name}`}>
                <h3>{obj.name}</h3>
              </a>
            );
          })}
          {pagerInstance}
        </div>
      );
    } else if (this.state.error) {
      body = (
        <Switch><Redirect from={`${url}`} to={'/404'}/></Switch>
      );
    } else {
      body = <div />
    }

    return <div className="App-body">{body}</div>;
  }
}

export default PagedBerries;
