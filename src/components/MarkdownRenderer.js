// @flow
import React from 'react';

// External Imports
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';

type P = {
    value: string,
}

const MarkdownRenderer = (props: P) => (
    <div className='renderer'>
        <ReactMarkdown source={props.value || ''} plugins={[breaks]}/>
    </div>
);

export default MarkdownRenderer;
