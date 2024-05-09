import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProductDetailsModal = ({ selectedProduct, closeModal }) => {
  const totalItems = selectedProduct.length;

  return (
    <Dialog open={true} onClose={closeModal} fullWidth maxWidth="xs">
      <DialogTitle className="bg-blue-500 text-white text-center">Product Details</DialogTitle>
      <DialogContent dividers className="p-4 flex flex-col items-center max-h-96 overflow-y-auto relative">
        <div className="absolute top-0 right-0 mr-2 mt-2">
          <Typography variant="body2" className="text-gray-500">{`${totalItems} items`}</Typography>
        </div>
        <ul className="space-y-4 w-full">
          {selectedProduct.map((product) => (
            <li key={product._id} className="border-b border-gray-300 pb-4">
              <Typography variant="h6" className="font-semibold">Product:</Typography>
              <Typography><span className="font-semibold">Name:</span> {Array.isArray(product.productNames) ? product.productNames.join(', ') : product.productNames}</Typography>
              <Typography><span className="font-semibold">Description:</span> {product.productDescription}</Typography>
              <Typography><span className="font-semibold">Flavour:</span> {product.flavour}</Typography>
              <Typography><span className="font-semibold">Size:</span> {product.productSize}</Typography>
              <Typography><span className="font-semibold">Quantity:</span> {product.quantity}</Typography>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Button onClick={closeModal} variant="contained" color="primary">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsModal;
