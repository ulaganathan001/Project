import React from 'react';
import Process1 from '../assets/Images/Process1.png';
import Process2 from '../assets/Images/Process2.png';
import Process3 from '../assets/Images/Process3.png';

const Delivery = () => {
    return (
        <div className="container px-4 py-5 delivery-process">
                <h5 className='text-center display-4 mt-4 fw-bold'>Why Green Cart..?</h5>
            <div className="row g-4 py-5 row-cols-1 row-cols-sm-2 row-cols-md-3">
                <div className="col px-5 text-center">
                    <div className="mb-3">
                        <img src={Process1} className='w-50 h-50' alt="" />
                    </div>
                    <h2>Trust Worthy</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                </div>
                <div className="col px-5 text-center">
                    <div className="mb-3">
                    <img src={Process2} className='w-50 h-50' alt="" />
                    </div>
                    <h2>Affordable Price</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                </div>
                <div className="col px-5 text-center">
                    <div className="mb-3">
                    <img src={Process3} className='w-50 h-50' alt="" />
                    </div>
                    <h2>Happy Eating</h2>
                    <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                </div>
            </div>
        </div>
    )
}

export default Delivery
