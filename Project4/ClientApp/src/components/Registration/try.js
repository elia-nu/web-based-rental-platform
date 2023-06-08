import React, { Component } from "react";
import axios from "axios";

class ImageUpload extends Component {
    state = {
        imageFile: null,
    };

    handleImageChange = (event) => {
        this.setState({
            imageFile: event.target.files[0],
        });
    };

    uploadImage = () => {
        if (!this.state.imageFile) {
            return;
        }

        // Upload the image to the ASP.NET Core Web API.
        axios
            .post("https://localhost:7075/api/images", this.state.imageFile, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // Display the image in the component.
                this.setState({
                    image: response.data,
                });
            });
    };

    render() {
        return (
            <div>
                <input type="file" name="image" id="image" onChange={this.handleImageChange} />
                <button onClick={this.uploadImage}>Upload</button>
                {this.state.image && (
                    <img src={this.state.image} />
                )}
            </div>
        );
    }
}

export default ImageUpload;

  