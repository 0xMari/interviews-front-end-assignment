import './footer.css'
import { Link } from 'react-router-dom';


export default function Footer(){
    return(
        <div className='footer-wrap'>
            <div className='newsletter-wrap'>
                <h1 className='newsletter-title'>Subscribe to our newsletter to discover new recipes!</h1>
                <div className='input-box'>
                    <input
                        className='newsletter-input'
                        type='email'
                        placeholder='youremail@mail.com'
                    />
                    <button className='button-news'>Subscribe</button>
                </div>
            </div>
            <div className='footer-vero'>
                <div className='brand-details'>
                    <div className='branding'>recipebook</div>
                    <div className='lorem'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                </div>
                <div className='footer-section'>
                    <div className='section-title'>Company</div>
                    <div className='section-list'>
                        <li>Company name</li>
                        <li>Address, address</li>
                        <li>+00 02 1234567</li>
                        <li>mail@mail.com</li>
                    </div>
                </div>
                <div className='footer-section'>
                    <div className='section-title'>Quick links</div>
                    <div className='section-list'>
                        <li><Link>Recipes</Link></li>
                        <li>About us</li>
                        <li>FAQ</li>
                    </div>
                </div>
                <div className='footer-section last-section'>
                    <div className='section-title'>Socials</div>
                    <div className='section-list'>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>TikTok</li>
                        <li>X</li>
                    </div>
                </div>
            </div>
        </div>
    )
}