import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button } from 'react-bootstrap';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBible } from '@fortawesome/free-solid-svg-icons';
import { SocialMedia } from '../../components/SocialMedia';
import { Card } from 'react-bootstrap';


export const About = () => {
  return (
    <div>

      <div>
        <div style={{ position: 'relative' }}>
          <Image fluid src="images/headerbanner.png" alt="Card image" id="bannerimg" />
          <div id="banneroverlay">
            <div id="bannerid" className='text-center'>
              <h4>WHO WE ARE</h4>
            </div>
          </div>
        </div>
      </div>
      <br></br><br></br>
            {/*  About  */}
            <div id="sectionmargin" className='homeabout'>
        <Container>
          <Row>
            <Col md={4}>
              <Image src="images/about.png" thumbnail fluid id="homeaboutimg" />
            </Col>
            <Col md={8}>
              <Row>
                <div style={{ marginTop: '0px' }}></div>
                <Col sm={12}>
                  <div style={{ backgroundColor:'#204782',color:'#fff',padding:'20px' }}>
                  <h5>
                    Our Vision
                  </h5>
                  <hr></hr>
                  <p>
                  Our vision is to change nations, one life at a time. We believe in the power of transformation, where every individual has the potential to make a profound impact that reverberates across communities and nations. By focusing on the holistic development of individuals, nurturing their talents, empowering their aspirations, and instilling values of compassion and service, we aim to ignite a ripple effect of positive change that transcends borders and boundaries.
                  </p>
                  </div>
                </Col>
                <Col sm={12}>
                  <br></br>
                  <div id="homeourmission" style={{ backgroundColor:'#FF4500',color:'#fff',padding:'20px' }}>
                    <h5>
                       Our Mission
                    </h5>
                    <hr></hr>
                    <p>
                    Our mission is to raise champions for kingdom assignment and witness lives transformed. We are committed to nurturing individuals who are not only equipped with the skills and knowledge necessary for their respective callings but are also imbued with a deep sense of purpose and passion for serving the kingdom of God. Through mentorship, discipleship, and empowerment, we seek to cultivate a generation of leaders who are unyielding in their dedication to fulfilling God's purposes and impacting their spheres of influence for the greater good.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <br></br>
      <div>
        <Container>
          <Row>
            <Col md={12}>
              <div id="welcome" style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '50px', backgroundColor:'#0085FF', color:'#fff' }}>
                <h4>OUR HISTORY</h4>
                <hr></hr>
                <p>
                At Ade Ajala Ministries, our history is a testament to our unwavering commitment to our mission and vision of raising champions for kingdom assignment and witnessing lives transformed. Founded twenty years ago by a group of passionate individuals driven by a shared calling to make a difference, our organization began as a humble initiative with a bold vision.
                Over the years, we have embarked on a journey marked by faith, perseverance, and an unwavering belief in the power of God's transformative love. From our early beginnings, where we started with a handful of dedicated volunteers, to the vibrant and thriving community we are today, our trajectory has been guided by a steadfast dedication to our core values of compassion, service, and excellence.

                </p>

                <p>
                At Ade Ajala Ministries, our history is a testament to our unwavering commitment to our mission and vision of raising champions for kingdom assignment and witnessing lives transformed. Founded twenty years ago by a group of passionate individuals driven by a shared calling to make a difference, our organization began as a humble initiative with a bold vision.
                Over the years, we have embarked on a journey marked by faith, perseverance, and an unwavering belief in the power of God's transformative love. From our early beginnings, where we started with a handful of dedicated volunteers, to the vibrant and thriving community we are today, our trajectory has been guided by a steadfast dedication to our core values of compassion, service, and excellence.

                </p>
                
                <p>
                As we reflect on our journey thus far, we are filled with gratitude for the countless blessings and miracles that have unfolded along the way. From witnessing lives healed and restored to seeing communities revitalized and transformed, every milestone is a testament to the faithfulness of God and the dedication of our incredible team of staff, volunteers, and supporters.
                Looking ahead, we are filled with excitement and anticipation for the future as we continue to press forward in our mission. With an unwavering commitment to excellence, innovation, and the guiding principles of our mission and vision, we are confident that the best is yet to come. Together, we will continue to write the next chapter of our history—a chapter filled with even greater impact, transformation, and God's abundant blessings.

                </p>

              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <br></br><br></br>

    </div>
  )
}
