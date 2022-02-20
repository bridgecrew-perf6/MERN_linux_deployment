import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { deleteOrder,getOrders } from "./helper/adminapicall";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getOrders().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisOrder = (orderId) => {
    deleteOrder(orderId, user._id, token)
    .then(data => {
        if(data.error){
            console.log(data.error);
        }else{
            preload();
        }
    })
    .catch()
  };

  return (
    <Base title="Welcome admin" description="Manage orders here">
      <h2 className="mb-4">All Orders:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {orders.length} orders</h2>

          {orders.map((order, index) => {
              return(
            <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{order._id}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/order/update/${order._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {
                    {deleteThisOrder(order._id)} //parameter the method deleteThisProduct with param product._id is not directly run in react it must be pass through callback bcoz inside that we again calling another method
                }} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
              );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageOrders;
