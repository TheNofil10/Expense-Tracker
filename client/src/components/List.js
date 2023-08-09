import React from "react";
import 'boxicons';
import { default as api } from '../store/apiSlice'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




 function List(){
    const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    const [deleteTransaction] = api.useDeleteTransactionMutation()
    const [updateTransaction] = api.useUpdateTransactionMutation()
    const [t, sett] = React.useState({ amount: "",_id: "" });
    const [s, sets] = React.useState({ amount: "",_id: "" });
    const [open, setOpen] = React.useState(false);

    
    const handlerClick = (e) => {
        if(!e.target.dataset.id) return 0;
        deleteTransaction({_id: e.target.dataset.id})
    }
    const handlerupdate = (e) => {
        console.log(t)
        updateTransaction(e)
        setOpen(false);
        sett("", "","");
    }
    function handlechange(e) {
        
        
        
        console.log(e.target.value);
        sett({amount:parseInt(e.target.value) , _id:t._id});
        
      }
      
 
 
    const handleClickOpen = (t) => {
        setOpen(true);
        sett(t);
    }
    
    const handleClose = (t) => {
        setOpen(false);
        sett("", "","");
    }

   
    return(
        <div className="flex flex-col py-6 gap-3">
            <h1 className="py-4 text-md font-bold text-xl">History</h1>
            
            {data?.toReversed().map((category,key) => {
            return (
                <div className="item flex justify-center bg-gray-50 py-2 rounded-r" style={{borderRight : `8px solid ${category.color ??  "#e5e5e5"}`}}>
                <button className="px-3" onClick={handlerClick}><box-icon data-id={category._id ?? ''} color={category.color ?? '#e5e5e5'} size='20px' name="trash"></box-icon></button>
                <span className="block w-full">{category.name ?? ""}</span>
                <span className="block w-full">{category.amount ?? ""}</span>
                <button className="px-3" onClick={() => handleClickOpen(category)}><box-icon data-id={category._id ?? ''} color={category.color ?? '#e5e5e5'} size='20px' name="pencil"></box-icon></button>
                <Dialog open={open} onClose={() => handleClose(category)} name="myform">
            <DialogTitle>Update Transaction</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="amount"
                placeholder={t.amount}
                label="Amount"
                
                onChange={handlechange}
                type="amount"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => handlerupdate(t)}>Confirm</Button>
            </DialogActions>
          </Dialog>
            </div>
             );
          })}
        
        </div>
    )
}


export default List;