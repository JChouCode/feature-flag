import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
// import { Table } from 'reactstrap';

export const GET_FLAGS = gql`
  query {
    getFlags {
      feature
      description
      enabled
    }
  }
`;

export default () => (
  <Query query={GET_FLAGS}>
    {({ loading, data }) => {
      if (loading) {
        return "loading...";
      } else {
        return data.getFlags.map(flag => (
          <div className="card">
            <h3>{flag.feature}</h3>
            {/* <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
            <label class="checkbox-inline">
              <input type="checkbox" checked data-toggle="toggle"></input>
            </label> */}
            <p>{flag.description}</p>
            <p>{Boolean.toString(flag.enabled)}</p>
          </div>
        ))
      }
    }
    }
  </Query >
  // return <span>Test</span>;
)