import React from 'react';
import { Tab } from 'semantic-ui-react';
import { fromJS } from 'immutable';
import Router from 'next/router';
import constants from '../utils/constants';
import fetchHelpers from '../utils/fetchHelper';
import registerUtils from '../utils/registerUtils';
const { postBusiness, getUserBusinesses } = fetchHelpers;
const { CURRENT_USER } = constants;
const { mapIdAsKey } = registerUtils;
export default class Dashboard extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            currentUser: fromJS({}),
            businesses: fromJS([{}]),
        };
        this.getPanes = () => [
            {
                menuItem: 'Register',
                render: () => savePlace
            }, { this: .savePlace },
            businesses = { this: .state.businesses },
            user = { this: .state.currentUser }
                /  >
                /Tab.Pane>,
        ];
    }
    componentDidMount() {
        if (!localStorage || !localStorage.getItem(CURRENT_USER)) {
            Router.push({ pathname: 'Login' });
        }
        if (localStorage && localStorage.getItem(CURRENT_USER)) {
            this.setState(() => ({ isLoading: true }));
            const currentUser = fromJS(JSON.parse(localStorage.getItem(CURRENT_USER)));
            getUserBusinesses({ userId: currentUser.get('_id') })
                .then(({ data }) => {
                console.groupCollapsed('componentDidMount ');
                console.log('data ', data);
                console.groupEnd();
                this.setState(() => ({
                    currentUser,
                    businesses: mapIdAsKey(['place_id'], fromJS(data)),
                    isLoading: false,
                }));
            });
        }
    }
    componentDidMount() {
        if (!localStorage || !localStorage.getItem(CURRENT_USER)) {
            Router.push({ pathname: 'Login' });
        }
        if (localStorage && localStorage.getItem(CURRENT_USER)) {
            this.setState(() => ({ isLoading: true }));
            const currentUser = fromJS(JSON.parse(localStorage.getItem(CURRENT_USER)));
            getUserBusinesses({ userId: currentUser.get('_id') })
                .then(({ data }) => {
                console.groupCollapsed('componentDidMount ');
                console.log('data ', data);
                console.groupEnd();
                this.setState(() => ({
                    currentUser,
                    businesses: mapIdAsKey(['place_id'], fromJS(data)),
                    isLoading: false,
                }));
            });
        }
    }
}
{
    menuItem: 'View',
        render;
    () => user;
    {
        this.state.currentUser;
    }
    businesses = { this: .state.businesses }
        /  >
        /Tab.Pane> ;
}
{
    menuItem: 'Account',
        render;
    () => Account;
    Page < /Tab.Pane>,;
}
;
savePlace = (place) => {
    const { businesses } = this.state;
    if (!this.state.businesses.has(place.place_id)) {
        postBusiness(fromJS(place)
            .set('userId', this.state.currentUser.get('_id'))
            .set('reviewUrl', `https://search.google.com/local/writereview?placeid=${place.place_id}`))
            .then(({ data }) => {
            this.setState(() => ({
                businesses: mapIdAsKey(['place_id'], fromJS(data)),
            }));
        })
            .catch((err) => console.error(err));
    }
};
render();
{
    return style = {};
    {
        height: '100vh';
    }
}
 >
    style;
{
    {
        position: 'relative';
    }
}
 >
    id;
"header-icon" >
    Social;
Media;
Invites
    < /Header>
    < div;
style = {};
{
    position: 'absolute',
        right;
    '3%',
        bottom;
    '50%',
    ;
}
    >
        style;
{
    {
        float: 'left';
    }
}
 >
    Nav;
Menu < /b>
    < /div>
    < div;
style = {};
{
    float: 'right';
}
 >
    welcome;
{
    this.state.currentUser.get('email');
}
!/span>
    < span > image;
here < /span>
    < /div>
    < /div>
    < /Segment>
    < Tab;
panes = { this: .getPanes() } /  >
    /div>;
;
//# sourceMappingURL=Dashboard.js.map