import { Button, Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import ReservationWidget from "../ReservationWidget";

function Contact() {

    return (

        <>
           <Button>Contact details</Button>
           <div>
            <p>You are making a reservation for 2 persons, on 12/5/2024 at 12:00</p>
            <p>Name</p>
            <input type="text" />
            <p>Phone number</p>
            <input type="text" />
           </div>
        </>
    )
}

export default Contact;