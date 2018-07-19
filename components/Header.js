import { Button } from 'semantic-ui-react';
import Router from 'next/router';
const routeHandler = (action) => {
    Router.push({
        pathname: '/UserLogin',
        query: { action: action },
    });
};
const Header = ({ text }) => {
    return style = {};
    {
        display: 'flex', justifyContent;
        'space-between';
    }
};
 >
    id;
"header-icon" > { text } < /h1>
    < div >
    onClick;
{
    () => routeHandler('register');
}
 >
    Register
    < /Button>
    < Button;
primary;
onClick = {}();
routeHandler('login');
 >
    Login
    < /Button>
    < /div>
    < style;
jsx > {} `
        #header-icon {
          font-family: 'Shrikhand', cursive;
          color: red;
        }
        `;
/style>
    < /Segment>;
;
;
export default Header;
//# sourceMappingURL=Header.js.map