import { React, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import copy from "copy-to-clipboard";
import { serverurl, clienturl } from '../../providers/ServerUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faMousePointer, faPlane, faPlaneUp, faPlaneSlash, faPlaneDeparture, faPhoneVolume, faHeart, faBible } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import './Kcile.css';

export const Kcile = () => {

    /********************************************
             GET THE QUERY PARAMS   
    *********************************************/
    const search = useLocation().search;
    const eventid = new URLSearchParams(search).get('eventid');

    /********************************************
              GET THE FILE URLS
    *********************************************/
    //const eventfileurls = serverurl + "/admin/img/events/";
    //const eventgalleryfileurls = serverurl + "/admin/img/eventgalleries/";

    /**********************************************
       GET THE EVENT AND EVENT GALLERY FROM THE API
     **********************************************/
    const [eventdetail, setEventDetail] = useState([]);

    const [eventgallery, setEventGallery] = useState([]);

    const fetchEventDetailData = () => {
        return axios.get(serverurl + "/api/event/" + eventid)
            .then((response) => setEventDetail(response.data['eventone']));
    };

    const fetchEventGalleryData = () => {
        return axios.get(serverurl + "/api/event/" + eventid)
            .then((response) => setEventGallery(response.data['eventgallery']));
    };

    useEffect(() => {
        fetchEventDetailData();
        fetchEventGalleryData();
    }, [])


    /**********************************************
       POST EVENT REG FORM DATA TO THE API
     **********************************************/

    const [buttontext, setButtonText] = useState('Register');
    const [message, setMessageText] = useState();
    const [successmessage, setSuccessMessage] = useState();
    const [errormessage, setErrorMessage] = useState();

    const eventregs_event = eventdetail.events_id;
    const [eventregs_name, setEventRegsName] = useState();
    const [eventregs_email, setEventRegsEmail] = useState();
    const [eventregs_pnum, setEventRegsPnum] = useState();

    const navigate = useNavigate();

    const Save = async () => {
        setButtonText("Processing");
        if(eventregs_name === "" || eventregs_email === "") {
            setMessageText("error");
            setErrorMessage("All Fields are Required");
            setButtonText("Register");
        } else {
        try {
                      
            const items = { eventregs_event, eventregs_name, eventregs_email, eventregs_pnum };
            //console.warn(items);
            const result = await axios.post(serverurl + "/api/eventreg", items);
            setMessageText("success");
            setSuccessMessage(result.data.message);
            setButtonText("Register");
            console.warn(result);
        
        } catch (error) {
            setMessageText("error");
            setErrorMessage("!!Sorry, Your Registration Could Not Be Processed");
            setButtonText("Register");
            console.log(error);
        }
      }
    };


    // COPY LINK TO CLIPBOARD
    const [copyText, setCopyText] = useState("");
    const [buttoncopytext, setButtonCopyText] = useState("");

    /*const Clipboard = () => {
     
        setCopyText(clienturl + "/event-details/" + eventid);
     
         copy(copyText);
         setButtonCopyText("Copied")
   }*/

   const Clipboard = async () => {
    try {
        await navigator.clipboard.writeText(clienturl + "/event-details/" + eventid);
        setButtonCopyText("Link copied to clipboard!");
    } catch (err) {
        setButtonCopyText("Unable to copy link to clipboard");
    }
   };



    return (
        <div>
            <div>
                <div style={{ position: 'relative' }}>
                    <Image fluid src="images/headerbanner.png" alt="Card image" id="bannerimg" />
                    <div id="banneroverlay">
                        <div id="bannerid" className='text-center'>
                            <h4>KCILE COURSES</h4>

                        </div>
                    </div>
                </div>
            </div>

            <br></br><br></br>
            <div>
           <Container>
          <Row>
              <Col md={12}>
                  <div>
                       <h4 id='bluecolor' className='text-center'>MODULE ONE - Available Courses</h4>
                      <br></br>
                      <Row style={{ marginTop:'10px', marginBottom:'10px' }}>

                      <Col md={6}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            Now That You Are A <br></br>Christian
                                            <hr></hr>
                                          </h5>
                                            
                                            <p>An insightful course designed to guide you through the next steps of your newfound faith</p>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       <Col md={6}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            How To Study The <br></br> Bible
                                            <hr></hr>
                                          </h5>
                                        
                                        <p>An insightful course designed to guide you through the next steps of your newfound faith</p>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       </Row>

                  </div>
              </Col>
          </Row>
         </Container>
          </div>
          <br></br>

   
           <Container>
               <Row>
                  <Col md={4}>
                    <div style={{ backgroundColor:'#204782', color:'#fff',margin:'0',padding:'10px' }}>
                        <h5 className='text-center' style={{ margin:'0',fontSize:'17px', fontWeight:'bold' }}>IN CLASS LECTURE</h5>
                    </div>
                   </Col>
                  <Col md={8}>
                    <Row style={{ backgroundColor:'#fff', color:'#000',margin:'0',padding:'5px',borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', fontWeight:'bold' }} id='inclasstime'>
                       <Col md={3}><p>
                       <Button style={{ backgroundColor: 'red', border: 'none' }}>
                        <FontAwesomeIcon icon={faCalendar} style={{ color: '#fff', fontSize: '14px' }} />
                      </Button> &nbsp; &nbsp;Tuesdays</p></Col>

                       <Col md={3}><p><Button style={{ backgroundColor: 'red', border: 'none' }}>
                        <FontAwesomeIcon icon={faClock} style={{ color: '#fff', fontSize: '14px' }} />
                      </Button> &nbsp; &nbsp;6pm</p></Col>

                       <Col md={6}><p><Button style={{ backgroundColor: 'red', border: 'none' }}>
                        <FontAwesomeIcon icon={faLocation} style={{ color: '#fff', fontSize: '14px' }} />
                      </Button> &nbsp; &nbsp;1391 Oswego Street Aurora</p></Col>
                    </Row>
                  </Col>
               </Row>

               <br></br>
               <Row>
                  <Col md={4}>
                    <div style={{ backgroundColor:'#204782', color:'#fff',margin:'0',padding:'10px' }}>
                        <h5 className='text-center' style={{ margin:'0',fontSize:'17px', fontWeight:'bold' }}>ONLINE CLASSES</h5>
                    </div>
                   </Col>
                  <Col md={8}>
                    <Row style={{ backgroundColor:'#fff', color:'#000',margin:'0',padding:'5px',borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', fontWeight:'bold' }} id='onclasstime'>
                       <Col md={3}><p>
                       <Button style={{ backgroundColor: 'red', border: 'none' }}>
                        <FontAwesomeIcon icon={faCalendar} style={{ color: '#fff', fontSize: '14px' }} />
                      </Button> &nbsp; &nbsp;Saturdays</p></Col>

                       <Col md={3}><p><Button style={{ backgroundColor: 'red', border: 'none' }}>
                        <FontAwesomeIcon icon={faClock} style={{ color: '#fff', fontSize: '14px' }} />
                      </Button> &nbsp; &nbsp;5pm</p></Col>

                       <Col md={6}><p><Button style={{ backgroundColor: 'red', border: 'none' }}>
                        <FontAwesomeIcon icon={faLocation} style={{ color: '#fff', fontSize: '14px' }} />
                      </Button> &nbsp; &nbsp;Zoom</p></Col>
                    </Row>
                  </Col>
               </Row>
           </Container>
           <br></br><br></br>

            <div>
           <Container>
          <Row>
              <Col md={12}>
                  <div>
                       <h4 id='bluecolor' className='text-center'>Future Courses</h4>
                      <br></br>
                      <Row style={{ marginTop:'10px', marginBottom:'10px' }}>

                      <Col md={3}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            Systematic <br></br>Theology
                                          </h5>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       <Col md={3}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            Church <br></br> Doctrine
                                          </h5>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       <Col md={3}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            Church <br></br> Doctrine
                                          </h5>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       <Col md={3}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            Church <br></br> Doctrine
                                          </h5>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       </Row>

                       <Row style={{ marginTop:'10px', marginBottom:'10px' }}>
                       <Col md={3}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            Church <br></br> Doctrine
                                          </h5>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       <Col md={3}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            Church <br></br> Doctrine
                                          </h5>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       <Col md={3}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            Church <br></br> Doctrine
                                          </h5>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       <Col md={3}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            Church <br></br> Doctrine
                                          </h5>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       </Row>
                       <br></br>
                       <div>
                        <p className='text-center'>
                            <ButtonGroup className="me-2" aria-label="Second group" style={{ color: 'red' }}>
                            <Link to='/kcilereg' reloadDocument className='btn btn-danger' id='btn'>
                               REGISTER HERE
                            </Link>

                            </ButtonGroup>
                        </p>
                    </div>
</div>
              </Col>
          </Row>
           </Container>
            </div>


        </div >
    )
}
