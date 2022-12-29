import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: 'blue' }}>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear() } Copyright:
        <a className='text-white' href='#'>
         accommodationfindergroup6.com
        </a>
      </div>
    </MDBFooter>
  );
}