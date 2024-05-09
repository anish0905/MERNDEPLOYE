import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import AddNewProductStock from "./AddNewProductStock";

export function ProductStockModal() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button
        onClick={handleOpen}
        className="px-6 py-4 text-white rounded-lg border-green-600 bg-purple-600 hover:scale-105"
      >
        Add ProductStock
      </Button>
      <Dialog 
        open={open} 
        handler={handleOpen} 
        className="z-50"
        style={{
          position: 'fixed',
          top: '20%',
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
      >        <DialogHeader></DialogHeader>
        <DialogBody className="overflow-hidden">
          <Typography className="">
            <AddNewProductStock />
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}