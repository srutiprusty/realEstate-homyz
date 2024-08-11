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
    setUserDetails((prev) => ({
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
    mutationFn: () => bookVisit(dayjs(value).format("YYYY-MM-DD"), propertyId, email, token),
    onSuccess: handleBookingSuccess,
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
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
          onClick={() => mutate()}
        >
          {isLoading ? 'Booking...' : 'Book visit'}
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
