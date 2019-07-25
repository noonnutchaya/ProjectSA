import React ,{Component} from 'react';
import firebase from './firebase';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import {Button} from 'antd';

const db = firebase.firestore();

const { TextArea } = Input;


class Test extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            key : "value",
            key2 : 3,
            Name : "",
            Info : "",
            Phone : "",
            stateWork : "",
            WorkLink : ""

        }
    }
    
    componentDidMount(){
        db.collection('CustomerDB').get().then((snapshot)=>{
            snapshot.forEach(doc=>{
                // console.log(doc.data())
            });
        });
     
    }

    addEventListener = e=>{
        e.preventDefault();
        db.collection('CustomerDB').add({
            Name: this.state.Name,
            Info:this.state.Info,
            Phone:this.state.Phone,
            WorkLink:this.state.WorkLink,
            stateWork:this.state.stateWork
        }); 
        console.log("add success") 
    }

    showItem = () => {
        var wholeData = [];
        db.collection('CustomerDB').get().then((snapshot)=>{
            snapshot.forEach(doc =>{
                let temp = []
                temp.push(doc.id)
                temp.push(doc.data())
                wholeData.push(temp)
            });
            console.log(wholeData)
            this.setState({allData:wholeData})
        })
    }
   

    onchangeTextInput = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        }, console.log(this.state))
    }
    
    render(){
        
        return (
            <div className="AddInfoPage">
                
                <div>
                    <div className="fieldInputTitle">
                        <label> name : </label>
                        <Input placeholder="name" size="large" onChange={this.onchangeTextInput} type="text" name="Name" class="form-control" />
                    </div>

                    <div class="InputInFoForSell">
                        <label>Phone : </label>
                        <Input onChange={this.onchangeTextInput} type="number" name="Phone" placeholder="Phone" class="form-control" />
                    </div>

                    <div className="InputInFoForSell">
                        <label> Details : </label>
                        <TextArea rows={4} onChange={this.onchangeTextInput} type="text" name="Info" placeholder="กรอกรายละเอียด" class="form-control" />
                    </div>

                    <div className="SumbitButton">
                        <Button type="primary" onClick={this.addEventListener} class="btn btn-primary">SUBMIT</Button>
                    </div>

                </div>

                </div>
        );
    }
}

export default Test;