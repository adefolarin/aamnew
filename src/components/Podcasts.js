import React from 'react'
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faShare } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import '../pages/Podcast/Podcast.css';
import { RWebShare } from 'react-web-share';

export const Podcasts = ({ podcasts }) => {
    return (
        <div>
          <Container>
                <Row>
                  
                    
                    {
                        podcasts && podcasts.length > 0 && podcasts.map((podcastsData) => {
                            return <>
                                {podcastsData.podcasts_title !== '' ?
                                    <Row style={{ backgroundColor: '#fff' }}>
                                        <div
                                            style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '30px' }}>
                                            <Row>
                                                <Col md={4}>
                                                    <div className='text-center'>
                                                            <br></br>
                                                            <h6 style={{ fontWeight: 'bold' }} className="text-center bluecolor">
                                                                {podcastsData.podcasts_title}
                                                            </h6>
                                                    </div>

                                                </Col>
                                                <Col md={8}>
                                                    <div className='podcastalign'>
                                                        <div className='text-center'>
                                                            <audio controls style={{ width: '100%', backgroundColor: '#135592', borderRadius: '20px' }}>
                                                                <source src={podcastsData.podcasts_file}
                                                                    type="audio/mpeg">
                                                                </source>

                                                            </audio>
                                                        </div>
                                                    </div>
                                                </Col>

                                            </Row>

                                        </div>

                                    </Row> :

                                    <Row>
                                        <Col md={12}>
                                            <Card id="deptcard">
                                                <Card.Body className='text-center'>
                                                    <Card.Title>
                                                        No Podcast For Now
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                }
                            </>
                        })
                    }
                </Row>


            </Container>
        </div>
    )
}


