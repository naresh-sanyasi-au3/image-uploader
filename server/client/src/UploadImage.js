import React from 'react';
import axios from 'axios';

class UploadImage extends React.Component {

    state = {
        image: [],
    };
    fileSubmit(e) {
        this.setState({ image: e.target.files});
    };
    uploadImage(e) {
        e.preventDefault();
        let formData = new FormData();
        for (let i = 0; i < this.state.image.length; i++) {
            formData.append('image', this.state.image[i]);
        }
        axios.post('http://localhost:5000/uploads', formData)
            .then(res => console.log(res))
    }


    render() {
        return (
            <div className="container">

                <form className="form">
                    <h3>Image Upload</h3> <br />
                    <input type="file" onChange={this.fileSubmit.bind(this)} value={this.state.filename} multiple/> <br /> <br />
                    <input type="submit" value="post" className="btn" onClick={this.uploadImage.bind(this)} />
                </form>
            </div>
        )
    }
}

export default UploadImage;
