import React from 'react';

const Defining = () => {
    return (
        <div className='container-fluid'>
            <div className='row pt-4'>
                <div className='col-sm-2'></div> {/* Empty column for left space */}
                <div className='col-sm-8'>
                    <div className='col-lg-12'>
                        <h2 className="newppageintro1">Defining KYC</h2>
                        <div className="darkunderline"></div>
                        <b style={{ color: '#118fc9' }}>Definition</b>
                        <hr style={{ border: '3px solid #118fc9', width: '10%' }}></hr>

                        <strong style={{ fontSize: '16px' }}>
                            <em>
                                What is KYC? - Know Your Customer (KYC) refers to the process of verifying the identity of customers to ensure they are who they claim to be. It is a mandatory process followed by financial institutions, businesses, and organizations to prevent fraud, money laundering, and other illegal activities.
                                {' '}
                                <a className="mybluelink1" href="https://en.wikipedia.org/wiki/Know_your_customer">
                                    Wikipedia
                                </a>
                            </em>
                        </strong>
                        <strong style={{ fontSize: '16px' }}>
                            <em>"KYC regulations require organizations to collect and verify certain information about their customers before providing them with services. This information typically includes identity documents, proof of address, and other relevant details."</em>
                        </strong>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <p>
                                The role of Know Your Customer (KYC) compliance is crucial in various industries, especially in banking, finance, and online businesses. KYC procedures ensure that businesses establish the identity of their customers, assess their risk factors, and monitor their transactions to detect and prevent suspicious activities.
                            </p>
                            <p>
                                KYC processes involve gathering and verifying customer information through documents such as passports, driver's licenses, utility bills, etc. Once verified, customers are granted access to the services offered by the organization.
                            </p>
                        </div>
                        <div className="col-lg-4">
                            <img
                                src={'https://miro.medium.com/v2/resize:fit:720/format:webp/1*sNM_Q6uUblHJr5IQ9MaySA.gif'}
                                alt="What is KYC"
                                className="img-fluid"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <p>
                                <strong style={{ fontSize: '16px' }}>
                                    “What is KYC?”
                                </strong> - This article provides an overview of KYC regulations, the importance of KYC compliance, and the procedures involved in KYC verification. It aims to educate businesses and individuals about their obligations regarding KYC and the benefits of implementing robust KYC practices.
                            </p>
                            <p>
                                KYC compliance helps businesses build trust with their customers, reduce the risk of financial crimes, and comply with regulatory requirements. By verifying the identity of their customers, businesses can enhance security, prevent fraud, and safeguard their reputation.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col-sm-2'></div> {/* Empty column for right space */}
            </div>
        </div>
    );
};

export default Defining;
