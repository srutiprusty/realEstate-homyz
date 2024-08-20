import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");

  let { email } = req.body;                                                               //extract email
  const userExists = await prisma.user.findUnique({ where: { email: email } });                   /* prismaclient is used woh knows all schema and unique keys and relations */
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });                                        /* if user doesnot exist then make a new user to register */
    res.send({
      message: "User registered successfully",
      user: user,
    });
  } else res.status(201).send({ message: "User already registered" });                              /* if user exist then  */
});

// function to book a visit to resd
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;                                                                 //payload of this req should send 2 kinds of information from body
  const { id } = req.params;                                                                         //id would be send in parameters

  try {
    /* check if already booked to same residency */
    const alreadyBooked = await prisma.user.findUnique({
      /*   where :{email:email}, */
      where: { email },
      select: { bookedVisits: true },                                                                 //obtained all the visits made by particular user
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {                                    //check if visited id is equal to current id then do nothing
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      await prisma.user.update({                                                                          //bookedvisit field
        where: { email: email },                                                                          //find the document of specific user
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// funtion to get all bookings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },                                                                           /* only select the booking field */
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);                                  /* findIndex iterates completely on visits list and each entry is passed as prop to find the id which is need to be removed*/

    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);                                                                     /* splice a js method helps to delete only 1 element in the bookedvisit list whose index we found */
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });

      res.send("Booking cancelled successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to add a resd in favourite list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),                                /*to filter out the id which we got as parameters from fav list  */
          },
        },
      });

      res.send({ message: "Removed from favorites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      res.send({ message: "Updated favorites", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get all favorites
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(favResd);
  } catch (err) {
    throw new Error(err.message);
  }
});
