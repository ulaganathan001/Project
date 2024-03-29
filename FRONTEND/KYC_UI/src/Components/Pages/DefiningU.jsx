import React from 'react';

const DefiningU = () => {
    return (
        <div className='container-fluid'>
            <div className='row pt-4'>
                <div className='col-sm-2'></div> {/* Empty column for left space */}
                <div className='col-sm-8'>
                    <div className='col-lg-12'>
                        <h2 className="newppageintro1">Importance of Updating KYC</h2>
                        <div className="darkunderline"></div>
                        <b style={{ color: '#118fc9' }}>Why Updating KYC is Crucial</b>
                        <hr style={{ border: '3px solid #118fc9', width: '10%' }}></hr>

                        <strong style={{ fontSize: '16px' }}>
                            <em>
                                Updating Know Your Customer (KYC) information is essential for businesses and organizations to ensure compliance with regulations and maintain the integrity of their operations. KYC updates allow businesses to verify the current identity and status of their customers, mitigating risks associated with outdated or inaccurate information.
                                {' '}
                                <a className="mybluelink1" href="https://en.wikipedia.org/wiki/Know_your_customer">
                                    Learn more about KYC
                                </a>
                            </em>
                        </strong>
                        <strong style={{ fontSize: '16px' }}>
                            <em>"Regularly updating KYC information helps businesses stay informed about changes in their customers' profiles, enabling them to make informed decisions, mitigate risks, and prevent fraudulent activities."</em>
                        </strong>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <p>
                                The significance of updating KYC lies in its role in enhancing security, preventing financial crimes, and maintaining regulatory compliance. By ensuring that customer information is accurate and up-to-date, businesses can effectively manage risks associated with money laundering, terrorism financing, and other illegal activities.
                            </p>
                            <p>
                                Additionally, updating KYC information enables businesses to better understand their customers' financial behaviors and preferences, facilitating personalized services and targeted marketing efforts. Moreover, it strengthens customer relationships by demonstrating a commitment to transparency, security, and regulatory compliance.
                            </p>
                        </div>
                        <div className="col-lg-4">
                            <img
                                src={'https://miro.medium.com/v2/resize:fit:720/format:webp/1*sNM_Q6uUblHJr5IQ9MaySA.gif'}
                                alt="Importance of Updating KYC"
                                className="img-fluid"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <p>
                                <strong style={{ fontSize: '16px' }}>
                                    “Importance of Updating KYC”
                                </strong> - This article emphasizes the significance of regularly updating KYC information for businesses and organizations. It highlights the benefits of maintaining accurate customer data, such as risk mitigation, regulatory compliance, and enhanced customer relationships.
                            </p>
                            <p>
                                By understanding the importance of updating KYC, businesses can proactively address compliance requirements, protect themselves from financial crimes, and foster trust and confidence among their customers and stakeholders.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col-sm-2'></div> {/* Empty column for right space */}
            </div>
        </div>
    );
};

export default DefiningU;
