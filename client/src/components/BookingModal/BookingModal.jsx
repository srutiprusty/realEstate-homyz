import React, { useContext, useState } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext";
import { bookVisit } from "../../utils/api.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", {
      position: "bottom-right",
    });
    setUserDetails((prev) => ({                                                       /* taking prev state as prop and then spreading out prev bookings state and adding the booking item with id and date  */
      ...prev,
      bookings: [
        ...(prev.bookings || []),
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(dayjs(value).format("YYYY-MM-DD"), propertyId, email, token),                 //token can be found from userDetails
    onSuccess: handleBookingSuccess,
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
    onSettled: () => setOpened(false),                                                                          //after booking close the date option
  });

  return (
    <Modal
      opened={opened}
       // setOpened={setModalOpened} or
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
    >
      <div className="flexColCenter" style={{ gap: "1rem" }}>
        <DatePicker
          value={value}
          onChange={setValue}
          minDate={new Date()}
          placeholder="Pick a date"
          label="Visit Date"
          withAsterisk
        />
        <Button
          disabled={!value || isLoading}
          onClick={() => mutate()}                                                                  /* mutate func is used when we have to upload some data into database or update it so we use use mutate instead of useQuery */
        >
          {isLoading ? 'Booking...' : 'Book visit'}
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
