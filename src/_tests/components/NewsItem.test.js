import React from 'react';
/* import {shallow, mount} from 'enzyme'; */
import { createShallow , createMount, type ReactWrapper } from '@material-ui/core/test-utils';

// Components
import NewsItem from '../../components/NewsItem';
import Pulse from '../../components/Pulse';
import Typography from '@material-ui/core/Typography';

describe('NewsItem component', () => {
    let shallow: ShallowWrapper;
    let mount: ShallowWrapper;
    
    beforeEach(() => {
        shallow = createShallow(); // Necassary for Material-UI's "withStyles()"
        mount = createMount();
    });

    afterEach(() => {
        mount.cleanUp();
    });

    it('[NewsItem] Testing render', () => {
        const component: ShallowWrapper = shallow(<NewsItem />);
        expect(component).toMatchSnapshot();
    });

    // Testing title props
    it('[NewsItem] Testing props: "Title"', () => {
        const title: string = 'Hello Test';

        const component: ShallowWrapper = shallow(<NewsItem title={title} />).dive();
        expect(component.find(Typography).findWhere(x => x.text() === title).length).toBe(1);
    });

    // Testing subtitle props
    it('[NewsItem] Testing props: "Subtitle"', () => {
        const subtitle: string = 'Hello Test';

        const component: ShallowWrapper = shallow(<NewsItem subtitle={subtitle} />).dive();
        expect(component.find(Typography).findWhere(x => x.text() === subtitle).length).toBe(1);
    });

    // Testing image props
    it('[NewsItem] Testing props: "Image"', () => {
        const IMAGE_PATH: string = 'https://MYIMAGE.com/';

        const component: ShallowWrapper = shallow(<NewsItem image={IMAGE_PATH} />).dive();
        expect(component.find('img').first()).toBeDefined();
        expect(component.find('img').first().prop('src')).toEqual(IMAGE_PATH);
    });

    // Testing highlight props
    it('[NewsItem] Testing props: "Highlight"', () => {
        // Should not render a Pulse component
        const noHighlightComp: ShallowWrapper = shallow(<NewsItem />).dive();
        expect(noHighlightComp.find(Pulse).length).toBe(0);

        // Should render a Pulse component
        const highlightText: string = 'Hello';
        const highlightComp: ShallowWrapper = shallow(<NewsItem highlight={highlightText}/>).dive();
        expect(highlightComp.find(Pulse).length).toBe(1);

        // Check if Pulse component has correct props label
        expect(highlightComp.find(Pulse).prop('label')).toEqual(highlightText);
    });
});