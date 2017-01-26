import qs from 'qs';
import { isEqual } from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  InstantSearch,
  Hits,
  Highlight,
  RefinementList,
  SearchBox,
} from 'react-instantsearch/dom';
import { connectCurrentRefinements } from 'react-instantsearch/connectors'

import './Search.css';

const algoliaAppId = '8H5CQDOJ8H';
const algoliaIndexName = 'quotes';
const algoliaAPIKey = 'f8360e504238b5fe0782757360782d61';

function transformItems(items) {
  return _.sortBy(items, "label")
}

const ClearAll = connectCurrentRefinements(({ refine, items }) => {
  return (
    <button
      disabled={items.length === 0}
      className="btn btn-default"
      onClick={refine.bind(null, items)}
    >
      <span className="icon icon-cancel-squared" />
    </button>)
})

const Hit = ({ hit }) =>
  <div className="hit">
    <div className="quote-text">
      "<Highlight attributeName="quote" hit={hit} />"
    </div>
    <div className="additional-info">
      <div className="author"><Highlight attributeName="author" hit={hit} /></div>
      <div>{hit.nationality}</div>
      <div>{hit.deathDate || hit.deathDate}</div>
      <div className="keywords"><Highlight attributeName="keywords" hit={hit} /></div>
    </div>
  </div>;

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
                    <SearchBox translations={{ placeholder: 'Search for quotes...' }} />
                  </li>
                  <li className="list-group-item">
                    <RefinementList attributeName="nationality" transformItems={transformItems} />
                  </li>
                  <li className="list-group-item">
                    <RefinementList attributeName="author" transformItems={transformItems} />
                  </li>
                  <div className="ais-PoweredBy__root">
                    Powered by Algolia
                  </div>
                </ul>
              </div>
              <div className="pane">
                <header className="toolbar toolbar-header">
                  <div className="toolbar-actions">
                    <ClearAll />
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
