import React from 'react';
 function SearchResults() {
    return (  
        <SearchContainer>
            <SearchHeader>
                <h4>{`Search results for '${'features'}'`}</h4>
            </SearchHeader>
        </SearchContainer>
    );
 }
 
 export default SearchResults;

 const SearchContainer = styled.div`
    flex: 0.7;
    overflow-y: scroll;
    flex-grow: 1;
    margin-top: 60px;
    width: 100%;
    height: 100%;
    margin-bottom: 90px;
`

const SearchHeader = styled.div`
    padding: 20px
    > h4 {
        color: var(--medium-grey);
        font-weight: 600;
  }
`