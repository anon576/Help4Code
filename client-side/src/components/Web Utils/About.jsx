import { React, useEffect } from 'react'
import AboutHeader from "../../images/learning_2.jpg"
import Review from '../Other/Review'
import Team from '../Other/Team'
import "../../style/about.css"
import Projects from '../Other/Projects'

const About = (props) => {

    const { setProgress } = props

    useEffect(() => {
        setProgress(40);

        setTimeout(() => {
            setProgress(100)
        }, 200)

    }, [setProgress])

    return (
        <div className='about'>
            <div className="about-header">
                <div className='about-heading'>
                    <h1>Mission statement</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur fuga eligendi at ea aut distinctio nulla voluptate corporis molestias quam libero tenetur vitae, officiis aliquam veniam tempora soluta in dolores nemo ipsa consectetur! Exercitationem, omnis.</p>
                </div>
                <div className="about-image">
                    <img src={AboutHeader} alt="" />
                </div>
            </div>

            <Team/>

            <Review />


        </div>

    )
}

export default About
