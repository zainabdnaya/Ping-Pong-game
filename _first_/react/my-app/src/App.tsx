
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { useRef, useEffect } from 'react'
// import { Socket, io } from 'socket.io-client';
import "./index.css";
// import { Game } from './Game';
import Canvas from './Game';
import { useState } from 'react';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};


export default function App() {



  const { register, handleSubmit } = useForm<FormValues>();
  const [showCanvas, setShowCanvas] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showTtile, setTtile] = useState(true);
  const [CanvasTitle, setCanvasTitle] = useState(false);



  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // alert(JSON.stringify(data));
    setShowForm(false);
    setShowCanvas(true);
    setTtile(false);
    setCanvasTitle(true);
  }

  return (
    <div className="App">
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
      {showCanvas && <Canvas />}

    </div>

  );
}


// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// // import { useRef, useEffect } from 'react'
// // import { Socket, io } from 'socket.io-client';
// import "./index.css";
// // import {Game} from './Game';
// import Canvas from './Game';

// type FormValues = {
//   firstName: string;
//   lastName: string;
//   email: string;
// };

// export default function App() {
//   const { register, handleSubmit } = useForm<FormValues>();


//   return (
//     <div className="App">
//       <h1>Ping Pong Player - Registration</h1>
//       <form onSubmit={handleSubmit(onSubmit)} noValidate>
//         <div>
//           <label>First Name</label>
//           <input {...register("firstName")} />
//         </div>

//         <div>
//           <label>Last Name</label>
//           <input {...register("lastName")} />
//         </div>

//         <div>
//           <label>Email</label>
//           <input {...register("email")} type="email" />
//         </div>

//         <input type="submit" />
//       </form>
//     </div>
//   );
// }
