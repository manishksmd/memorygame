
import React, {Component} from 'react';
import axios from 'axios';
import { Router, Route, Link, browserHistory } from 'react-router'

var config = {
  headers: {'Access-Control-Allow-Origin': '*'}
};

export default  class GameStarter extends Component {

	constructor(props) {
		super(props);
		this.state = {
            deck_id: null
        };

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {

        event.preventDefault();      
        var name = this.refs.name.value.trim();
        var email = this.refs.email.value.trim();
        localStorage.setItem("CurrentPlayer",JSON.stringify({email:email,name:name}));
        let player={name: name,email:email,moves:0};
        
        
        if(JSON.parse(localStorage.getItem("PlayerList"))==null || JSON.parse(localStorage.getItem("PlayerList"))==undefined) {

            let data=[{name: name,email:email,moves:0}];
            localStorage.setItem("PlayerList",JSON.stringify(data));
        }else {
               if(Array.isArray(JSON.parse(localStorage.getItem("PlayerList")))) {
                   let data=JSON.parse(localStorage.getItem("PlayerList"));
                   data.push(player);
                   localStorage.setItem("PlayerList",JSON.stringify(data));
               } else {
                   let data=[];
                   data.push(player);
                   localStorage.setItem("PlayerList",JSON.stringify(data));
               }
        }
        
        const me=this;
        axios.post('http://localhost:8000/addUser', {
            name:name,
            email: email,
        })
        .then(function (response) {
            browserHistory.push('/gameview');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

	render() {
		return (
            <div className="container">
            <form className="well form-horizontal"  id="contact_form" onSubmit={this.handleSubmit}>
                <fieldset>
                <legend>Game Starter!</legend>
                    <div className="form-group">
                        <label className="col-md-4 control-label">Name</label>  
                        <div className="col-md-8 inputGroupContainer">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                <input  ref="name" placeholder="Name" className="form-control"  type="text"
                                    />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="col-md-4 control-label">E-Mail</label>  
                        <div className="col-md-8 inputGroupContainer">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                                <input ref="email" placeholder="E-Mail Address" className="form-control"  type="email"
                                    />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label className="col-md-4 control-label"></label>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-warning" >Start <span className="glyphicon glyphicon-send"></span></button>
                        </div>
                    </div>
                </fieldset>
            </form>
            </div>
		);
	}
}
