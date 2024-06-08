import { React, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import '../EventDetail.css';
import './Event.css';
import Slider from 'react-slick';

export const Event = () => {

  
    /********************************************
              GET THE FILE URLS
    *********************************************/
    //const eventfileurl = serverurl + "/admin/img/events/";

    /**********************************************
       GET THE EVENT AND EVENT GALLERY FROM THE API
     **********************************************/

       const [events, setEvents] = useState([]);
     
   
       const fetchEventsData = () => {
         return axios.get(serverurl+"/api/eventall")
             .then((response) => setEvents(response.data['events']));
       };
     
       useEffect(() => {
          fetchEventsData();
       },[]);

       const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,

   };

    // Create a MediaQuery object
    const y = window.matchMedia("(max-width: 767px)");

    const changeSize = (x) => {
        if(x.matches) { 
        settings.slidesToShow = 1
        } else {
        settings.slidesToShow = 3
        }
    }

    changeSize(y)

    // Attach listener function on state changes
    y.addEventListener("change", function() {
        changeSize(y);
    });



    return (
        <div>

            <div>
                <div style={{ position: 'relative' }}>
                    <Image fluid src="images/headerbanner.png" alt="Card image" id="bannerimg" />
                    <div id="banneroverlay">
                        <div id="bannerid" className='text-center'>
                            <h4>EVENTS</h4>
                        </div>
                    </div>
                </div>
            </div>

            <br></br><br></br>
            <Container>
                <Row>
                    <br></br><br></br><br></br>
                    {/*<Slider {...settings}>*/}
                    {
                        events && events.length > 0 && events.map((eventData) => {
                            return <>
                                {eventData.events_title !== '' || eventData.events_enddate > eventData.datenow ?
                                    <Col md={4}>
                                        <Card id="deptcard" className='deptslide'>
                                            <Row>
                                              <Col md={8} id='eventimg'>
                                                <Card.Img variant="top" src={eventData.events_file} />
                                              </Col>
                                              <Col md={4} id='eventtext'>
                                                <div style={{ backgroundColor:'#204782', color:'#fff', height:'100%', padding:'20px', fontWeight:'bold' }}>
                                                   <p style={{ color:'#fff' }}>{eventData.events_startdatemonth}</p>
                                                   <p style={{ color:'#fff' }}>{eventData.events_starttime}</p>
                                                   <p style={{ color:'#fff' }}></p>
                                                   <p style={{ color:'#fff' }}></p>
                                                </div>
                                              </Col>
                                            </Row>
                                            <Card.Body className='text-center'>
                                                <Card.Title>
                                                    <h6 id="bluecolor">{eventData.events_title}</h6>
                                                </Card.Title>
                                                <p style={{ color:'#000' }}>
                                                    { eventData.events_desc }
                                                </p>
                                                {
                                                eventData.events_status ?
                                                <Card.Text style={{ display: 'block' }}>
                                                    <p><Button className="" style={{ backgroundColor: 'red', border: 'none', borderRadius: '0', fontWeight: '600' }}>Ongoing</Button></p>
                                                </Card.Text> :
                                                ''
                                                }
                                                <Link to={"/event-details?eventid=" + eventData.events_id}
                                                    variant="danger" className='btn btn-danger btn-sm'
                                                    style={{ textDecoration: 'none', color: '#135592', border: '1px solid red', borderRadius: '0', backgroundColor: 'transparent' }} reloadDocument>Event Details</Link>
                                            </Card.Body>
                                        </Card>
                                        <br></br>
                                    </Col> : ''
                                }
                            </>
                        })
                    }
                    {/*</Slider>*/}
                    {
                    events && events.length > 0 && events.map((eventData) => {
                        return <>
                        {eventData.events_title == '' ?
                        <Col md={12}>
                        <Card id="deptcard">
                            <Card.Body className='text-center'>
                                <Card.Title>
                                    No Event For Now
                                </Card.Title>
                            </Card.Body>
                        </Card>
                        </Col> : ''
                        } 
                            
                        </>
                     })
                    }
                </Row>


            </Container>

            <br></br><br></br>



        </div >
    )
}
