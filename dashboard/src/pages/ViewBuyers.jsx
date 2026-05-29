import React, { useEffect, useState } from "react";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ViewBuyers = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [buyers, setBuyers] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH BUYERS
  // ==========================================

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/project/buyers/${id}`,
          {
            withCredentials: true,
          }
        );

        setBuyers(res.data.buyers);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to fetch buyers"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, [id]);

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>
            Project Buyers
          </CardTitle>

          <Button
            onClick={() =>
              navigate("/manage/projects")
            }
          >
            Back
          </Button>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : buyers.length === 0 ? (
            <p>No buyers found.</p>
          ) : (
            <div className="space-y-5">
              {buyers.map((buyer) => (
                <div
                  key={buyer._id}
                  className="border rounded-lg p-4 bg-white shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={buyer.customer.avatar}
                      alt="avatar"
                      className="w-14 h-14 rounded-full"
                    />

                    <div>
                      <h2 className="font-bold text-lg">
                        {buyer.customer.name}
                      </h2>

                      <p>
                        {buyer.customer.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1">
                    <p>
                      <span className="font-semibold">
                        Amount:
                      </span>{" "}
                      ₹{buyer.amount}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Payment ID:
                      </span>{" "}
                      {buyer.razorpay_payment_id}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Order ID:
                      </span>{" "}
                      {buyer.razorpay_order_id}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Purchased At:
                      </span>{" "}
                      {new Date(
                        buyer.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewBuyers;