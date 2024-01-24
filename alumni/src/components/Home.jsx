import React from 'react';
import { Link } from 'react-router-dom';
import { AdminAlumni } from './AdminAlumni';
import Top3 from './Top3';


const Home = () => {
  return (
    <div>
    
      <Link to="/add"><button>Add</button>   </Link>
      <Link to="/show"><button>show</button> </Link> 
       {/* <AdminAlumni></AdminAlumni> */}
       {/* <Top3></Top3>  */}
    </div>
  );
};

export default Home;
