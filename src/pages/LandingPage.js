import Logo from '../components/Logo';
import main from '../assets/images/main.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return(
        <Wrapper>
        <main>
            <nav>
                <Logo/>
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        job <span>traking</span> app
                    </h1>
                    <p>
                    Mlkshk humblebrag bitters, kitsch knausgaard shaman marxism narwhal selvage raw denim you probably haven't heard of them. Meggings skateboard retro, selvage lumbersexual vinyl roof party blog waistcoat master cleanse. Kale chips truffaut sriracha vice, put a bird on it fit subway tile leggings crucifix.
                    </p>
                    <Link to="/register" className="btn btn-hero">Login/Register</Link>
                </div>
                <img src={main} alt="job serach" className="img main-img"/>
            </div>
        </main>
        </Wrapper>
    )
};


const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`


export default LandingPage;