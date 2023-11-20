import React from 'react'

const HProduct = ({Image,Image2,Title,Description}) => {
    return (
        <div className="col">
        <div className="card shadow-sm">
            <img src={Image} alt="" className='w-150 h-200'/>

            <div className="card-body d-flex">
                    <img src={Image2} alt="" className='w-25 h-25' />
                    <p>
                        <strong>{Title}</strong>
                        <p>{Description}</p>
                    </p>
            </div>
        </div>
        </div>
    )
}

export default HProduct
