import React from 'react';
import { Button } from 'semantic-ui-react';
import { fromJS } from 'immutable';
export default class BusinessesView extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            copied: fromJS({}),
        };
        this.copyToClipBoard = (url, placeId) => {
            navigator.clipboard.writeText(url)
                .then(() => {
                this.setState(({ copied }) => ({ copied: copied.set(placeId, placeId) }));
                setTimeout(() => {
                    this.setState(({ copied }) => ({ copied: copied.delete(placeId) }));
                }, 3000);
            })
                .catch(err => console.error(err));
        };
    }
    render() {
        const { businesses } = this.props;
        return {
            businesses: .valueSeq().map((b, i) => {
                return key = { i };
                style = {};
                {
                    padding: 60;
                }
            },  >
                { b: .get('name') } < /b>
                < br /  >
                { b: .get('formatted_address') } < /span>
                < Button, style = {}, { width: 165, float: 'right' })
        };
        onClick = {}();
        this.copyToClipBoard(b.get('reviewUrl'), b.get('place_id'));
    }
}
    >
        { this: .state.copied.has(b.get('place_id')) ? 'Copied!' : 'Copy to Clipboard' }
    < /Button>
    < /div>;
;
/ol> ;
;
//# sourceMappingURL=BusinessesView.js.map