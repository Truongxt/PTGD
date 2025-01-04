import Button from "../Button";
import { Field, Fieldset, Input, Label, Legend } from "@headlessui/react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useState } from "react";
import PersonDropdown from "../PersonDropdown";
import DateDropdown from "../DateDropdown";
import TimeDropdown from "../TimeDropdown";

const ReservationWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [personCount, setPersonCount] = useState(2);
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState(new Date(0, 0, 0, 12, 0, 0));
  const [step, setStep] = useState("reservation-details");
  const [name, setName] = useState(2);
  const [phone, setPhone] = useState(2);

  const formatTime = (date) => {
    return Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false, // show as 24 hours
      minute: "numeric",
    }).format(date);
  };

  const formatDate = (date) => {
    return Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  const logReservationDetails = () => {
    console.log("Reservation successful!", {
      personCount,
      time,
      startDate,
      name,
      phone,
    });
  };
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Book a table</Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg  border bg-white p-12">
            {step === "reservation-details" && (
              <div className="space-y-3">
                <DialogTitle className="font-bold" style={{ margin: "20px" }}>
                  Book a table
                </DialogTitle>
                <PersonDropdown
                  count={personCount}
                  setCount={setPersonCount}
                  style={{ margin: "20px" }}
                />
                <DateDropdown
                  date={startDate}
                  setDate={setStartDate}
                  style={{ margin: "20px" }}
                />
                <TimeDropdown
                  time={time}
                  setTime={setTime}
                  style={{ margin: "20px" }}
                />
                <div className="flex gap-4">
                  <Button onClick={() => setStep("contact-details")}>
                    Book now
                  </Button>
                </div>
              </div>
            )}

            {step === "contact-details" && (
              <>
                <Fieldset className="space-y-3">
                  <Legend className="text-lg font-bold">Contact details</Legend>
                  <div className="bg-sky-100 p-3 my-5">
                    You are making a reservation for{" "}
                    <span className="font-bold">{personCount} persons</span>, on{" "}
                    <span className="font-bold">{formatDate(startDate)}</span>{" "}
                    at <span className="font-bold">{formatTime(time)}</span>
                  </div>
                  <Field>
                    <Label className="block">Name</Label>
                    <Input
                      className="border data-[hover]:shadow data-[focus]:bg-sky-100 w-full p-1"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <Label className="block">Phone number</Label>
                    <Input
                      className="border data-[hover]:shadow data-[focus]:bg-sky-100 w-full p-1"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Field>
                  <Button
                    onClick={() => {
                      setStep("reservation-details");
                      logReservationDetails();
                      setIsOpen(false);
                    }}
                  >
                    Confirm reservation
                  </Button>
                </Fieldset>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ReservationWidget;
