import qs from 'qs';
import { isEqual } from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  InstantSearch,
  Hits,
  Highlight,
  RefinementList,
  PoweredBy,
  SearchBox,
} from 'react-instantsearch/dom';
import './Search.css';

const algoliaAppId = 'latency';
const algoliaIndexName = 'ikea';
const algoliaAPIKey = '6be0576ff61c053d5f9a3225e2a90f76';
const attributeToDisplay = 'description';

const Hit = ({ hit }) =>
  <p className="hit">
    <Highlight attributeName={attributeToDisplay} hit={hit} />
  </p>;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchState: {
        ...qs.parse(this.props.router.location.query)
      }
    };
  }

  componentWillReceiveProps() {
    this.setState({
      searchState: qs.parse(this.props.router.location.query)
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state.searchState, nextState.searchState);
  }

  onSearchStateChange(nextSearchState) {
    const THRESHOLD = 700;
    const newPush = Date.now();
    this.setState({ lastPush: newPush, searchState: nextSearchState });
    if (this.state.lastPush && newPush - this.state.lastPush <= THRESHOLD) {
      this.props.router.replace(nextSearchState
        ? `?${qs.stringify(nextSearchState)}`
        : '');
    } else {
      this.props.router.push(nextSearchState
        ? `?${qs.stringify(nextSearchState)}`
        : '');
    }
  }

  createURL = state => `?${qs.stringify(state)}`;

  render() {
    return (
      <InstantSearch
        appId={algoliaAppId} apiKey={algoliaAPIKey} indexName={algoliaIndexName}
        searchState={this.state.searchState}
        onSearchStateChange={this.onSearchStateChange.bind(this)}
        createURL={this.createURL.bind(this)}
      >
        <div className="window">
          <div className="window-content">
            <div className="pane-group">
              <div className="pane-sm sidebar">
                <ul className="list-group">
                  <li className="list-group-header">
                    <SearchBox translations={{ placeholder: 'Search...' }} />
                  </li>
                  <li className="list-group-item">
                    <RefinementList attributeName="colors" />
                  </li>
                  <div className="ais-PoweredBy__root">
                    Powered by Algolia
                  </div>
                </ul>
              </div>
              <div className="pane">
                <header className="toolbar toolbar-header">
                  <div className="toolbar-actions">
                    <button className="btn btn-default pull-right">
                      <span className="icon icon-home" />
                    </button>
                  </div>
                </header>
                <div className="after-header">
                  <div className="hits">
                    <Hits hitComponent={Hit} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </InstantSearch>
    );
  }
}

Search.propTypes = {
  router: React.PropTypes.object.isRequired
};

export default withRouter(Search);
