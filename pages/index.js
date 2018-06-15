import Link from 'next/link';
import Auth from './Auth';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Button from '../components/Button';

const auth = new Auth();
const Index = () => (
  <MuiThemeProvider>
      <Link href="/about">
        <button>About Page</button>
      </Link>
      <Button onClick={() => auth.login()}>Sign In</Button>
      <Button onClick={() => auth.logout()}>Log out</Button>
    <p>Hello Next.js</p>
  </MuiThemeProvider>
)

export default Index
