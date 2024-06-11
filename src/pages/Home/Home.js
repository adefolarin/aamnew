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
     const [podcasts, setPodcastAllOne] = useState([]);

   
     const [buttontext, setButtonText] = useState('Search');
     const [message, setMessageText] = useState();
     const [successmessage, setSuccessMessage] = useState();
     const [errormessage, setErrorMessage] = useState();


     const [buttontextp, setButtonTextp] = useState('Send');
     const [messagep, setMessageTextp] = useState();
     const [successmessagep, setSuccessMessagep] = useState();
     const [errormessagep, setErrorMessagep] = useState();
 
     const [prayeruser_name, setPrayerUserName] = useState();
     const [prayeruser_email, setPrayerUserEmail] = useState();
     const [prayeruser_pnum, setPrayerUserPnum] = useState();
     const [prayeruser_request, setPrayerRequest] = useState();


     const Save = async () => {
      setButtonTextp("Processing");
      if(prayeruser_name === "" || prayeruser_email === "" || prayeruser_pnum === "" || prayeruser_request === "") {
          setMessageTextp("error");
          setErrorMessagep("All Fields are Required");
          setButtonTextp("Send");
      } else {
      try {
                    
          const items = { prayeruser_name, prayeruser_email, prayeruser_pnum, prayeruser_request };
          //console.warn(items);
          const result = await axios.post(serverurl + "/api/prayer", items);
          setMessageTextp("success");
          setSuccessMessagep(result.data.message);
          setButtonTextp("Send");
          console.warn(result);
      
      } catch (error) {
          setMessageTextp("error");
          setErrorMessagep("!!Sorry, Your Message Could Not Be Processed");
          setButtonTextp("Send");
          console.log(error);
      }
    }
  };
   
   
   
   
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

  const [news, setNews] = useState([]);
     
   
  const fetchNewsData = () => {
    return axios.get(serverurl+"/api/newssome")
        .then((response) => setNews(response.data['news']));
  };


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

  const fetchPodcastsAllOneData = () => {
    return axios.get(serverurl+"/api/podcastallone")
        .then((response) => setPodcastAllOne(response.data['podcasts']));
  };




  useEffect(() => {
    fetchBannerData()
    fetchEventsData();
    fetchNextEventData();
    fetchSermonsAllOneData();
    fetchPodcastsAllOneData();
    fetchNewsData();
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


    {/*  BANNER  */}
     <div className='homeabout'>
      <Fade delay={300} duration={2000}>
        <Container fluid>
          <Row>
            <Col md={12}>
              <div id='homesermonimgdiv' style={{ backgroundColor:'#D2DAE6' }}>

                  <div
                    style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px' }}>
                    <Row>
                      <Col sm={6}>
                      <br></br>
                      <div id="homebanner">
                        <h6>
                          WELCOME TO
                        </h6>
                        <h5>
                          ADE AJALA MINISTRIES
                          <hr style={{ width:'50%' }}></hr>
                        </h5>
                        <p>We strive to empower individuals to depeen their relationship <br></br>
                        with God and live out their faith in meaningful ways</p>
                        <br></br>
                        <Link to='/livestream' reloadDocument className='btn btn-danger' id='btn'>JOIN SERVICE</Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to='/events' reloadDocument className='btn btn-danger' id='btn'>UPCOMING EVENT</Link>
                      </div>
                      </Col>
                      <Col md={6}>
                        <div className=''>
                        <br></br>
                        <div id='homeaboutimgdiv'>
                           <Image src="images/newbishopimg.png" thumbnail fluid id="homeaboutimg" />
                        </div>
                        </div>
                      </Col>
                 </Row>

                </div>
              </div>

            </Col>

          </Row>
        </Container>
       </Fade>
      </div>
      <br></br>

    


      {/*  About  */}
      <div id="sectionmargin" className='homeabout'>
      <Container>
      <Row>
          <Col md={12}>
                        
                <h4 id="bluecolor" class='text-center'>About Us</h4>
                <hr style={{ borderTop: '2px solid red',width:'10%',margin:'auto' }}></hr>
           </Col>
                <br></br><br></br><br></br>
      </Row>
      </Container>
      <Fade delay={300} duration={2000}>
        <Container>
          <Row>
            <Col md={6}>
              <div id='homeaboutimgdiv'>
              <Image src="images/bishop.png" thumbnail fluid id="homeaboutimg" />
              </div>

            </Col>
            <Col md={6}>
            <Row>
                <div style={{ marginTop: '20px' }}></div>
                <Col sm={12}>
                  <br></br>
                  <div id="homeourmission">
                    <Row>
                    <Col md={2}>
                    <div>
                    <h5 id="bluecolor">
                      <Button style={{ backgroundColor: 'red', border: 'none' }}>
                        <FontAwesomeIcon icon={faBible} style={{ color: '#fff', fontSize: '40px' }} />

                      </Button>
                    </h5>
                    </div>
                    </Col>
                    <Col md={10}>
                    <div>
                    <p>
                    <h5 id='bluecolor'>Our Mission</h5>
                    Our mission is to raise champions <br></br>for kingdom assignment and see<br></br>
                    lives transformed.
                    </p>
                    </div>
                    </Col>
                    </Row>
                  </div>
                </Col>
                <Col sm={12}>
                <Row>
                  <Col md={2}>
                  <div>
                  <h5 id="bluecolor">
                    <Button style={{ backgroundColor: 'red', border: 'none' }}>
                      <FontAwesomeIcon icon={faHeart} style={{ color: '#fff', fontSize: '40px' }} />

                    </Button>
                  </h5>
                  </div>
                  </Col>
                  <Col md={10}>
                  <div>
                  <h5 id='bluecolor'>Our Vision</h5>
                  <p>
                     Changing nations, one life at a <br></br>time
                  </p>
                  <br></br>
                  <Link to='/about' reloadDocument className='btn btn-danger' id='btn'>Read More</Link>
                  </div>
                  </Col>
                </Row>
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
                             <Link to='/donation' reloadDocument style={{ textDecoration:'none' }}>
                              <Card id="deptcard" style={{ backgroundColor: '#000080', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <button className='btn' style={{ backgroundColor: '#fff', color: '#000080', borderRadius: '50%', marginTop: '10px', marginBottom: '10px', fontSize: '20px' }}><FontAwesomeIcon icon={faGift} /></button>
                                          <br></br><br></br>
                                          <h5 style={{ color: '#fff', fontSize: '18px' }}>Donate</h5>
                                          <p>With your support, we can continue spreading God's love, reaching out to those in need, and making a positive impact in our community and beyond.<br></br></p>
                                      </div>
                                  </Card.Title>
                              </Card>
                              </Link>
                          </Col>

                          <Col md={4}>
                             <Link to='/giving' reloadDocument style={{ textDecoration:'none' }}>
                              <Card id="deptcard" style={{ backgroundColor: '#FF4500', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <button className='btn' style={{ backgroundColor: '#fff', color: '#FF4500', borderRadius: '50%', marginTop: '10px', marginBottom: '10px', fontSize: '20px' }}><FontAwesomeIcon icon={faDollar} /></button>
                                          <br></br><br></br>
                                          <h5 style={{ color: '#fff', fontSize: '18px' }}>Give</h5>
                                          <p>Your giving is a powerful act of worship and generosity. You are not only supporting the work of God's kingdom but also sowing seeds of blessings in your own life.<br></br></p>
                                      </div>
                                  </Card.Title>
                              </Card>
                              </Link>
                          </Col>

                          <Col md={4}>
                             <Link to='/volunteers' reloadDocument style={{ textDecoration:'none' }}>
                              <Card id="deptcard" style={{ backgroundColor: '#0085FF', color: '#fff', padding: '50px' }}>
                                  <Card.Title>
                                      <div className='text-center' id="whitecolor">
                                          <button className='btn' style={{ backgroundColor: '#fff', color: '#0085FF', borderRadius: '50%', marginTop: '10px', marginBottom: '10px', fontSize: '20px' }}><FontAwesomeIcon icon={faHeart} /></button>
                                          <br></br><br></br>
                                          <h5 style={{ color: '#fff', fontSize: '18px' }}>Volunteer</h5>
                                          <p>Your giving is a powerful act of worship and generosity. You are not only supporting the work of God's kingdom but also sowing seeds of blessings in your own life.<br></br></p>
                                      </div>
                                  </Card.Title>
                              </Card>
                              </Link>
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
              <p id="whitecolor">Experience the convenience of staying connected with Ade-Ajala Ministries wherever you go by downloading our mobile app. With our app, you can access a wealth of spiritual resources, inspiration, and community engagement features right at your fingertips.</p>
            
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

       <br></br><br></br>
       {/*  LIVE STREAM    */}
      <div>
        <Fade delay={300} duration={2000}>
        <Container style={{ backgroundColor: '#000', margin: '0px' }} fluid>
        <div style={{ position: 'relative' }}>
            <div id="overlay" style={{ position: '', width: '100%', height: '100%', top: '0', bottom: '0', right: '0', left: '0', backgroundColor: '#204782' }}>
              <Row>
                <Col md={8}>
                  <div id="faithid">
                    <h4 id="whitecolor">GET CONNTECTED WITH<br></br>
                     BISHOP ISREAL ADE-AJALA
                    </h4>
                    <p id="whitecolor" style={{ fontWeight:'bold' }}>EVERY FRIDAY BY 12:30pm</p>
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



      {/*  Sermons  */}
      <div id="sectionmargin" className='homeabout'>
      <Fade delay={300} duration={2000}>
        <Container>
          <Row>
            <Col md={12}>
              <div id='homesermonimgdiv'>
                
              {

              sermons && sermons.length > 0 && sermons.map((sermonData) => {
                return <Row>
                  <div
                    style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px' }}>
                    <Row>
                      <Col md={6}>
                        <div className=''>
                          <iframe style={{ width: '100%', height: '350px', margin: 'auto' }}
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
                      <Col sm={6}>
                      <br></br>
                      <div id="homeourmission">
                        <h5 id="bluecolor">
                          MESSAGES
                        </h5>
                        <p>
                          {sermonData.sermons_date}
                        </p>
                        <h6>{sermonData.sermons_title}</h6>
                        <p>Join us as we journey together in faith, seeking God's presence and sharing His love with the world. No matter where you are in your spiritual journey, you are welcome here at Ade Ajala Ministries. We look forward to walking alongside you as we grow together in Christ.</p>
                      </div>
                      <div>
                      <Link to='/sermons' reloadDocument className='btn btn-danger' id='btn'>DISCOVER MORE</Link>
                      </div>
                    </Col>
                 </Row>

                </div>
                </Row>
                })
                }
              </div>

            </Col>

          </Row>
        </Container>
       </Fade>
      </div>
      <br></br>


      {/* Podcast  */}

      <div>
      <br></br><br></br>
            <Container>
                <Row>
                  
                    
                    {
                        podcasts && podcasts.length > 0 && podcasts.map((podcastsData) => {
                            return <>
                                {podcastsData.podcasts_title !== '' ?
                                    <Row style={{ backgroundColor: '#fff' }}>
                                      <h5 id="bluecolor" className='homepodcast'>PODCAST</h5>
                                        <div
                                            style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '30px' }}>
                                            <Row>
                                                <Col md={2}>
                                                    <div className='text-center'>
                                                            <br></br>
                                                            <h6 style={{ fontWeight: 'bold' }} className="text-center bluecolor">
                                                                {podcastsData.podcasts_title}
                                                            </h6>
                                                    </div>

                                                </Col>
                                                <Col md={10}>
                                                    <div className='podcastalign'>
                                                        <div className='text-center'>
                                                            <audio controls style={{ width: '100%', backgroundColor: '#135592', borderRadius: '20px' }}>
                                                                <source src={podcastsData.podcasts_file}
                                                                    type="audio/mpeg">
                                                                </source>

                                                            </audio>
                                                        </div>
                                                        <div>
                                                            <p className='text-center'>
                                                                <ButtonGroup className="me-2" aria-label="Second group" style={{ color: 'red' }}>
                                                                <Link to='/podcast' reloadDocument className='btn btn-danger' id='btn'>LISTEN MORE</Link>

                                                                </ButtonGroup>
                                                            </p>
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


     {/*  KCILE  */}
     <div id="sectionmargin" className='homeabout'>
      <Fade delay={300} duration={2000}>
        <Container fluid>
          <Row>
            <Col md={12}>
              <div id='homesermonimgdiv' style={{ backgroundColor:'#D2DAE6' }}>

                  <div
                    style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '50px' }}>
                    <Row>
                      <Col sm={6}>
                      <br></br>
                      <div id="homeourmission">
                        <h5 id="bluecolor">
                          KINGDOM CONNTECTION INSTITUTE <br></br>LIFE EMPOWERMENT
                        </h5>
                        <p style={{ style:'#000', fontSize:'16px' }}>Welcome to Kingdom Connection Institute - your gateway to life empowerment and spiritual growth. Our institute is dedicated to providing transformative teachings and resources that empower individuals to live purposefully and abundantly in alignment with God's kingdom principles.
                        At Kingdom Connection Institute, we offer a range of life empowerment programs designed to nurture personal development, spiritual growth, and leadership skills. Through dynamic teachings, practical workshops, and impactful resources, we equip individuals with the tools and insights needed to navigate life's challenges and unlock their full potentials.
                        </p>
                      </div>
                      <div>
                      <Link to='/kcile' reloadDocument className='btn btn-danger' id='btn'>Apply Now</Link>
                      </div>
                      </Col>
                      <Col md={6}>
                        <div className=''>
                        <div id='homekcileimgdiv'>
                           <Image src="images/kcilelogo.png" thumbnail fluid id="homekcileimg" />
                        </div>
                        </div>
                      </Col>
                 </Row>

                </div>
              </div>

            </Col>

          </Row>
        </Container>
       </Fade>
      </div>
      <br></br>



    {/*  E STORE  */}
     <div id="sectionmargin" className='homeabout'>
      <Fade delay={300} duration={2000}>
        <Container fluid>
          <Row>
            <Col md={12}>
              <div id='homesermonimgdiv'>

                  <div
                    style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px' }}>
                 <Row>
                      <Col md={5}>
                        <div className=''>
                        <div id='homestoreimgdiv'>
                           <Image src="images/estore.png" thumbnail fluid id="homeaboutimg" />
                        </div>
                        </div>
                      </Col>
                      <Col sm={7}>
                      <br></br>
                      <div id="homeourmission">
                        <h5 id="bluecolor">
                          E-STORE
                        </h5>
                        <p>Welcome to our e-store, where faith meets literature in a harmonious blend of inspiration and knowledge. Dive into a world where words ignite the spirit and illuminate the path to enlightenment. Our collection of faith-filled books is carefully curated to cater to the spiritual seeker, the devout believer, and the curious soul alike.</p>
                      </div>
                      <div>
                      <Link to='#' reloadDocument className='btn btn-danger' id='btn'>EXPLORE MORE</Link>
                      </div>
                      </Col>
                 </Row>

                </div>
              </div>

            </Col>

          </Row>
        </Container>
       </Fade>
      </div>
      <br></br>


    
    {/*  PRAYER REQUEST  */}
    <div id="sectionmargin" className='homeabout'>
      <Fade delay={300} duration={2000}>
        <Container fluid>
          <Row>
            <Col md={12}>
              <div id='homesermonimgdiv' style={{ backgroundImage: "url(/images/course3.png)", backgroundRepeat:'no-repeat',backgroundSize:'cover', backgroundPosition:'center' }}>

                  <div
                    style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px' }}>
                 <Row>
                      <Col md={6}>
                      </Col>
                      <Col sm={6}>
                      <br></br>
                      <div id="homeourmission">
                      <Card id="deptcard" style={{ backgroundColor: '#135592', color: '#fff' }}>
                                <Card.Header style={{ backgroundColor: '#135592', color: '#fff', fontSize: '20px', textAlign: 'center' }}>
                                  PRAYER REQUEST
                                </Card.Header>
                                <Card.Body>
                                    <Form>

                                        <InputGroup className="mb-3" controlId="">
                                            <Form.Control type="text" size="lg" placeholder="Name" style={{ fontSize: '16px', padding: '15px' }}
                                                value={prayeruser_name} onChange={(e) => setPrayerUserName(e.target.value)} />
                                        </InputGroup>

                                        <InputGroup className="mb-3" controlId="">        
                                            <Form.Control type="email" size="lg" placeholder="Email" style={{ fontSize: '16px', padding: '15px' }}
                                                value={prayeruser_email} onChange={(e) => setPrayerUserEmail(e.target.value)} />
                                      
                                        </InputGroup>

                                        <InputGroup className="mb-3" controlId="">
                                            <Form.Control type="text" size="lg" placeholder="Pnone Number" style={{ fontSize: '16px', padding: '15px' }}
                                                value={prayeruser_pnum} onChange={(e) => setPrayerUserPnum(e.target.value)} />
                                        </InputGroup>


                                        <Form.Group className="mb-3" controlId="">
                                            <Form.Control type="text" size="lg" placeholder="Message" style={{ fontSize: '16px', padding: '15px' }}
                                                value={prayeruser_request} onChange={(e) => setPrayerRequest(e.target.value)} as="textarea" rows={3} />
                                        </Form.Group>
                                    </Form>
                                    <div>
                                        {
                                            messagep === 'success' ?
                                                <div className='alert alert-success alert-sm'>
                                                    {successmessagep}
                                                </div> :
                                                ''
                                        }

                                        {
                                            messagep === 'error' ?
                                                <div className='alert alert-danger alert-sm'>
                                                    {errormessagep}
                                                </div> :
                                                ''
                                        }
                                    </div>
                                    <ButtonToolbar
                                        className="justify-content-between"
                                        aria-label="Toolbar with Button groups"
                                    >

                                        <ButtonGroup className="me-4" aria-label="First group">
                                            {
                                                buttontextp === "Processing" ?
                                                    <Button class="btn btn-danger" style={{ backgroundColor: '#249D59', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={Save}>
                                                        {buttontextp}
                                                    </Button> :
                                                    ''
                                            }

                                            {
                                                buttontextp === "Send" ?
                                                    <Button class="btn btn-danger" style={{ backgroundColor: 'red', color: '#fff', borderRadius: '0', border: 'none', fontWeight: 'bold' }} onClick={Save}>
                                                        {buttontextp}
                                                    </Button> :
                                                    ''
                                            }
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </Card.Body>
                            </Card>
                      </div>
                      </Col>
                 </Row>

                </div>
              </div>

            </Col>

          </Row>
        </Container>
       </Fade>
    </div>
    <br></br>


      {/*  CONTACT  */}
      <div id="sectionmargin" className='homeabout'>
      <Fade delay={300} duration={2000}>
        <Container fluid>
          <Row>
            <Col md={12}>
              <div id='homesermonimgdiv' style={{ background:'#204782' }}>

                  <div
                    style={{ borderRadius: '0px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '20px' }}>
                 <Row>

                      <Col sm={6}>
                      <div id="homecontactdiv">
                        <p style={{ color:'#fff' }}>At Ade-Ajala Ministries, we value your feedback, enquiries and <br></br>connections. Reach out to us effortlessly through email or any <br></br> of our active social media platform.</p>
                      </div>
                      </Col>
                      <Col md={4}>
                        <div id='homesocialmedia'>
                        <div>
                                <p className='text-center'>
                                    <ButtonGroup className="me-2" aria-label="First group">
                                        <Link to="https://facebook.com/KcccDenver" reloadDocument className='btn btn-danger' id="homesocialbtn" target='blank'>
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </Link>
                                    </ButtonGroup>
                                    <ButtonGroup className="me-2" aria-label="Second group">
                                        <Link to="https://instagram.com/Kcccaurora" reloadDocument className='btn btn-danger' id="homesocialbtn" target='blank'>
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </Link>

                                    </ButtonGroup>
                                    <ButtonGroup className="me-2" aria-label="Second group">
                                        <Link to="https://twitter.com/pastorade" reloadDocument className='btn btn-danger' id="homesocialbtn" target='blank'>
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </Link>
                                    </ButtonGroup>
                                    <ButtonGroup className="me-2" aria-label="Second group">
                                        <Link to="https://youtube.com/@adeajalaministries" reloadDocument className='btn btn-danger' id="homesocialbtn" target='blank'>
                                            <FontAwesomeIcon icon={faYoutube} />
                                        </Link>
                                    </ButtonGroup>

                                </p>
                            </div>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div id='homecontact'>
                          <div>
                           <Link to='#' reloadDocument className='btn btn-danger' id='btn'>CONTACT US</Link>
                          </div>
                        </div>
                      </Col>
                 </Row>

                </div>
              </div>

            </Col>

          </Row>
        </Container>
       </Fade>
      </div>
      <br></br>


      {/*  NEWS */}
      <div>
      <br></br><br></br>
      <Container>
                <Row>
                    
                    <h5 id="bluecolor">LATEST NEWS</h5>
                    {
                        news && news.length > 0 && news.map((newsData) => {
                            return <>
                                {newsData.news_title !== '' ?
                                    <Col md={3}>
                                        <Card id="deptcard">
                                            <Card.Img variant="top" src={newsData.news_file} />
                                            <Card.Body className='text-center'>
                                                <Card.Title>
                                                    <p className='homeminicalevents'>
                                                        <ButtonGroup vertical>
                                                            <Button style={{ backgroundColor: '#135592', color: '#fff', fontWeight: '800', border: 'none', borderRadius: '0', height: '' }}>{newsData.news_date}</Button>
                                                        </ButtonGroup>
                                                    </p>
                                                    <h6 id="bluecolor">{newsData.news_title}</h6>
                                                </Card.Title>
     
                                                <Link to={"/news-details?newsid=" + newsData.news_id}
                                                    variant="danger" className='btn btn-danger btn-sm'
                                                    style={{ textDecoration: 'none', color: '#135592', border: '1px solid red', borderRadius: '0', backgroundColor: 'transparent' }} reloadDocument>New Details</Link>
                                            </Card.Body>
                                        </Card>
                                    </Col> :
                                    <Col md={12}>
                                        <Card id="deptcard">
                                            <Card.Body className='text-center'>
                                                <Card.Title>
                                                    No News For Now
                                                </Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                }
                            </>
                        })
                    }
                </Row>
                <br></br>
                <Row>
                  <Col>
                     <div>
                        <p className='text-center'>
                            <ButtonGroup className="me-2" aria-label="Second group" style={{ color: 'red' }}>
                            <Link to='/news' reloadDocument className='btn btn-danger' id='btn'>Read More</Link>

                            </ButtonGroup>
                        </p>
                    </div>
                  </Col>
                </Row>


            </Container>
      </div>


    </div>
  );
};
