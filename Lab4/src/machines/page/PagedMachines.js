import React, {Component} from 'react';

//import strings from '../../utils/strings.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { BrowserRouter as Switch, Redirect } from 'react-router-dom';

import { Pager } from 'react-bootstrap';

import LoadingText from '../../utils/loading.js';

class PagedMachines extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machinesList: undefined,
      loading: false,
      error: false
    };
  }

  async loadMachinesByPage(page) {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.get(`machine/?offset=${page * 20}`);
      const machinesList = response.data;
      this.setState({ loading: false, machinesList });
    } catch (e) {
      this.setState({ loading: false });
      this.setState({ error: true });
    }
  }

  async componentDidMount() {
    const requestedPage = this.props.match.params.page;
    await this.loadMachinesByPage(requestedPage);
  }

  async componentWillReceiveProps(nextProps) {
    const newPage = nextProps.match.params.page;
    const oldPage = this.props.match.params.page;

    if (newPage !== oldPage) {
      await this.loadMachinesByPage(newPage);
    }
  }

  render() {
    let body = null;
    const { match } = this.props;
    const { url } = match;

    if (this.state.loading) {
      body = <LoadingText/>
    } else if (this.state.machinesList !== undefined) {
      let prevButton = '';
      let nextButton = '';

      if (this.state.machinesList.next) {
        nextButton = <Pager.Item href={`/machines/page/${parseInt(match.params.page) + 1}`}>Next &rarr;</Pager.Item>
      } else {
        nextButton = <Pager.Item disabled href={`/machines/page/${parseInt(match.params.page) + 1}`}>Next &rarr;</Pager.Item>
      }
      if (this.state.machinesList.previous) {
        prevButton = <Pager.Item href={`/machines/page/${parseInt(match.params.page) - 1}`}>&larr; Previous</Pager.Item>
      } else {
        prevButton = <Pager.Item disabled href={`/machines/page/${parseInt(match.params.page) - 1}`}>&larr; Previous</Pager.Item>
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
          <h2>Machines Page {match.params.page}</h2>
          {this.state.machinesList.results.map(function(obj, i) {
            let id = obj.url.match(/([^\/]*)\/*$/)[1];
            return (
              <a href={`/machines/${id}`}>
                <h3>Machine {id}</h3>
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

export default PagedMachines;
