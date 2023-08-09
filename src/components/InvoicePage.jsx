import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from './ApiContextProvider';



import {
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
} from '@mui/material';
import { Print as PrintIcon, GetApp as GetAppIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InvoicePage = () => {
  // Sample data for demonstration purposes
  const { userRole, userToken, userName, setUserName, setUserRole, setUserToken, userId, setUserId,bill } = useContext(ApiContext);

  const selectedPacks = [
    { id: 1, name: 'Package A', customers: 2, adults: 1, children: 1 },
    { id: 2, name: 'Package B', customers: 4, adults: 2, children: 2 },
    { id: 3, name: 'Package C', customers: 3, adults: 1, children: 2 },
  ];

  const totalAmount = 250; // Replace with the actual total amount

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text('Invoice', 100, 10);
    
    // Add the table content using autoTable
    doc.autoTable({
      head: [['Heading', 'Data']],
      body: [
        ['Book ID', bill.bookId],
        ['Package Name', bill.packageName],
        ['Person Count', bill.personCount],
        ['Region', bill.region],
        ['Start Date', new Date(bill.startdate).toLocaleDateString()],
        ['Total Amount', `Rs.${bill.totalAmount}`]
      ],
      startY: 20,
    });
  
    // Add total amount below the table
    const lastY = doc.autoTable.previous.finalY + 10;
    doc.text(`Total Amount: Rs.${bill.totalAmount}`, 10, lastY);
  
    // Save the PDF
    doc.save('invoice.pdf');
  };

  return (
    <div className="invoice-container">
      <Paper elevation={3} className="invoice-paper">
        <Typography variant="h4" gutterBottom>
          Invoice
        </Typography>
        <TableContainer>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Heading</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Book ID</TableCell>
            <TableCell>{bill.bookId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Package Name</TableCell>
            <TableCell>{bill.packageName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Person Count</TableCell>
            <TableCell>{bill.personCount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Region</TableCell>
            <TableCell>{bill.region}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Start Date</TableCell>
            <TableCell>{new Date(bill.startdate).toLocaleDateString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Amount</TableCell>
            <TableCell>Rs.{bill.totalAmount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
        </TableContainer>
        <div className="total-amount">
          <Typography variant="h6">Total Amount: Rs{bill.totalAmount}</Typography>
        </div>
        <div className="invoice-buttons">
          <Tooltip title="Download Invoice PDF">
            <Button variant="outlined" startIcon={<GetAppIcon />} onClick={handlePrint}>
              Download
            </Button>
          </Tooltip>
          
        </div>
      </Paper>
    </div>
  );
};

export default InvoicePage;