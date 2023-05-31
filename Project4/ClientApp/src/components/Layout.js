import React, { Component } from 'react';
import './style.css';
import { NavMenu } from './NavMenu';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';


export class Layout extends Component {
  static displayName = Layout.name;
  
  render() {

    return (
      <div>
            <NavMenu />
            <div className="content">
                {this.props.children}
            </div>
                
        <div className="row mt-5">
      <div className="col-md-12">
                    <hr />
                <footer>
                    <MDBFooter className='text-center' color='white' bgColor='dark'>
                        <MDBContainer className='p-4'>
                            <section className='mb-4'>
                                <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                                    <MDBIcon fab icon='facebook-f' />
                                </MDBBtn>

                                <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                                    <MDBIcon fab icon='twitter' />
                                </MDBBtn>

                                <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                                    <MDBIcon fab icon='google' />
                                </MDBBtn>

                                <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                                    <MDBIcon fab icon='instagram' />
                                </MDBBtn>

                                <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                                    <MDBIcon fab icon='linkedin-in' />
                                </MDBBtn>

                                <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                                    <MDBIcon fab icon='github' />
                                </MDBBtn>
                            </section>

                            <section className='mb-4'>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
                                    voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
                                    sequi voluptate quas.
                                </p>
                            </section>

                            <section className=''>
                                <MDBRow>
                                    <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                                        <h5 className='text-uppercase'>Links</h5>

                                        <ul className='list-unstyled mb-0'>
                                            <li>
                                                <a href='#!' className='text-white'>
                                                    Link 1
                                                </a>
                                            </li>
                                        </ul>
                                    </MDBCol>

                                    <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                                        <h5 className='text-uppercase'>Links</h5>

                                        <ul className='list-unstyled mb-0'>
                                            <li>
                                                <a href='#!' className='text-white'>
                                                    Link 1
                                                </a>
                                            </li>
                                        </ul>
                                    </MDBCol>

                                    <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                                        <h5 className='text-uppercase'>Links</h5>

                                        <ul className='list-unstyled mb-0'>
                                            <li>
                                                <a href='#!' className='text-white'>
                                                    Link 1
                                                </a>
                                            </li>
                                        </ul>
                                    </MDBCol>

                                    <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                                        <h5 className='text-uppercase'>Links</h5>

                                        <ul className='list-unstyled mb-0'>
                                            <li>
                                                <a href='#!' className='text-white'>
                                                    Link 1
                                                </a>
                                            </li>
                                       
                                        </ul>
                                    </MDBCol>
                                </MDBRow>
                            </section>
                        </MDBContainer>

                        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                            © 2020 Copyright:
                            <a className='text-white' href='https://mdbootstrap.com/'>
                                MDBootstrap.com
                            </a>
                        </div>
                    </MDBFooter>
                </footer>

      </div>
    </div>
      </div>
    );
  }
}
