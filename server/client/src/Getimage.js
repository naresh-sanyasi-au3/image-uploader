import React from 'react';
import axios from 'axios';


class Getimage extends React.Component {
    state = {
        images: []
    };

    componentDidMount() {


        axios.get('http://localhost:5000/uploads')
            .then((res) => {
                this.setState({ images: res.data })
                console.log(res.data)

            })
            .catch((error) => {
                console.log(error);

            })
    }


    render() {

        return (
            <div className="get_image" >
                {
                    this.state.images.map(image => (
                        <div key={image._id}>
                            {image.filename.map(file => (
                                <div>
                                    <img src={`http://localhost:5000/${file.path}`} alt={file.filename} className="image" />
                                </div>

                            ))}

                        </div>

                    ))
                }

            </div>
        )
    }
}
export default Getimage;
