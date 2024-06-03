// VideoBackground.js
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Card, ButtonToolbar, ButtonGroup, Image, Tab, Nav, InputGroup, Form, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faMousePointer, faPlane, faPlaneUp, faPlaneSlash, faPlaneDeparture, faPhoneVolume, faHeart, faBible } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
import { SearchFormGroup } from '../../components/Forms/SearchFormGroup';
import { Departments } from '../../components/Departments';
import { Event } from '../../components/Event';
import { EventCountDownTimer } from '../../components/EventCountDownTimer';
import { SocialMedia } from '../../components/SocialMedia';
import { NavLink } from 'react-bootstrap';
import { TypeAnimation } from 'react-type-animation';
import axios  from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import { CDBAnimation, CDBContainer } from 'cdbreact';
import { ReactTyped  } from "react-typed";
//import { Podcasts } from '../../components/Podcasts';
import Modal from 'react-bootstrap/Modal';
import { VideoModal2 } from '../../components/VideoModal2';
import { Fade, Bounce, Slide, Jump, Roll, Flip, Rotate, Flash, Jello,Pulse, RubberBand, Shake, Swing, Tada, Wobble, HeadShake, Pop, Spin, LightSpeed } from "react-swift-reveal";
import { faEnvelope, faPhone, faMapLocation, faAddressCard, faAddressBook, faGift, faDollar } from '@fortawesome/free-solid-svg-icons';
import { RWebShare } from "react-web-share";
import { ProductCategory } from '../../components/ProductCategory';
import { Product } from '../../components/Product';


import './Home.css'

export const Home = () => {


    /*********************************************************
     POST THE FORM DATA TO THE API AND GET THE SEARHC RESULT
  **********************************************************/

     const [productsearch, setProductSearch] = useState([]);
     const [getproductsearch, getProductSearch] = useState([]);
     const [nextevent, setNextEvent] = useState([]);
     const [sermons, setSermonAllOne] = useState([]);

   
     const [buttontext, setButtonText] = useState('Search');
     const [message, setMessageText] = useState();
     const [successmessage, setSuccessMessage] = useState();
     const [errormessage, setErrorMessage] = useState();
   
   
   
   
     const getSearch = async () => {
       setButtonText("Processing");
       if (productsearch === "") {
         setMessageText("error");
         setErrorMessage("All Fields are Required");
         setButtonText("Search");
       } else {
         try {
   
           const items = { productsearch };
           //console.warn(items);
           const result = await axios.post(serverurl + "/api/productsearch", items);
   
           if (result.data.productsearchdata['productsearch_result'] === "Not Found") {
             setMessageText("error");
             //setErrorMessage2("No Result Found");
             setErrorMessage("");
           } else {
             setMessageText("success");
             setMessageText("");
             
             //setSuccessMessage2("Result Found");
             setSuccessMessage("");
             getProductSearch(result.data.productsearchdata);
   
             console.log(result.data);
             //setSuccessMessage("success");
           }
   
           setButtonText("Search");
   
   
         } catch (error) {
           setMessageText("error");
           setErrorMessage("!!Sorry, Your Request Could Not Be Processed");
           setButtonText("Search");
           console.log(error);
         }
       }
     };
   

  const [banner, setBanner] = useState([]);
  const [events, setEvents] = useState([]);
  const [productcategories, setProductCategories] = useState([]);
  const [productsbycat, setProductsByCat] = useState([]);
  const [productcategoriesid, setProductCategoriesID] = useState([]);


  const fetchBannerData = () => {
    return axios.get(serverurl + "/api/banner")
    .then((response) => setBanner(response.data['banners']));
    
  };

  const fetchEventsData = () => {
    return axios.get(serverurl+"/api/event")
        .then((response) => setEvents(response.data['events']));
  };

  const fetchProductCategoryData = () => {
    return axios.get(serverurl+"/api/productcategory")
        .then((response) => setProductCategories(response.data['productcategories']));
  };

  const fetchNextEventData = () => {
    return axios.get(serverurl + "/api/nextevent")
        .then((response) => setNextEvent(response.data['event']));
  };

  const fetchSermonsAllOneData = () => {
    return axios.get(serverurl+"/api/sermonallone")
        .then((response) => setSermonAllOne(response.data['sermons']));
  };




  useEffect(() => {
    fetchBannerData()
    fetchEventsData();
    fetchNextEventData();
    fetchSermonsAllOneData();
 },[]);



  const navigate = useNavigate();
  const goToAbout = () => {
    navigate('/about');
  }

  /**********************************************
   GET THE PODCAST FROM THE API
  **********************************************/

    /*const [podcasts, setPodcast] = useState([]);


    const fetchPodcastData = () => {
        return axios.get(serverurl + "/api/podcast")
            .then((response) => setPodcast(response.data['podcasts']));
    };

    useEffect(() => {
        fetchPodcastData();
    }, [])*/


    // Loading the Video Modal
      
   const [show, setShow] = useState(false);

   const [videotitle, setVideoTitle] = useState();
   const [videoid, setVideoID] = useState();

   const handleClose = () => setShow(false);
   
   const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
   const [fullscreen, setFullscreen] = useState(true);


   const loadVideo = (videotitle,videoid,breakpoint) => {
       //title = inputRef.current.value;
       setVideoTitle(videotitle);
       setVideoID(videoid);
       setFullscreen(breakpoint);
       setShow(true);
   }

  return (
    <div>
        <VideoModal2 show={show} videoid={videoid} handleClose={handleClose} />

    


      {/*  About  */}
      <div id="sectionmargin" className='homeabout'>
      <Container>
      <Row>
          <Col md={12}>
                        
                        <h4 id="bluecolor" class='text-center'>About The Author</h4>
                        <hr style={{ borderTop: '2px solid red',width:'10%',margin:'auto' }}></hr>
           </Col>
                    <br></br><br></br><br></br>
      </Row>
      </Container>
      <Fade delay={300} duration={2000}>
        <Container>
          <Row>
            <Col md={5}>
              <div id='homeaboutimgdiv'>
              <Image src="images/about.png" thumbnail fluid id="homeaboutimg" />
              </div>

            </Col>
            <Col md={7}>
            <Row>
                <div style={{ marginTop: '20px' }}></div>
                <Col sm={12}>
                  <br></br>
                  <div id="homeourmission">
                    <h5 id="bluecolor">
                      <Button style={{ borderRadius: '50px', backgroundColor: 'red', border: 'none' }}>
                        <FontAwesomeIcon icon={faBible} style={{ color: '#fff', fontSize: '14px' }} />

                      </Button> &nbsp; &nbsp; Our Mission
                    </h5>
                    <p>
                    Our mission is to raise champions for kingdom assignment and see lives transformed.
                    </p>
                  </div>
                </Col>
                <Col sm={12}>
                  <h5 id="bluecolor">
                    <Button style={{ borderRadius: '50px', backgroundColor: 'red', border: 'none' }}>
                      <FontAwesomeIcon icon={faHeart} style={{ color: '#fff', fontSize: '14px' }} />

                    </Button> &nbsp; &nbsp; Our Vision
                  </h5>
                  <p>
                     Changing nations, one life at a time
                  </p>
                </Col>
            </Row>
               <Row>
                <Col sm={12}>
                  <Link to='/about' reloadDocument className='btn btn-danger' id='btn'>Read More</Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        </Fade>
      </div>
      <br></br>

       {/*  Donation / Giving  */}
      <Container>
          <Row>
              <Col md={12}>
                  <div>
                      <br></br>
                      <Row>

                      <Col md={4}>
                              <Card id="deptcard" style={{ backgroundColor: '#000080', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <button className='btn' style={{ backgroundColor: '#fff', color: '#000080', borderRadius: '50%', marginTop: '10px', marginBottom: '10px', fontSize: '20px' }}><FontAwesomeIcon icon={faGift} /></button>
                                          <br></br><br></br>
                                          <h5 style={{ color: '#fff', fontSize: '18px' }}>Donate</h5>
                                          <p>kssksieieieie eeieiei eieieieie eioe e<br></br></p>
                                      </div>
                                  </Card.Title>
                              </Card>
                          </Col>

                          <Col md={4}>
                              <Card id="deptcard" style={{ backgroundColor: '#FF4500', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <button className='btn' style={{ backgroundColor: '#fff', color: '#FF4500', borderRadius: '50%', marginTop: '10px', marginBottom: '10px', fontSize: '20px' }}><FontAwesomeIcon icon={faDollar} /></button>
                                          <br></br><br></br>
                                          <h5 style={{ color: '#fff', fontSize: '18px' }}>Give</h5>
                                          <p>kssksieieieie eeieiei eieieieie eioe e<br></br></p>
                                      </div>
                                  </Card.Title>
                              </Card>
                          </Col>

                          <Col md={4}>
                              <Card id="deptcard" style={{ backgroundColor: '#0085FF', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <button className='btn' style={{ backgroundColor: '#fff', color: '#0085FF', borderRadius: '50%', marginTop: '10px', marginBottom: '10px', fontSize: '20px' }}><FontAwesomeIcon icon={faHeart} /></button>
                                          <br></br><br></br>
                                          <h5 style={{ color: '#fff', fontSize: '18px' }}>Volunteer</h5>
                                          <p>kssksieieieie eeieiei eieieieie eioe e<br></br></p>
                                      </div>
                                  </Card.Title>
                              </Card>
                          </Col>


                      </Row>
                  </div>
              </Col>
          </Row>
      </Container>

      <br></br><br></br>


        {/*  APP DOWNLOAD    */}
        <div>
        <br></br><br></br>
        <Fade delay={300} duration={2000}>
        <Container style={{ backgroundColor: '#204782', padding: '70px' }} fluid>
          <Row>
            <Col md={6}>
              <div id="downloaddiv">
              <h4 id="whitecolor" className='text-center'>ADE-AJALA MOBILE APP</h4>
              <p id="whitecolor">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.</p>
            
                <div className='text-center'>
                  <ButtonGroup className="me-2" aria-label="First group">
                    <Link to="#" className='btn' id="downloadbtn">
                      <Image src="images/appstore.png" fluid width="286" height="130" />
                    </Link>
                    <Link to="#" className='btn' id="downloadbtn">
                      <Image src="images/playstore.png" fluid  width="286" height="130"/>
                    </Link>
                  </ButtonGroup>

                </div>
              </div>            
            </Col>
            <Col md={6}>
                <Jump delay={600} duration={2300}>
                <div id="appimg">
                  <Image fluid src="images/app.png" thumbnail style={{ backgroundColor:'transparent',border:'none' }} />
                </div>
                </Jump>
            </Col>
          </Row>
        </Container>
        </Fade>
      </div>


       {/*  LIVE STREAM    */}
      <div>
        <Fade delay={300} duration={2000}>
        <Container style={{ backgroundColor: '#000', margin: '0px', padding:'0px' }} fluid>
        <div style={{ position: 'relative' }}>
            <Image fluid src="images/img3.jpg" alt="Card image" style={{ width: '100%', height: '270px' }} />
            <div id="overlay" style={{ position: 'absolute', width: '100%', height: '100%', top: '0', bottom: '0', right: '0', left: '0', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <Row>
                <Col md={8}>
                  <div id="faithid">
                    <h4 id="whitecolor">GET CONNTECTED WITH<br></br>
                     BISHOP ISREAL ADE-AJALA
                    </h4>
                    <p id="whitecolor">EVERY FRIDAY BY 12:30pm</p>
                    <p id='joinuslive'>
                    <div id="homegivebtnid">
                      <Link to="/livestrea" className='btn btn-danger' id="homegivebtn" reloadDocument>
                        JOIN US LIVE
                      </Link>
                    </div>
                   </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div id='getconnected'>
                    <Image fluid src="images/pastor2.jpeg" id='getconnectedimg' thumbnail style={{ backgroundColor:'transparent',border:'none' }} />
                  </div>
                </Col>
              </Row>
            </div>
            </div>
        </Container>
        </Fade>
      </div>



      {/*  About  */}
      <div id="sectionmargin" className='homeabout'>
      <Fade delay={300} duration={2000}>
        <Container>
          <Row>
            <Col md={7}>
              <div id='homeaboutimgdiv'>
                
              {

              sermons && sermons.length > 0 && sermons.map((sermonData) => {
                return <Row>
                  <div
                    style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px' }}>
                    <Row>
                      <Col md={12}>
                        <div className=''>
                          <iframe style={{ width: '100%', height: '250px', margin: 'auto' }}
                            src={sermonData.sermons_file}
                            frameborder="0"
                              allow="accelerometer; 
                              autoplay; 
                              clipboard-write; 
                              encrypted-media; 
                              gyroscope; 
                              picture-in-picture; 
                              web-share" 
                              allowfullscreen>
                            </iframe>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Row>
                })
                }
              </div>

            </Col>
            <Col md={5}>
            <Row>
                <div style={{ marginTop: '20px' }}></div>
                <Col sm={12}>
                  <br></br>
                  <div id="homeourmission">
                    <h5 id="bluecolor">
                       &nbsp; &nbsp; MESSAGES
                    </h5>
                    <p>
                    Our mission is to raise champions for kingdom assignment and see lives transformed.
                    </p>
                  </div>
                </Col>
                <Col sm={12}>
                  <h5 id="bluecolor">
                    <Button style={{ borderRadius: '50px', backgroundColor: 'red', border: 'none' }}>
                      <FontAwesomeIcon icon={faHeart} style={{ color: '#fff', fontSize: '14px' }} />

                    </Button> &nbsp; &nbsp; Our Vision
                  </h5>
                  <p>
                     Changing nations, one life at a time
                  </p>
                </Col>
            </Row>
               <Row>
                <Col sm={12}>
                  <Link to='/about' reloadDocument className='btn btn-danger' id='btn'>Read More</Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
       </Fade>
      </div>
      <br></br>




    </div>
  );
};
