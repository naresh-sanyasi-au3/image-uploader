import React from 'react';
import axios from 'axios';


class Getimage extends React.Component {
    state = {
        images: []
    };
    // const getImage = async () => {
    //     try {
    //         const data = await axios.get('http://localhost:5000/uploads/')

    //         console.log(data.filename)

    //     } catch (error) {
    //         console.log(error);

    //     }

    // }


    componentDidMount() {
        // try {
        //     const data = axios.get('http://localhost:5000/uploads/')

        //     console.log(data)

        // } catch (error) {
        //     console.log(error);

        // }



        axios.get('http://localhost:5000/uploads')
        .then((res) => {
            this.setState({images:res.data})
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
                    this.state.images.map((image, index)=>(
                        <div key={image._id}>
                            {image.filename.map((file, i)=>(
                                <div>
                                 <img src={`http://localhost:5000/${file.path}`} alt = {file.filename} className="image"/>
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
