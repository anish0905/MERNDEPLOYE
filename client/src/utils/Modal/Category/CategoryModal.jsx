import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import AddNewCategory from "./AddNewCategory";
import Styles from "../../../Styles/Styles.css"

export function CategoryModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="px-6 py-4  rounded-lg   hover:scale-105  AddBtn"
      >
        Add Category
      </Button>
      <Dialog 
        open={open} 
        handler={handleOpen} 
        className="z-50"
        style={{
          position: 'fixed',
          top: '30%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '50%',
          maxHeight: '80%',
          overflow: 'auto',
          background: '#e5e7eb'
        }}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="Bg"></DialogHeader>
        <DialogBody className="overflow-hidden Bg">
          <Typography className="w-full">
            <AddNewCategory />
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2 Bg">
          <Button className="CancleBtn BtnRound BtnCancle bg-red-400" variant="text" color="blue-gray" onClick={handleOpen}>
            cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default CategoryModal;
