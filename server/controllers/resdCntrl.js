import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;                                          //req.body is used when we send the data from payload or the rawbody

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({             /* residency schema in database controlled by prisma */
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },                   //useremail that are get from payload connect to owner field & the owner is in return related with user  
        /* owner field is connected with user collection and it will does the email as our sent email*/
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {                                                   /* P2002 a specific code return if the condition of  unique item is violated */
      throw new Error("A residency with address already there");
    }
    throw new Error(err.message);
  }
});

// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",                                                        /* all residencies created are ordered in descending way */
    },
  });
  res.send(residencies);
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;                                                  /* to get a specific document is by sending its id in the url as params is used */

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});
