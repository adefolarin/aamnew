import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Row, Col, Image, ButtonGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone, faMapLocationDot, faMapLocation, faAddressCard, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-bootstrap';
import axios  from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import { EventCountDownTimer } from '../../components/EventCountDownTimer';

import './NavBar.css';

export function NavBar() {

  const [mynavbar, setMyNavBar] = useState(false);
  const [news, setNews] = useState([]);
  const [nextevent, setNextEvent] = useState([]);


  /*const changeBackground = () => {
    if (window.scrollY >= 50) {
      setMyNavBar(true);
    } else {
      setMyNavBar(false);
    }
  }*/


  ///window.addEventListener('scroll', changeBackground);

  const fetchNewsData = () => {
    return axios.get(serverurl+"/api/news")
        .then((response) => setNews(response.data['news']));
  };

  const fetchNextEventData = () => {
    return axios.get(serverurl + "/api/nextevent")
        .then((response) => setNextEvent(response.data['event']));
  };

  useEffect(() => {
    fetchNewsData();
    fetchNextEventData();

 },[]);

 
 //let user = JSON.parse(localStorage.getItem('user'));
 const navigate = useNavigate();
  return (

    <>

      <div className="sub-header" id="sub-header">
        <Container>
          <Row>
          
          <Col sm={4}>
              <p style={{ margin: '0px' }} id="subheadertop">
                  WELCOME TO ADEAJALA MINISTRIES                
              </p>
            </Col>
            <Col sm={8}>
               <p style={{ color: '#fff', margin: '0px' }} id="subheadernews">
                    <ButtonGroup className="me-2" aria-label="First group">
                        <Link to="#" className='btn btn-danger' id="socialbtnnav">
                            <FontAwesomeIcon icon={faFacebook} id='icon' />
                        </Link>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                        <Link to="#" className='btn btn-danger' id="socialbtnnav">
                            <FontAwesomeIcon icon={faInstagram} id='icon' />
                        </Link>

                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                        <Link to="#" className='btn btn-danger' id="socialbtnnav">
                            <FontAwesomeIcon icon={faTwitter} id='icon' />
                        </Link>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                        <Link to="#" className='btn btn-danger' id="socialbtnnav">
                            <FontAwesomeIcon icon={faYoutube} id='icon' />
                        </Link>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group" style={{ display:'none' }}>
                        <Link to="#" className='btn btn-danger' id="socialbtnnav">
                            <FontAwesomeIcon icon={faLinkedin} id='icon' />
                        </Link>
                    </ButtonGroup>

                </p>
            </Col>

          </Row>
        </Container>
      </div>


      <div className="sub-headermiddle" id="sub-headermiddle" style={{ backgroundColor:'#135592' }}>
        <Container>
          <Row>
          
          <Col sm={4}>
              <p style={{ margin: '0px' }} id="subheadertop">
                    
                  <FontAwesomeIcon icon={faAddressBook} style={{ color:'#fff' }} id='icon'/>
                  &nbsp;
                  <span style={{ color: '#fff' }}>1391, Oswego Street, Aurora CO 80010</span>
                          
              </p>
          </Col>
          <Col sm={4}>
              <p style={{ margin: '0px' }} id="subheadertop">
              <FontAwesomeIcon icon={faEnvelope} style={{ color:'#fff' }} id='icon'/>
                  &nbsp;
                  <span style={{ color: '#fff' }}>info@kccconline.org</span>             
              </p>
          </Col>
          <Col sm={4}>
              <p style={{ margin: '0px' }} id="subheadertop">
              <FontAwesomeIcon icon={faPhone} style={{ color:'#fff' }} id='icon'/>
                  &nbsp;
                  <span style={{ color: '#fff' }}>+1-720-859-1737</span>               
              </p>
          </Col>
            

          </Row>
        </Container>
      </div>

      <div className="sub-headerbottom" id="sub-headerbottom" style={{ backgroundColor:'#323232' }}>
      <Container>
          <Row>
            <Col sm={6}>
              <Carousel>
              { news && news.length > 0 && news.map((newsData) => {
                return <Carousel.Item>
                  <p style={{ color: '#fff', margin: '0px', textAlign:'center' }}>{
                   newsData.news_title }
                  </p>
                </Carousel.Item>
               })
              }
              </Carousel>
            </Col>
            <Col sm={6}>
               <div>
               {
                nextevent && nextevent.map((nextEventData,index) => {
                return <>
                {
                nextEventData.events_title !== "" ?
                  <div style={{ color:'#fff', margin:'0' }}>
                     <Row>
                      <Col md={12}><p id='nextevent'>NEXT EVENT IN:</p></Col>
                      <Col md={12}>
                        <EventCountDownTimer eventcountdown = {nextEventData.events_countdown}/>
                       </Col>
                     </Row>
                   </div>
                 :
                 <p>NO UPCOMING EVENTS</p>
                }
                </>
                 })
                }
               </div>
             
            </Col>
          </Row>
        </Container>
      </div>


      <div className="navbar-area">
        <Navbar collapseOnSelect expand="lg" style={{ padding: '20px' }}
          className='mynavbar'>
          <Container className='navbarContainer'>
            
            <Navbar.Brand href="/">
              <Image fluid src={mynavbar ? "images/logoaam.png" : "images/logoaam.png"}
                id="logo"
                alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" id='mynavbartoggle' />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto" id="me-auto">
                <Nav.Link href="/" className='navLink' id="navLink">HOME</Nav.Link>
                <Nav.Link href="/about" className='navLink' id="navLink">ABOUT</Nav.Link>
                <Nav.Link href="/sermons" className='navLink' id="navLink">MESSAGES</Nav.Link>
                <Nav.Link href="/podcasts" className='navLink' id="navLink">PODCAST</Nav.Link>
                <Nav.Link href="#" className='navLink' id="navLink">E-STORE</Nav.Link>
                <Nav.Link href="/livestream" className='navLink' id="navLink">LIVE STREAM</Nav.Link>
                <Nav.Link href="/events" className='navLink' id="navLink">EVENT</Nav.Link>
                <Nav.Link href="/kcile" className='navLink' id="navLink">KCILE</Nav.Link>
                <Nav.Link href="/contacts" className='navLink' id="navLink">CONTACT US</Nav.Link>
              </Nav>
              <Nav>       
              <Nav.Link href="/give" className='btn btn-primary' style={{ borderRadius: '5px', backgroundColor: 'red', fontWeight: '700', fontSize: '15px', color:'#fff' }} id="givenavlink">GIVE</Nav.Link>
              </Nav>
              
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

