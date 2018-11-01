import React from 'react';
import PropTypes from 'prop-types';

// External Imports
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';

const MarkdownRenderer = (props: Object) => (
    <div className='renderer'>
        <ReactMarkdown source={props.value} plugins={[breaks]} escapeHtml={false}/>
    </div>
);

MarkdownRenderer.propTypes = {
    value: PropTypes.string.isRequired,
};

MarkdownRenderer.defaultProps = {
    value: '',
}

export default MarkdownRenderer;
