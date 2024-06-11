import { React, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import '../EventDetail.css';
import './FoodBank.css';

export const FoodBank = () => {


    /**********************************************
       GET THE VOL FORM FROM THE API
     **********************************************/

    const [volforms, setVolForm] = useState([]);


    const fetchVolFormData = () => {
        return axios.get(serverurl + "/api/volform")
            .then((response) => setVolForm(response.data['volforms']));
    };


    useEffect(() => {
        fetchVolFormData();
    }, [])


    /**********************************************
       POST FOOD BANK REG FORM DATA TO THE API
     **********************************************/

    const [buttontext, setButtonText] = useState('Send');
    const [message, setMessageText] = useState();
    const [successmessage, setSuccessMessage] = useState();
    const [errormessage, setErrorMessage] = useState();


    //const [volunteers_type, setVolType] = useState();
    const [volunteers_name, setVolName] = useState();
    const [volunteers_email, setVolEmail] = useState();
    const [volunteers_pnum, setVolPnum] = useState();
    const [checkedvalue, setCheckedValue] = useState("false");

    const [selecteditem, setSelectedItem] = useState([]);

   function checkboxHandler(e) {
      const isSelected = e.target.checked;
      const value = e.target.value;
    
        if(isSelected) {
            selecteditem.push(value);
            if(selecteditem.length > 0) {
               setCheckedValue("true");
            }
        } else {
            selecteditem.splice(value, 1);
            if(selecteditem.length <= 0) {
                setCheckedValue("false");
            }
        } 

   } 

   





    const volunteers_type = "Food Bank";

    const navigate = useNavigate();

    const Save = async () => {
        setButtonText("Processing");
        if(volunteers_type === "" || volunteers_name === "" || volunteers_email === "" || volunteers_pnum === "" || checkedvalue === "false" ) {
            setMessageText("error");
            setErrorMessage("All Fields are Required");
            setButtonText("Send");
        } else {
        try {
                      
            const items = { volunteers_type, volunteers_name, volunteers_email, volunteers_pnum, selecteditem };
            //console.warn(items);
            const result = await axios.post(serverurl + "/api/volunteer", items);
            setMessageText("success");
            setSuccessMessage(result.data.message);
            setButtonText("Send");
            console.warn(result);
        
        } catch (error) {
            setMessageText("error");
            setErrorMessage("!!Sorry, The Volunteer Form Could Not Be Processed");
            setButtonText("Send");
            console.log(error);
        }
      }
    };


    return (
        <div>

            <div>
                <div style={{ position: 'relative' }}>
                    <Image fluid src="images/headerbanner.png" alt="Card image" id="bannerimg" />
                    <div id="banneroverlay">
                        <div id="bannerid" className='text-center'>
                            <h4> VOLUNTEER REGISTRATION FORM</h4>

                        </div>
                    </div>
                </div>
            </div>


            <br></br><br></br><br></br>
            <div>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div>
                                <Card id="deptcard">
                                    <Card.Header style={{ backgroundColor: '#135592', color: '#fff', fontSize: '20px', textAlign: 'center' }}>
                                        Volunteer Registration
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>

                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Control type="text" size="lg" placeholder="Full Name" style={{ fontSize: '16px', padding: '15px' }}
                                                    value={volunteers_name} onChange={(e) => setVolName(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Control type="email" size="lg" placeholder="Email" style={{ fontSize: '16px', padding: '15px' }}
                                                    value={volunteers_email} onChange={(e) => setVolEmail(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Control type="text" size="lg" placeholder="Pnone Number" style={{ fontSize: '16px', padding: '15px' }}
                                                    value={volunteers_pnum} onChange={(e) => setVolPnum(e.target.value)} />
                                            </Form.Group>
                                           
                                            <Form.Group className="mb-3" controlId="" style={{ border:'1px solid #eee', borderRadius:'5px',padding:'20px' }}>
                                            <label>Time you will be available(tick all that apply)</label>
                                            <br></br><br></br>
                                            {
                                            volforms.length > 0 && volforms.map((volFormData,index) => {
                                            return <Form.Check
                                                    
                                                    inline
                                                    label={volFormData.volforms_time}
                                                    type='checkbox'
                                                    
                                                    value={volFormData.volforms_time}
                                                    name="volunteers_time"
                                                    
                                                    onChange={checkboxHandler}
                                                  
                                                />
                                                
                                             })
                                            }

                                            <Form.Control
                                              value={checkedvalue} style={{ display:'none' }}
                                            />
                                          
                                            </Form.Group>
                                            
                                           
                                        </Form>
                                        <div>
                                            {
                                            message === 'success' ?
                                            <div className='alert alert-success alert-sm'>
                                                {successmessage}
                                            </div>:
                                            ''
                                            }

                                           {
                                            message === 'error' ?
                                            <div className='alert alert-danger alert-sm'>
                                                {errormessage}
                                            </div>:
                                            ''
                                            }
                                        </div>
                                        <ButtonToolbar
                                            className="justify-content-between"
                                            aria-label="Toolbar with Button groups"
                                        >

                                            <ButtonGroup className="me-4" aria-label="First group">
                                               {
                                                buttontext === "Processing" ?
                                                <Button class="btn btn-danger" style={{ backgroundColor: '#249D59', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={Save}>
                                                    {buttontext}
                                                </Button>:
                                                ''
                                                }

                                                {
                                                buttontext === "Send" ?
                                                <Button class="btn btn-danger" style={{ backgroundColor: 'red', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={Save}>
                                                    {buttontext}
                                                </Button>:
                                                ''
                                                }
                                            </ButtonGroup>

                                        </ButtonToolbar>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>


            <br></br><br></br>

        </div >
    )
}
