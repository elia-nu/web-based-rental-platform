import React from 'react'
import AddVehicle1 from './Addvehicle1'

export default function vlist(){
 return(
    <div className='row'>
<div className='col-md-12'>
     <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">vehicle list</h1>
          
          
        </div>
      </div>
</div>
<div className='col-md-4'>
   <AddVehicle1/>
</div>
<div className='col-md-8'>
<h1> vehicle list   </h1>
</div>
    </div>
 )

}