import React from 'react';

const Testimonial = () => {
    return (
        <div className='container-fluid px-4 py-5 testimonial'>
            <h5 className='text-center display-4 mt-4 fw-bold'>
                Testimonials
            </h5><br />
            <div className="row testimonial">
                <div className="col-lg-4 text-center">
                    <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#777" />
                        <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                    </svg>
                    <h2>Ulaganathan</h2>
                    <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
                    <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
                </div>
                <div className="col-lg-4 text-center">
                    <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#777" />
                        <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                    </svg>
                    <h2>Muthukrishnan</h2>
                    <p>Another exciting bit of representative placeholder content. This time, we've moved on to the second column.</p>
                    <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
                </div>
                <div className="col-lg-4 text-center">
                    <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#777" />
                        <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                    </svg>
                    <h2>Pradeep</h2>
                    <p>And lastly this, the third column of representative placeholder content.</p>
                    <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
