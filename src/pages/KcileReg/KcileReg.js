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
import '../FoodBank/FoodBank.css';

export const KcileReg = () => {



    /**********************************************
       POST KCILE REG FORM DATA TO THE API
     **********************************************/

    const [buttontext, setButtonText] = useState('Send');
    const [message, setMessageText] = useState();
    const [successmessage, setSuccessMessage] = useState();
    const [errormessage, setErrorMessage] = useState();


    //const [volunteers_type, setVolType] = useState();
    const [kciles_name, setKcileName] = useState();
    const [kciles_email, setKcileEmail] = useState();
    const [kciles_pnum, setKcilePnum] = useState();
    const [kciles_gender, setKcileGender] = useState();
    const [kciles_address, setKcileAddress] = useState();
    const [kciles_country, setKcileCountry] = useState();
    const [kciles_state, setKcileState] = useState();
    const [kciles_city, setKcileCity] = useState();
    const [kciles_zipcode, setKcileZipCode] = useState();
    const [checkedvalue, setCheckedValue] = useState("false");

    const [kciles_module, setSelectedItem] = useState([]);


    const modules = [
        {name:'Now that you are a Christian'},
        {name:'How to study the Bible'},
        {name:'Prayer - How to finish \n the bible'},
        {name:'Leadership & Fellower-ship'},
        {name:'Evangelism'},
        {name:'Giving'},
        {name:'Baptism'},
    ];

   function checkboxHandler(e) {
      const isSelected = e.target.checked;
      const value = e.target.value;
    
        if(isSelected) {
            kciles_module.push(value);
            if(kciles_module.length > 0) {
               setCheckedValue("true");
            }
        } else {
            kciles_module.splice(value, 1);
            if(kciles_module.length <= 0) {
                setCheckedValue("false");
            }
        } 

   } 

   





    const kciles_moduletype = "MODULE ONE";

    const navigate = useNavigate();

    const Save = async () => {
        setButtonText("Processing");
        if(kciles_moduletype === "" || kciles_name === "" || kciles_email === "" || kciles_pnum === "" || checkedvalue === "false" || kciles_gender === "" || kciles_address === "" || kciles_state === "" || kciles_country === "" || kciles_city === "" || kciles_zipcode === "" ) {
            setMessageText("error");
            setErrorMessage("All Fields are Required");
            setButtonText("Send");
        } else {
        try {
                    
            const items = { kciles_moduletype, kciles_name, kciles_email, kciles_pnum, kciles_gender, kciles_address, kciles_state, kciles_country, kciles_city, kciles_zipcode, kciles_module };
            //console.warn(items);
            const result = await axios.post(serverurl + "/api/webregmodule", items);
            setMessageText("success");
            setSuccessMessage(result.data.message);
            setButtonText("Send");
            console.warn(result);
        
        } catch (error) {
            setMessageText("error");
            setErrorMessage("!!!Sorry. Something went wrong");
            setButtonText("Send");
            console.log(kciles_module);
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
                            <h4> KCILE REGISTRATION FORM</h4>

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
                                        KCILE Registration
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>

                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }} required
                                                    value={kciles_name} onChange={(e) => setKcileName(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                            <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" size="lg" style={{ fontSize: '16px', padding: '15px' }} required
                                                    value={kciles_email} onChange={(e) => setKcileEmail(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                            <Form.Label>Phone Number</Form.Label>
                                                <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }} required
                                                    value={kciles_pnum} onChange={(e) => setKcilePnum(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                            <Form.Label>Address</Form.Label>
                                                <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }} required
                                                    value={kciles_address} onChange={(e) => setKcileAddress(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                            <Form.Label>State</Form.Label>
                                                <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }} required
                                                    value={kciles_state} onChange={(e) => setKcileState(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                            <Form.Label>Country</Form.Label>
                                                <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }} required
                                                    value={kciles_country} onChange={(e) => setKcileCountry(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                            <Form.Label>City</Form.Label>
                                                <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }} required
                                                    value={kciles_city} onChange={(e) => setKcileCity(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                            <Form.Label>Zip Code</Form.Label>
                                                <Form.Control type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }} required
                                                    value={kciles_zipcode} onChange={(e) => setKcileZipCode(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="">
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Select type="text" size="lg" style={{ fontSize: '16px', padding: '15px' }} required
                                                value={kciles_gender} onChange={(e) => setKcileGender(e.target.value)} >
                                                <option value=''></option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </Form.Select>
                                           </Form.Group>
                                            <Form.Group className="mb-3" controlId="" style={{ border:'1px solid #eee', borderRadius:'5px',padding:'20px' }}>
                                            <label>Select Courses</label>
                                            <br></br><br></br>
                                            {
                                            modules.length > 0 && modules.map((moduleData,index) => {
                                            return <Form.Check
                                                    
                                                    inline
                                                    label={moduleData.name}
                                                    type='checkbox'
                                                    
                                                    value={moduleData.name}
                                                    name="modules_name"
                                                    
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
