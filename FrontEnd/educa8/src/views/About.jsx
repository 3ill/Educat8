import React from 'react';
import classNames from 'classnames';
import Image from "../components/elements/Image"
import Image1 from '../assets/images/image1.jpg'
import Image2 from '../assets/images/image2.jpeg'

const banner = classNames('about-container');
const section = classNames('about-section');
const team = classNames('about-team');

const About = () => {

    return (
        <>
            <div className={banner}>
                <h3>About Us</h3>
            </div>
            <div className={section}>
                <article>
                    Moving into the Web3 from web2 or any other field of study space (programming and non-programming background) proved to be difficult for a newbie. A ton of questions comes into one’s mind on how to get a comprehensive and easy roadmap to achieve this.
                </article>
                <br />
                <article>!!!Don’t be confused or pressured again.</article>
                <br />
                <article>Educat8 Dapp was created by a team of five developers migrating into the Web3 space as a beginner's project for the Polygon Hackathon competition</article>
                <br />
                <article>
                    Educat8 is a personalized digital library with information and content on the Web 3 ecosystem which has helped simplify complex algorithm with the right flow chart to self-pace learning web3 online with the right resources without stress.
                </article>
            </div>
            <h1 className='about-top-header'>Meet the Team</h1>
            <div className={team}>
                <div className='about-content'>
                    <section>
                        <Image
                            src={Image1}
                            alt="Hero"
                            width={'100%'}
                            height={'100%'}
                        />
                    </section>
                    <p>Chike</p>
                </div>
                <div className='about-content'>
                    <section>
                        <Image
                            src={Image2}
                            alt="Hero"
                            width={'100%'}
                            height={'100%'}
                        />
                    </section>
                    <p>Nofisat </p>
                </div>
                <div className='about-content'>
                    <section>
                        <Image
                            src={Image1}
                            alt="Hero"
                            width={'100%'}
                            height={'100%'}
                        />
                    </section>
                    <p>Kehinde </p>
                </div>
                <div className='about-content'>
                    <section>
                        <Image
                            src={Image1}
                            alt="Hero"
                            width={'100%'}
                            height={'100%'}
                        />
                    </section>
                    <p>Joshua </p>
                </div>
            </div>
        </>
    );
}

export default About;