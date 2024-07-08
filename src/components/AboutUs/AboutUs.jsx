import './AboutUs.css'
import { NavBar } from '../NavBar/NavBar'
import { Footer } from '../Footer/Footer'
import foton from '../../assets/img/imhHeroe.jpg'

export const AboutUs = () => {
    return (
        <div className='aboutBody'>
            <NavBar />
            <div class="responsive-container-block bigContainer">
                <div class="responsive-container-block Container bottomContainer">
                    <div class="ultimateImg">
                        <img class="mainImg" src={foton} />
                        <div class="purpleBox">
                            <p class="purpleText">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget purus lectus viverra in semper nec pretium mus.
                            </p>
                            <img class="stars" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/mp5.svg" />
                        </div>
                    </div>
                    <div class="allText bottomText">
                        <p class="text-blk headingText">
                            About Us
                        </p>
                        <p class="text-blk subHeadingText">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <p class="text-blk description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum pulvinar ullamcorper suspendisse ac eget. Pellentesque tempus leo in ullamcorper quis vestibulum ligula elementum ut.
                        </p>
                        <a class="btn">
                            View Services
                        </a>
                    </div>
                </div>

                
            </div>
            <Footer />
        </div>
    )
}

