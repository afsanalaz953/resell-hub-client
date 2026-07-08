"use client";

import React from 'react';
import {Button, Input, ListBox, Label, Select, FieldError,  Modal, Surface, TextField} from "@heroui/react";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';


const EditModal = ({bookings}) => {
 const {_id, title, stock,, sessionStartDate, subject, teachingMode } = formTutors


const onSubmit = async(e) =>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const allTutor = Object.fromEntries(formData.entries())
    console.log("allTutor", allTutor);

  toast.success('Tutor updated ', {
                  duration: 4000,
                  position: 'top-center',
      }); 
      


 const res =  await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors/${_id}`,{

   method : 'PATCH',
   headers : {
  'content-type' : 'application/json'
   
     }, 
    body: JSON.stringify( allTutor)
    })
const data = await res.json()
console.log( 'data after post',data);
   window.location.reload();
  

}
    return (
        <div>
    <Modal>
      <Button variant="secondary"> Update</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
           
              </Modal.Icon>
              <Modal.Heading>Update Tutor</Modal.Heading>
              
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                 <form onSubmit={onSubmit}
                           className="p-2 space-y-8 m-2" 
                         >
                       
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {/* Destination Name */}
                             <div className="md:col-span-2">
                               <TextField defaultValue = {tutorName}  name="tutorName" isRequired>
                                 <Label>Tutor Name</Label>
                                 <Input   placeholder="Enter your tutor name" className="rounded-2xl" />
                                 <FieldError />
                               </TextField>
                             </div>
               
                             {/* Country */}
                             <TextField defaultValue = {availableSlots}   name="availableSlots" type="number" isRequired>
                               <Label>Total Slots</Label>
                               <Input 
                               type="number"
                               placeholder="100" 
                               className="rounded-2xl" />
                               <FieldError />
                             </TextField>
               
                             {/* Subject - Updated Select Component */}
                              <div> 
                               <Select
                               defaultValue = {subject} 
                                 name="subject"
                                 isRequired
                                 className="rounded-2xl"
                                 placeholder="Select subject"
                               >
                                 {/* <Label>Subject</Label> */}
                                 <Select.Trigger className="rounded-2xl">
                                   <Select.Value />
                                   <Select.Indicator />
                                 </Select.Trigger>
                                 <Select.Popover>
                                   <ListBox>
                                     <ListBox.Item id="Computer Science" textValue="Computer Science">
                                   Computer Science
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                    
                                     <ListBox.Item id="Biology" textValue="Biology">
                                     Biology
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                   
                                     <ListBox.Item id="Economics" textValue="Economics">
                                     Economics
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                     <ListBox.Item id="Mathematics" textValue="Mathematics">
                                       Mathematics
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                     <ListBox.Item id="History" textValue="History">
                                     History
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                     <ListBox.Item id="Chemistry" textValue="Chemistry">
                                       Chemistry
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                     <ListBox.Item id="English Literature" textValue="English Literature">
                                       English Literature
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                     <ListBox.Item id="Physics" textValue="Physics">
                                       Physics
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                   </ListBox>
                                 </Select.Popover>
                               </Select>
                             </div>
               
                             {/* Price */}
                             <TextField  defaultValue = {hourlyFee}  name="hourlyFee" type="number" isRequired>
                               <Label>hourlyFee(USD)</Label>
                               <Input
                                 type="number"
                                 placeholder="1000"
                                 className="rounded-2xl"
                               />
                               <FieldError />
                             </TextField>
               
                             {/* Departure Date */}
                             <div className="md:col-span-2">
                               <TextField  defaultValue = {sessionStartDate}  name="sessionStartDate" type="date" isRequired>
                                 <Label>Session Start Date</Label>
                                 <Input type="date" className="rounded-2xl" />
                                 <FieldError />
                               </TextField>
                             </div>
               
                             {/* Image URL - Removed preview */}
                             <div className="md:col-span-2">
                               <TextField  defaultValue = {image}   name="image" isRequired>
                                 <Label>Image URL</Label>
                                 <Input
                                   type="url"
                                   placeholder="Enter your photo url"
                                   className="rounded-2xl"
                                 />
                                 <FieldError />
                               </TextField>
                             </div>
               
                           
                        <div>
                             <Select
                             defaultValue = {teachingMode} 
                                 name="teachingMode"
                                 isRequired
                                 className="rounded-2xl"
                                 placeholder="Select teaching mode"
                               >
                                 {/* <Label>Teaching Mode</Label> */}
                                 <Select.Trigger className="rounded-2xl">
                                   <Select.Value />
                                   <Select.Indicator />
                                 </Select.Trigger>
                                 <Select.Popover>
                                   <ListBox>
                                 <ListBox.Item id="Online" textValue="Online">
                                       Online
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                     <ListBox.Item id="In-person" textValue="In-person">
                                       In-person
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                     <ListBox.Item id="Both" textValue="Both">
                                       Both
                                       <ListBox.ItemIndicator />
                                     </ListBox.Item>
                                   </ListBox>
                                 </Select.Popover>
                               </Select>
                        </div>             
                         </div> 
               
                           {/* Buttons */}
               
                           <Button
                             type="submit"
                             variant="outline"
                            
                             className=" rounded-2xl w-full bg-cyan-500 text-white font-bold"
                           >
                       Save
                              </Button> 
                            
                         </form>
              </Surface>
            </Modal.Body>
            {/* <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close">Send Message</Button>
            </Modal.Footer> */}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>  
        </div>
    );
};

export default EditModal;






