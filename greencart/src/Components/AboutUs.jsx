import React from 'react'
import grouppic from '../assets/Images/group pic.png';
import logo from '../assets/Images/flow-1.png';
import aboutpic from '../assets/Images/aboutimg.png';

import placeholderImage from '../assets/Images/target.gif';
import placeholderImage1 from '../assets/Images/chart.gif';
import placeholderImage2 from '../assets/Images/globe.gif';

const AboutUs = () => {
    return (
        //  

        <div>
            <div style={{ backgroundColor: '#ffeec8', color: "green" }}>
              <br /><br />
            <h1 style={{ fontFamily: 'Papyrus, fantasy', textAlign: 'center' }}> <b>Who we are!!!</b></h1> <br />
                <br/>
        <div class="container marketing">

          <div class="row">
            <div class="col-lg-4">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: 140x140"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#4B6F44" />
                <image href={placeholderImage} width="100%" height="100%" />
              </svg>

              <h2>Our Vision</h2>
              <p>To help people live a better, healthier, and wholesome life by providing them 
                        with 100% certified, authentic organic food.</p>

            </div>
            <div class="col-lg-4">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: 140x140"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#4B6F44" />
                <image href={placeholderImage1} width="100%" height="100%" />
              </svg>

              <h2>Our Mission</h2>
              <p>To be the leading brand of organic food in India. To give back to the environment 
                        and advance on a path to sustainability. To make consumers aware of the benefits of organic 
                        food by giving them healthy choices of eating. To create a big movement that would lead people to 
                        switch to organic food and take-up a healthier lifestyle just like it used to be hundreds of years 
                        ago when pesticides were not introduced and everything we ate was natural and chemical-free.</p>
            </div>
            <div class="col-lg-4">
              <svg
                className="bd-placeholder-img rounded-circle"
                width="140"
                height="140"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#4B6F44" />
                <image href={placeholderImage2} width="100%" height="100%" />
              </svg>

              <h2>Our Journey</h2>
              <p>We’ve turned the wheel full circle at Organic Tattva, by building a culture that thrives on 
                        the principles of health, ecology, fairness and care. From nurturing our soil and crops with 
                        unadulterated nourishment to testing each product for 186 pesticides, we follow the highest 
                        standards of quality and hygiene.</p>
            </div>
          </div>
        </div> <br/><br/>
            <div className='container-fluid'>
                <div style={{ textAlign: 'center' }}>
                    <img src={grouppic}
                    /> <br /><br /><br />
                    <h4> <b>OUR GIVEBACK PROMISE</b></h4><br />
                    <h4 className=' text-center ' >
                        “When tillage begins, other arts follow. The farmers, therefore, are the founders of human 
                        civilization.” Daniel Webster Our sustainable farming techniques benefit an 
                        entire community of organic farmers, from whom we source our healthy organic 
                        produce. These farmers, nearly 9000 of them, belong to diverse states like Uttar 
                        Pradesh, Maharashtra, Madhya Pradesh, Rajasthan, and Jammu & Kashmir, where they
                         cultivate crops that are endemic to their geographies. This means, our produce 
                         can be traced back to precise regions, which in turn, reassures our customers 
                         of its purity. While we manage the operations of the farms that are spread 
                         across a total crop area 15,390 ha., we also empower our farmers with the know-
                         how of organic farming. We invest in them, and train them to practice environmentally-
                         friendly farming techniques and grow crops that meet world-class standards. We help them practice 
                         mindful transactions and consumption and assure them of fair market prices.
                    </h4> <br /><br /> 
                    <img src={logo} />
                </div> <br /> <br/><br/>
            </div>
            <div className='row'>
                <div className='col-7'>
                    <img src={aboutpic}  style={{marginLeft:'250px', marginTop:'40px',height:'400px', width:'500px'}}/></div>
                <div className='col-5'>
                    <h5 style={{ textAlign: 'left', letterSpacing: '1.5px', wordSpacing: '1px' }}>
                        <b>&nbsp;&nbsp;- _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ -  &nbsp;&nbsp;</b> <br /><br /><br />
                        We started this brand as a pop up<br /> back in 2017, and we’ve grown it
                        by hand.<br /> From a small 1978 military trailer to two<br /> retail locations and an
                        online store, we’re <br />committed to handbuilt, custom quality.<br /> <br />
                        You can truly say that each of our products <br />are one of one,custom made by Spartans, me,  <br />and our
                        team members.We celebrated five years  <br />in 2022, and we’re not slowing down. <br />Thank you for making
                        us your favorite Florida- <br />themed apparel and goods shop, the best is  <br />yet to come! <br /><br /><br />
                        <b>&nbsp;&nbsp;- _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ - _ -  &nbsp;&nbsp;</b>
                    </h5>
                </div>
                
            </div>
            <br/><br/><br/><br/>
        </div>

</div>
    )
}

export default AboutUs
