import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(){
    super();
    this.state={
      name : '',
      Description:'',
      image:''
    }
  }

  fileChange=(event)=>{
    console.log(event.target.files[0])
  }

  // handleChange = (event)=>{
  //   event.preventDefault()
  //   console.log(event.target.value)
  //   this.setState({
  //     [this.state.fullName]:event.target.value,
  //     [this.state.Description]:event.target.value
  //   })
  // }
  handleSubmit=(event)=>{
    event.preventDefault();
    const data = this.state;
    console.log(data)
  }
  componentDidMount(){
    console.log(this.state)
  }


  fileUploadHandler = ()=>{
    const fd = new FormData();
    fd.append('fullName', this.state.name);
    fd.append('description', this.state.Description );
    fd.append('image', this.state.image); 
       
    axios.post('/',fd, {
      onUploadProgress : progressEvent =>{
        console.log('Upload Progress' +Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
      }
    })
      .then(res=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log("Error in uploading", err)
      })

  }

  render() {
    return (
      <div className="App">
        <h1>Forms and Inputs</h1>
        <form style={{alignContent:'center'}} onSubmit={this.handleSubmit}>
          <input  type='text' placeholder='Your Name' value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/><br></br><br></br>
          <textarea type = 'text' placeholder="Description" value={this.state.Description} onChange={(e) => this.setState({Description: e.target.value})}/><br></br>
          <p>Upload your Image</p>
          <input
            style={{display:'none'}}
            type='file' 
            value = {this.state.image} 
            onChange={this.fileChange} 
            ref={fileInput=>this.fileInput=fileInput}/>
          <button onClick={()=>this.fileInput.click()}>Pick file</button>
          <button onClick={this.fileUploadHandler}>Upload</button>
        </form>
      </div>
    );
  }
}

export default App;