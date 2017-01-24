import React, { PropTypes } from 'react';
import _ from 'lodash';

import ItemWrapper from '../ItemWrapper';
import StructDocument from './Document';


export default class DocumetsCollection extends React.Component {
  static propTypes = {
    moldPath: PropTypes.string,
    mold: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
    };

    this.instance = this.props.mold.child(this.props.moldPath);
    this.storage = this.instance.mold;
  }

  componentWillMount() {
  }

  _renderPages(pages) {
    return _.map(pages, (page, index) => {
      return <ItemWrapper name={`page${index}`}>
        {this._renderCollection(page, index)}
      </ItemWrapper>;
    });
  }

  _renderCollection(collection, pageNum) {
    return _.map(collection, (item, index) => {
      const moldPath = `${this.props.moldPath}[${item.$id}]`;
      const storagePath = `[${pageNum}][${index}]`;
      return <ItemWrapper name={index}>
        <StructDocument moldPath={moldPath}
                        mold={this.props.mold}
                        storage={_.get(this.storage, storagePath)} />
      </ItemWrapper>;
    });
  }


  render() {
    return (
      <div>
        {this._renderPages(this.storage)}
      </div>
    );
  }
}