import { React, useEffect, useState } from 'react'
import { Card, Image } from 'react-bootstrap';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Button, ButtonGroup, ButtonToolbar, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faShareNodes, faDownload, faFileAudio, faUser, faLocation, faClock, faPerson, faArrowLeft, faAngleRight, faShare } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import { serverurl } from '../../providers/ServerUrl';
import '../EventDetail.css';
import './Podcast.css';
import { Podcasts } from '../../components/Podcasts';

export const Podcast = () => {


    /**********************************************
       GET THE PODCAST FROM THE API
     **********************************************/

    const [podcasts, setPodcast] = useState([]);


    const fetchPodcastData = () => {
        return axios.get(serverurl + "/api/podcastweb")
            .then((response) => setPodcast(response.data['podcasts']));
    };

    useEffect(() => {
        fetchPodcastData();
    }, [])



    return (
        <div>

            <div>
                <br></br><br></br>
                <div style={{ position: 'relative' }}>
                    <Image fluid src="images/headerbanner.png" alt="Card image" id="bannerimg" />
                    <div id="banneroverlay">
                        <div id="bannerid" className='text-center'>
                            <h4>PODCAST</h4>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>

            <br></br><br></br>

             <Podcasts podcasts={podcasts}/>

            <br></br><br></br>
              
            </div>





        </div >
    )
}
