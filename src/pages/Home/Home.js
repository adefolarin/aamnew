// VideoBackground.js
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Card, ButtonToolbar, ButtonGroup, Image, Tab, Nav, InputGroup, Form, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faMousePointer, faPlane, faPlaneUp, faPlaneSlash, faPlaneDeparture, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
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
import { faEnvelope, faPhone, faMapLocation, faAddressCard, faAddressBook } from '@fortawesome/free-solid-svg-icons';
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



  useEffect(() => {
    fetchBannerData()
    fetchEventsData();
    fetchNextEventData();
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
            
              <Image src="images/about.png" thumbnail fluid id="homeaboutimg" />

            </Col>
            <Col md={7}>
              <Row>
              <div style={{ marginTop: '20px' }}></div>
                <Col sm={12}>
                  <p>
                    Kingdom Connection Christian Center is a Word of Faith, non-denominational, full gospel church.
                  </p>
                  <p>
                     We believe the Bible, the complete writings of both the Old and New Testaments is the literal Word of God, verbally inspired by the Holy Spirit, inerrant as originally given by God, and infallible as the standard of our faith and practice...
                  </p>
                  <p>
                  Our mission is reaching and harvesting lost souls for Christ and teaching the Body of Christ how to effectively apply God’s principles to have victory in every area of life. Kingdom Connection Christian Center is a church committed to raising champions in the body of Christ.
                  </p>
                  <p>
                  Our mission is reaching and harvesting lost souls for Christ and teaching the Body of Christ how to effectively apply God’s principles to have victory in every area of life. Kingdom Connection Christian Center is a church committed to raising champions in the body of Christ.
                  </p>
                  <p>
                  Our mission is reaching and harvesting lost souls for Christ and teaching the Body of Christ how to effectively apply God’s principles to have victory in every area of life. Kingdom Connection Christian Center is a church committed to raising champions in the body of Christ.
                  </p>
                  <p>
                  Our mission is reaching and harvesting lost souls for Christ and teaching the Body of Christ how to effectively apply God’s principles to have victory in every area of life. Kingdom Connection Christian Center is a church committed to raising champions in the body of Christ.
                  </p>

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
