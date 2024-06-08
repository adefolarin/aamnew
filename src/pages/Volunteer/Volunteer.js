import { React, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import axios from 'axios';
import copy from "copy-to-clipboard";
import { serverurl, clienturl } from '../../providers/ServerUrl';

export const Volunteer = () => {

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
                            <h4>VOLUNTEER</h4>

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
                      <br></br>
                      <Row style={{ marginTop:'10px', marginBottom:'10px' }}>

                      <Col md={6}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            FACILITY WORK <br></br> ORDER FORM</h5>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       <Col md={6}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            ROOM RESERVATION <br></br> FORM</h5>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       </Row>

                       <Row style={{ marginTop:'10px', marginBottom:'10px' }}>
                       <Col md={6}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            ISREAL HOLY LAND TOUR <br></br> REGISTRATION FORM
                                         </h5>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       <Col md={6}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            COLLEGE AND CAREER <br></br> FORM
                                         </h5>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       </Row>

                       <Row>
                       <Col md={6}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            KCCC FOOD BANK <br></br> VOLUNTEER FORM
                                         </h5>
                                      </div>
                                  </Card.Title>
                              </Card>
                       </Col>
                       <Col md={6}>
                              <Card id="deptcard" style={{ backgroundColor: '#204782', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                           <br></br>
                                          <h5 style={{ color: '#fff', fontSize: '21px' }}>
                                            OTHERS
                                         </h5>
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


        </div >
    )
}
