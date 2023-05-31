import React from 'react';

const Footer = () => {
    return (
        <div className="container">
            <div className="vo">
                <h1>Features & Benefits</h1>
                <h1>____________________</h1>
                

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                    <div className="col">
                        <h1>Features</h1>
                        <ul>
                            <li>Feature 1</li>
                            <li>Feature 2</li>
                            <li>Feature 3</li>
                            <li>Feature 4</li>
                            <li>Feature 5</li>
                        </ul>
                    </div>

                    <div className="col">
                        <h1>Benefits</h1>
                        <ul>
                            <li>Benefit 1</li>
                            <li>Benefit 2</li>
                            <li>Benefit 3</li>
                            <li>Benefit 4</li>
                            <li>Benefit 5</li>
                        </ul>
                    </div>
                    <div className="col">
                        <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp" alt="Los Angeles Skyscrapers" style="height:420px; width:300px; padding-top:10px;">
</img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
