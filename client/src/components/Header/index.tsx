import Link from 'next/link'
import { Navbar, Container } from 'react-bootstrap';

function Header({ currentUser }: any) {

    const links = [
        !currentUser && { label: 'Sign Up', href: '/user/signup' },
        !currentUser && { label: 'Sign In', href: '/user/signin' },
        currentUser && { label: 'Sign Out', href: '/user/signout' }
    ]
        .filter(linkConfig => linkConfig)
        .map(({ label, href }) => {
            return (
                <li key={href} className='nav-item'>
                    <Link href={href}>
                        <a className='nav-link'>{label}</a>
                    </Link>
                </li>
            )
        });

    return (
        <Navbar expand="lg" className="bg-body-tertiary" >
            <Container>
                <Link className="navbar-brand" href="/">
                    G-Tix
                </Link>

                <div className="d-flex justify-content-end">
                    <ul className="nav d-flex align-items-center">
                        {links}
                    </ul>
                </div>
            </Container>
        </Navbar>
    )
}

export default Header;