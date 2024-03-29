import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { useRef, useEffect } from 'react'
import { Socket, io } from 'socket.io-client';
import "./Form.css";
// import { Game } from './Game';
import Canvas from './Game';
import { useState } from 'react';



type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};


export default function _Form() {



  const { register, handleSubmit } = useForm<FormValues>();
  const [showCanvas, setShowCanvas] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showTtile, setTtile] = useState(true);
  const [CanvasTitle, setCanvasTitle] = useState(false);
  const [datas, setData] =  useState({Id:"hello", Name:"hello", Email:""});    
  if(window.sessionStorage.getItem("Email")!=null)
  {

  return (

    <div  className="App">
      { <Canvas data={datas.valueOf()} />}
    </div>

  );
  }
  //initial WebSocketServer 
  const socket = io('http://localhost:3080');

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // alert(JSON.stringify(data));

    setData({Id:data.firstName, Name:data.lastName,Email:data.email});
    setShowForm(false);
    setShowCanvas(true);
    setTtile(false);
    setCanvasTitle(true);
    window.sessionStorage.setItem("Email",data.email);
    socket.emit('msgToServer', data);
  }

  return (

    <div  className="App">
      {/* <center> */}
      {showTtile
        && <h1>Ping Pong Player - Registration</h1>
      }
      {CanvasTitle && <h1>Ping Pong Player - Canvas</h1>}
      {showForm &&
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label>First Name</label>
            <input {...register("firstName")} />
          </div>

          <div>
            <label>Last Name</label>
            <input {...register("lastName")} />
          </div>

          <div>
            <label>Email</label>
            <input {...register("email")} type="email" />
          </div>

          <input type="submit" />
        </form>
      }
      {/* {CanvasTitle && <h1>Ping Pong Player - Canvas</h1>} */}



      {/* {} */}
      {showCanvas && <Canvas data={datas.valueOf()} />}

    {/* </center> */}
    </div>

  );
}

/***
 * 
 * 
 * 
 * 
 * 
 * <animated.div
        style={{ ...rest, width: size, height: size }}
        className={styles.container}
        onClick={ OnClick } >
      {showCanvas && <Canvas data={datas.valueOf()} />}
      </animated.div>
      "                                              "
      <div>

      <p>
        {/* <button onClick={OnClick}> */
//      }
        // </p>

        // </div>
//  *****/


