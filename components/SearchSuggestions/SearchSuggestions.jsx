require('./SearchSuggestions.scss')

import React, { Component, PropTypes } from 'react'
import StandardListItem from '../StandardListItem/StandardListItem'
import Panel from '../Panel/Panel'
import classNames from 'classnames'

// properties: onSuggestionSelect, recentSearch, popularList
class SearchSuggestions extends Component {
  constructor(props) {
    super(props)

    this.state = { iSEmpty: true }
  }

  handleClick(term, evt) {
    evt.stopPropagation()
    this.props.onSuggestionSelect.apply(this, [term])
  }

  render() {
    const recentList = this.props.recentSearch
    const popularList = this.props.popularSearch

    const suggestionItem = (term, i) => {
      let labelDOM = term
      if (this.props.searchTerm.length > 0) {
        const idx = term.toLowerCase().indexOf(searchTerm.toLowerCase())
        if (idx !== -1) {
          labelDOM = (
            <span>
              { term.substring(0, idx) }
              <strong>{ searchTerm }</strong>
              { term.substring(idx + searchTerm.length) }
            </span>
          )
        }
      }
   
      return (
        <li key={ i } onClick={ this.handleClick.bind(this, term) }>
          <StandardListItem labelText={ labelDOM } showIcon={ false } />
        </li>
      )
    }

    const recentSearches = !recentList ? '' : (
			<div className="recent-search-suggestions">
				<Panel>
					<div className="panel-header">
						<div className="label">Recent Search</div>
						<div className="recent-search-panel-actions transition">
							<div className="recent-search-panel-action">
								<a href="javascript:;">Edit</a>
							</div>
						</div>
					</div>
					<div className="panel-body">
						<ul className="search-suggestion-result-list">
							{	recentList.map(suggestionItem) }
						</ul>
							{
								popularList ? '' :  (
									<a href="javascript:;" className="footer-link transition">
										Learn more about the new Search here
									</a>
								)
							}
					</div>
				</Panel>
			</div>
		)

    const popularSearch = !popularList ? '' :(
			<div className="popular-search-suggestions">
				<Panel>
					<div className="panel-header">
						<div className="label">Popular</div>
					</div>
					<div className="panel-body">
						<ul className="search-suggestion-result-list">
							{ popularList.map(suggestionItem) }
						</ul>
					</div>
				</Panel>
			</div>
		)
    const ssClasses = classNames(
      'SearchSuggestions',
      { 'empty-state' : recentList && !popularList }
    )

    return (
			<div className={ ssClasses }>
				{ popularSearch }
				{ recentSearches }
			</div>
		)
  }
}

SearchSuggestions.propTypes = {
  onSuggestionSelect    : PropTypes.func.isRequired,
  recentSearch          : PropTypes.array,
  popularList           : PropTypes.array,
  searchTerm            : PropTypes.string
}

SearchSuggestions.defaultProps = {
  recentSearch          : [],
  popularList           : [],
  searchTerm            : ''
}

export default SearchSuggestions